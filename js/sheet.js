var VERTICAL_PADDING = 50;
var HORIZONTAL_PADDING = 50;
var STAFF_HEIGHT = 150;
var LINE_SPACING = 15;

var SYMBOL_INITIAL_SPACING = 20;

var CLEF_Y = 34;

// React doesn't support <image> in <svg>
var SVGImage = React.createClass({
    render: function() {
        var image = "<image xlink:href='" + this.props.href + "' " +
                           "x='" + this.props.x + "' " +
                           "y='" + this.props.y + "' " +
                           "width='" + this.props.width + "' " +
                           "height='" + this.props.height + "' />";

        return <g dangerouslySetInnerHTML={{__html: image}} />;
    }
});

var SymbolImage = React.createClass({
    render: function() {
        return <SVGImage href={this.props.image}
                         x={this.props.x}         y={this.props.y}
                         width={this.props.width} height={this.props.height} />
    }
});


var Staff = React.createClass({
    // Create 5 staff lines
    drawStaff: function() {

        var lines = [];

        for (var i = 0; i < 5; i++) {
            var line_position = this.getLinePosition(i - 2);
            var x_begin = HORIZONTAL_PADDING;
            var x_end = this.props.width - HORIZONTAL_PADDING;

            lines.push(<line x1={x_begin}      y1={line_position}
                             x2={x_end}        y2={line_position}
                             strokeWidth={2.5} stroke='black'
                             key={i} />);
        }

        return lines;
    },

    // Get the line relative to the middle
    getLinePosition: function(line) {
        return VERTICAL_PADDING + STAFF_HEIGHT*this.props.row + LINE_SPACING*(line + 2);
    },

    render: function() {
        var i = 0;
        var cursor = SYMBOL_INITIAL_SPACING;
        var symbolList = this.props.symbolList;

        var symbols = [];

        while (!symbolList.done()) {
            var symbol = symbolList.next();
            var clef = symbolList.current_clef;
            var pos = clef.middle_c + symbol.getPosition(clef);

            console.log(pos);

            // Get the middle line, shift it relative to middle C, then get the
            // position of the note, then subtract half the height to get the
            // middle of the symbol
            var y = this.getLinePosition(0) + pos*-LINE_SPACING/2
                    - symbol.height/2;

            // If the note position is above or below the staff
            if ((pos < -5 || pos > 5) && symbol.is_note) {

                // For every 2 positions above/below the staff, draw an extra line
                for (var j = 0; j < Math.floor(Math.abs(pos/2) - 2); j++) {
                    var line_pos = this.getLinePosition((j + 3)*-Math.sign(pos));
                    var delta = symbol.width * (3/4);

                    symbols.push(<line x1={symbol.spacing/4 + cursor - delta} y1={line_pos}
                                       x2={symbol.spacing/4 + cursor + delta} y2={line_pos}
                                       strokeWidth={2.5} stroke='black'
                                       key={'line'+i+''+j} />);
                }

            }

            symbols.push(<SymbolImage image={symbol.image}
                                      x={cursor}           y={y}
                                      width={symbol.width} height={symbol.height}
                                      key={i} />);

            // Update the next symbol position and count
            cursor += symbol.spacing;
            i++;
        }

        symbolList.reset();

        return <g>
            {this.drawStaff()}
            {symbols}
        </g>;
    }
});

var Sheet = React.createClass({
    render: function() {
        var width = this.props.width;
        var height = this.props.symbolList.symbols.length * STAFF_HEIGHT

        var staves = [];
        for (var i = 0; i < this.props.symbolList.symbols.length; i++) {
            staves.push(<Staff symbolList={this.props.symbolList}
                               width={width}
                               row={i}
                               key={i} />);
        }

        return <svg width={width} height={height}>
            {staves}
        </svg>;
    }
});
