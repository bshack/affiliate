const React = require('react');
const Product = require('./product.jsx');

class View extends React.Component {

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(){
        console.log('componentWillUnmount');
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        console.log('asdf', event);
    }

    render() {
        console.log('blah');
        let header;
        if (this.props.subtitle) {
            header = (
                <div className='col-12'>
                    <h1>{this.props.title}</h1>
                    <h2>{this.props.subtitle}</h2>
                </div>
            )
        } else {
            header = (
                <div className='col-12'>
                    <h1>{this.props.title}</h1>
                </div>
            )
        }

        return (
            <section className="category-products container">
                <div className="row no-gutters">
                    {header}
                </div>
                <div className="row no-gutters">
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
