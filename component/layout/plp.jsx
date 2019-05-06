const React = require('react');

/* VIEWS
*************************************/

import WrapperLayout from './wrapper.jsx';
const NavigationMain = require('../template/navigationMain.jsx');
const Breadcrumbs = require('../template/breadcrumbs.jsx');
import CategoryProducts from '../template/categoryProducts.jsx';
const EmailSignUp = require('../template/emailSignUp.jsx');
import { Provider } from 'react-redux';


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

module.exports = View;
