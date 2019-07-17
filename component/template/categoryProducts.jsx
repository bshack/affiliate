import React from 'react';
import Campaign from './campaign.jsx';
import Product from './product.jsx';
import {connect} from 'react-redux';

class View extends React.PureComponent {
    render() {
        return (
            <section className="category-products container">
                <div className="products row no-gutters">
                    {this.props.state.data.product.map(
                        (product, index) =>
                            <div key={index} className='col-6 col-md-4 col-lg-3'>
                                <Product isLazy={(index > 12)? true : false} product={product} />
                            </div>
                    )}
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(
    mapStateToProps
)(View);
