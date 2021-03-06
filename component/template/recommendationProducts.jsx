import React from 'react';
import Product from './product.jsx';
import {connect} from 'react-redux';

class View extends React.PureComponent {

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
                                <Product product={product} key={index} config={this.props.config} />
                            </div>
                    )}
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.productRecommendation,
        config: state.data.config,
        state: state
    }
}

export default connect(
    mapStateToProps
)(View);
