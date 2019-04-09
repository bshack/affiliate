var React = require('react');

class View extends React.Component {
  render() {
    return (
        <section className="content container">
            <div className="row">
                <div className={'col-12 content-' + this.props.data[0].filename} dangerouslySetInnerHTML={{__html: this.props.data[0].content}} />
            </div>
        </section>
    );
  }
}

module.exports = View;
