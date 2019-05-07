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
      <WrapperLayout
        configPublic={this.props.configPublic.store.getState()}
        title={this.props.category.store.getState()[0].title}
        discription={this.props.category.store.getState()[0].discription}
        image={this.props.configPublic.store.getState().www.origin + this.props.configPublic.store.getState().social.image}
        canonical={this.props.configPublic.store.getState().www.origin + '/' + this.props.category.store.getState()[0].path + '/index.html'}
        navigationFooter={this.props.navigationFooter.store.getState()}
        >
        <NavigationMain
            data={this.props.navigationMain.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <Breadcrumbs
            data={this.props.breadcrumbs.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <Provider store={this.props.products.store}>
            <CategoryProducts
                title={this.props.category.store.getState()[0].title}
                subtitle={this.props.category.store.getState()[0].subtitle} />
        </Provider>
        <EmailSignUp
            configPublic={this.props.configPublic.store.getState()} />
      </WrapperLayout>
    );
  }
}

export default View;
