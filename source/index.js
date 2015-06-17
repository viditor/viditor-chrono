window.React = require("react")

var Viditor = React.createClass({
    render: function() {
        return (
            <div>
                Hello World!! :D
            </div>
        )
    }
})

React.render(<Viditor/>, document.body)
