var React = require('react');

class View extends React.Component {
  render() {
    return (
        <nav className="navigation-footer">
            <ul>
            {this.props.data.map(
                (content, index) =>
                        <li key={index}><a href={'/' + content.filename + '.html'}>{content.title}</a></li>
            )}
            </ul>
        </nav>
    );
  }
}

module.exports = View;
