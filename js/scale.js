var Scale = React.createClass({
    render: function() {
        return <Sheet width='800' staves='1' />;
    }
});

React.render(
    <Scale  />,
    document.getElementById('staff')
);
