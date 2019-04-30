const React = require('react');
const Product = require('./product.jsx');

class View extends React.Component {
    render() {
        return (
            <section className="category-products container">
                <div className="row no-gutters">
                    <div className='col-12'>
                        <h1>{this.props.title}</h1>
                        {this.props.subtitle? <h2>{this.props.subtitle}</h2> : ''}
                    </div>
                </div>
                <div className="products row no-gutters">
                    {this.props.data.map(
                        (product, index) =>
                            <div key={index} className='col-6 col-md-4 col-lg-3'>
                                <Product data={product} key={index} configPublic={this.props.configPublic} />
                            </div>
                    )}
                </div>
            </section>
        );
    }
}

module.exports = View;
