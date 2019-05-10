import React from 'react';
import { Provider } from 'react-redux';

/* VIEWS
*************************************/

import LayoutWrapper from '../layout/wrapper.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import Breadcrumbs from '../template/breadcrumbs.jsx';
import CategoryProducts from '../template/categoryProducts.jsx';
import EmailSignUp from '../template/emailSignUp.jsx';

/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
        <Provider store={this.props.storePagePLP.store}>
            <LayoutWrapper>
                <NavigationMain />
                <Breadcrumbs />
                <CategoryProducts />
                <EmailSignUp />
            </LayoutWrapper>
        </Provider>
    );
  }
}

export default View;
