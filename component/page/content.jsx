import React from 'react';
import {Provider} from 'react-redux';

/* VIEWS
*************************************/

import LayoutWrapper from '../layout/wrapper.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import Breadcrumbs from '../template/breadcrumbs.jsx';
import Content from '../template/content.jsx';
import FeaturedProducts from '../template/featuredProducts.jsx';
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
                <Content />
                <EmailSignUp />
                <FeaturedProducts />
            </LayoutWrapper>
        </Provider>
    );
  }
}

export default View;
