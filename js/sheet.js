var VERTICAL_PADDING = 50;
var HORIZONTAL_PADDING = 50;
var STAFF_HEIGHT = 150;
var LINE_SPACING = 15;

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

var Clef = React.createClass({
    render: function() {
        return <SVGImage href='/images/TrebleClef.svg'
                         x='50'      y='34'
                         width='50' height='98' />
    }
});


var Staff = React.createClass({
    // Create 5 staff lines
    drawStaff: function() {
        var lines = [];

        for (var i = 0; i < 5; i++) {
            var line_position = VERTICAL_PADDING + STAFF_HEIGHT * this.props.row + LINE_SPACING * i;
            var x_begin = HORIZONTAL_PADDING;
            var x_end = this.props.width - HORIZONTAL_PADDING;

            lines.push(<line x1={x_begin}      y1={line_position}
                             x2={x_end}        y2={line_position}
                             strokeWidth={2.5} stroke='black'
                             key={i} />);
        }

        return lines;
    },

    render: function() {
        return <g>
            {this.drawStaff()}
            <Clef />
        </g>;
    }
});

var Sheet = React.createClass({
    render: function() {
        var staves = [];

        for (var i = 0; i < this.props.staves; i++) {
            staves.push(<Staff width={this.props.width} row={i} key={i}/>);
        }

        return <svg width={this.props.width} height={this.props.staves * STAFF_HEIGHT}>
            {staves}
        </svg>;
    }
});
