import React from 'react';
import { Provider } from 'react-redux';

/* VIEWS
*************************************/

import WrapperLayout from './wrapper.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import Breadcrumbs from '../template/breadcrumbs.jsx';
import EmailUnsubscribe from '../template/emailUnsubscribe.jsx';
import FeaturedProducts from '../template/featuredProducts.jsx';


/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
        <Provider store={this.props.modelPageUnsubscribe.store}>
            <WrapperLayout>
                <NavigationMain />
                <Breadcrumbs />
                <EmailUnsubscribe />
                <FeaturedProducts />
            </WrapperLayout>
        </Provider>
    );
  }
}

export default View;
