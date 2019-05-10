import React from 'react';
import {Provider} from 'react-redux';

/* VIEWS
*************************************/

import LayoutWrapper from '../layout/wrapper.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import Content from '../template/content.jsx';
import FeaturedProducts from '../template/featuredProducts.jsx';
import CategoryProducts from '../template/categoryProducts.jsx';
import EmailSignUp from '../template/emailSignUp.jsx';
import EmailUnsubscribe from '../template/emailUnsubscribe.jsx';

/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
        <Provider store={this.props.storePageIndex.store}>
            <LayoutWrapper>
                <NavigationMain />
                <Content />
                <FeaturedProducts />
                <EmailSignUp />
                <CategoryProducts />
            </LayoutWrapper>
        </Provider>
    );
  }
}

export default View;
