import React from 'react';
import { Provider } from 'react-redux';

/* VIEWS
*************************************/

import WrapperLayout from './wrapper.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import Content from '../template/content.jsx';
import CategoryProducts from '../template/categoryProducts.jsx';
import EmailSignUp from '../template/emailSignUp.jsx';
import EmailUnsubscribe from '../template/emailUnsubscribe.jsx';

/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
        configPublic={this.props.configPublic.store.getState()}
        title={this.props.content.store.getState()[0].metatitle}
        description={this.props.content.store.getState()[0].metadescription}
        image={this.props.configPublic.store.getState().www.origin + this.props.configPublic.store.getState().social.image}
        canonical={this.props.configPublic.store.getState().www.origin}
        navigationFooter={this.props.navigationFooter.store.getState()}
        >
        <NavigationMain
            data={this.props.navigationMain.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <Content
            data={this.props.content.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <Provider store={this.props.productsFeatured.store}>
            <CategoryProducts
                title='Featured Deals'
                subtitle={this.props.categories.store.getState()[0].subtitle} />
        </Provider>
        <EmailSignUp
            configPublic={this.props.configPublic.store.getState()} />
        <Provider store={this.props.productsFeatured.store}>
            <CategoryProducts
                title='You Also May Like'
                subtitle={this.props.categories.store.getState()[0].subtitle} />
        </Provider>
      </WrapperLayout>
    );
  }
}

export default View;
