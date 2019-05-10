import React from 'react';
import { Provider } from 'react-redux';

/* VIEWS
*************************************/

import LayoutWrapper from '../layout/wrapper.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import Breadcrumbs from '../template/breadcrumbs.jsx';
import EmailUnsubscribe from '../template/emailUnsubscribe.jsx';
import FeaturedProducts from '../template/featuredProducts.jsx';


/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
        <Provider store={this.props.storePageUnsubscribe.store}>
            <LayoutWrapper>
                <NavigationMain />
                <Breadcrumbs />
                <EmailUnsubscribe />
                <FeaturedProducts />
            </LayoutWrapper>
        </Provider>
    );
  }
}

export default View;
