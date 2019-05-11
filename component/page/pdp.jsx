import React from 'react';
import { Provider } from 'react-redux';

/* VIEWS
*************************************/

import LayoutWrapper from '../layout/wrapper.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import Breadcrumbs from '../template/breadcrumbs.jsx';
import ProductDetail from '../template/productDetail.jsx';
import RecommendationProducts from '../template/recommendationProducts.jsx';
import EmailSignUp from '../template/emailSignUp.jsx';

/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
        <Provider store={this.props.StorePage.store}>
            <LayoutWrapper>
                <NavigationMain />
                <Breadcrumbs />
                <ProductDetail />
                <RecommendationProducts />
                <EmailSignUp />
            </LayoutWrapper>
        </Provider>
    );
  }
}

export default View;
