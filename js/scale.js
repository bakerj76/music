var Scale = React.createClass({
    render: function() {
        var sl = new SymbolList();

        sl.addClef('Treble');
        sl.addNote('C4');
        sl.addNote('D4');
        sl.addNote('E4');
        sl.addNote('B3');

        return <Sheet width='800' symbolList={sl} />;
    }
});

React.render(
    <Scale />,
    document.getElementById('staff')
);
