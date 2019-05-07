import React from 'react';
import { Provider } from 'react-redux';

/* VIEWS
*************************************/

import WrapperLayout from './wrapper.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import CategoryProducts from '../template/categoryProducts.jsx';
import EmailUnsubscribe from '../template/emailUnsubscribe.jsx';

/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
        configPublic={this.props.configPublic.store.getState()}
        title="Unsubscribe"
        description="Unsubscribe from email marketing."
        image={this.props.configPublic.store.getState().www.origin + this.props.configPublic.store.getState().social.image}
        canonical={this.props.configPublic.store.getState().www.origin}
        navigationFooter={this.props.navigationFooter.store.getState()}
        >
        <NavigationMain
            data={this.props.navigationMain.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <EmailUnsubscribe
            data={this.props.emailUnsubscribe}
            configPublic={this.props.configPublic.store.getState()} />
        <Provider store={this.props.products.store}>
            <CategoryProducts
                title='You Also May Like' />
        </Provider>
      </WrapperLayout>
    );
  }
}

export default View;
