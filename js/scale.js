var Scale = React.createClass({
    render: function() {
        var sl = new SymbolList();

        sl.addClef('Treble');
        sl.addNote('C4');
        sl.addNote('D4');
        sl.addNote('E4');
        sl.addNote('F4');
        sl.addNote('G4');
        sl.addNote('A4');
        sl.addNote('B4');
        sl.addNote('C5');

        return <Sheet width='800' symbolList={sl} />;
    }
});

React.render(
    <Scale />,
    document.getElementById('staff')
);
