import React from 'react';
import Product from './product.jsx';
import {connect} from 'react-redux';

class View extends React.PureComponent {
    render() {
        return (
            <section className="category-products container">
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
    mapStateToProps
)(View);
