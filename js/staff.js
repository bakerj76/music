var Staff = React.createClass({
    getInitialState: function() {
        return {canvas: null,
                middle_c: -1};
    },

    componentDidMount: function() {
        this.state.canvas = this.getDOMNode();
        this.draw();
    },

    draw: function() {
        var context = this.state.canvas.getContext('2d');

        this.drawStaff(context);
        this.drawClef(context);
        this.drawNotes(context);
    },

    drawStaff: function(context) {
        var size = 250 * 2;
        var middle = this.state.canvas.width / 2;
        var left = middle - size/2;

        context.fillStyle = 'black';

        for (var i = 0; i < 5; i++) {
            context.fillRect(left, 20 + i*15, size, 3);
        }
    },

    drawClef: function(context) {
        var canvas = this.state.canvas;

        var clef = new Image();
        clef.src = 'images/' + this.props.clef + 'Clef.svg';

        clef.onload = function() {
            var height = 108;
            var width = height * (clef.width/clef.height);
            var left = canvas.width/2 - 210;

            context.drawImage(clef, left, 0, width, height);
        }
    },

    drawNotes: function(context) {
        var canvas = this.state.canvas;

        var note = new Image();
        note.src = 'images/WholeNote.svg';

        note.onload = function() {
            var height = 15;
            var width = height * (note.width / note.height);
            var left = canvas.width/2 - 140;
            var space = 45;

            for (var i = 0; i < 8; i++) {
                context.drawImage(note, left + space*i, 88.5 + -7.5*i,  width, height);
            }
        }

    },

    render: function() {
        return <canvas className='staff' width='800' height='200'/>;
    }
});

React.render(
    <Staff clef='Treble' root='C' scale='major' ascending='0'/>,
    document.getElementById('staff')
);
