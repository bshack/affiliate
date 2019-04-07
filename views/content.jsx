var React = require('react');

class View extends React.Component {
  render() {
    return (
        <section className={'content content-' + this.props.data[0].filename} dangerouslySetInnerHTML={{ __html: this.props.data[0].content }} />
    );
  }
}

module.exports = View;
