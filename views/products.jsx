var React = require('react');
var Product = require('./product.jsx');

class View extends React.Component {
  render() {
    return (
    <section className="products row">
        {this.props.data.map(
            (product, index) => <Product data={product} key={index}/>
        )}
    </section>
    );
  }
}

module.exports = View;
