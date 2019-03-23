var React = require('react');

class View extends React.Component {
  render() {
    return (
      <div className="product col-3">
        <h2>{this.props.data.title}</h2>
        <img alt={this.props.data.title} src={
            "https://s3.us-east-2.amazonaws.com/cdn.shackelforddigital.io/"
            + this.props.data.seoDirectoryNamePart+ '/' + this.props.data.seoFilenamePart
            + "-large.jpg"
        } />
      </div>
    );
  }
}

module.exports = View;
