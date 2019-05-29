import React from 'react';
import Product from './product.jsx';
import {connect} from 'react-redux';

class View extends React.Component {
    render() {
        return (
            <section className="category-products container">
                {
                    this.props.category?
                        <div className="row no-gutters">
                            <div className='col-12'>
                                {this.props.category[0].title? <h1>{this.props.category[0].title}</h1> : null}
                                {this.props.category[0].subtitle? <h2>{this.props.category[0].subtitle}</h2> : null}
                            </div>
                        </div> : null
                }
                <div className="products row no-gutters">
                    {this.props.data.map(
                        (product, index) =>
                            <div key={index} className='col-6 col-md-4 col-lg-3'>
                                <Product isLazy={(index > 12)? true : false} data={product} key={index} />
                            </div>
                    )}
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.product,
        category: state.data.category,
        config: state.data.config
    }
}

export default connect(
    mapStateToProps,
    {}
)(View);
