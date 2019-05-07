import React from 'react';
import { Provider } from 'react-redux';

/* VIEWS
*************************************/

import WrapperLayout from './wrapper.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import Breadcrumbs from '../template/breadcrumbs.jsx';
import ProductDetail from '../template/productDetail.jsx';
import CategoryProducts from '../template/categoryProducts.jsx';
import EmailSignUp from '../template/emailSignUp.jsx';

/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
        configPublic={this.props.configPublic.store.getState()}
        title={this.props.products.store.getState().data[0].title}
        description={this.props.products.store.getState().data[0].description}
        image={this.props.configPublic.store.getState().cdn.origin + '/' + this.props.products.store.getState().data[0].path + '/' + this.props.products.store.getState().data[0].seoFilenamePart + '-social.jpg'}
        canonical={this.props.configPublic.store.getState().www.origin + '/' + this.props.products.store.getState().data[0].path + '/' + this.props.products.store.getState().data[0].seoFilenamePart + '.html'}
        navigationFooter={this.props.navigationFooter.store.getState()}
        >
        <NavigationMain
            data={this.props.navigationMain.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <Breadcrumbs
            data={this.props.breadcrumbs.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <ProductDetail
            data={this.props.products.store.getState().data[0]}
            configPublic={this.props.configPublic.store.getState()} />
        <Provider store={this.props.productRecommendations.store}>
            <CategoryProducts
                subtitle='You Also May Like'
                configPublic={this.props.configPublic.store.getState()} />
        </Provider>
        <EmailSignUp
            configPublic={this.props.configPublic.store.getState()} />
      </WrapperLayout>
    );
  }
}

export default View;
