import React from 'react';
import { Provider } from 'react-redux';

/* VIEWS
*************************************/

import WrapperLayout from './wrapper.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import Breadcrumbs from '../template/breadcrumbs.jsx';
import CategoryProducts from '../template/categoryProducts.jsx';
import EmailSignUp from '../template/emailSignUp.jsx';

/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
        <Provider store={this.props.modelPagePLP.store}>
            <WrapperLayout>
                <NavigationMain />
                <Breadcrumbs />
                <CategoryProducts />
                <EmailSignUp />
            </WrapperLayout>
        </Provider>
    );
  }
}

export default View;
