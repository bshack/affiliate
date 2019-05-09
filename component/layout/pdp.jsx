import React from 'react';
import { Provider } from 'react-redux';

/* VIEWS
*************************************/

import WrapperLayout from './wrapper.jsx';
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
        <Provider store={this.props.modelPagePDP.store}>
            <WrapperLayout>
                <NavigationMain />
                <Breadcrumbs />
                <ProductDetail />
                <RecommendationProducts />
                <EmailSignUp />
            </WrapperLayout>
        </Provider>
    );
  }
}

export default View;
