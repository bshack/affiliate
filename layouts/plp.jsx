const React = require('react');


/* VIEWS
*************************************/

const WrapperLayout = require('./wrapper.jsx');
const NavigationMain = require('../views/navigationMain.jsx');
const Breadcrumbs = require('../views/breadcrumbs.jsx');
const CategoryProducts = require('../views/categoryProducts.jsx');
const EmailSignUp = require('../views/emailSignUp.jsx');


/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
        configPublic={this.props.configPublic}
        title={this.props.category[0].title}
        discription={this.props.category[0].title}
        canonical=''
        navigationFooter={this.props.navigationFooter}
        >
        <NavigationMain
            data={this.props.navigationMain}
            configPublic={this.props.configPublic} />
        <Breadcrumbs
            data={this.props.breadcrumbs}
            configPublic={this.props.configPublic} />
        <CategoryProducts
            title={this.props.category[0].title}
            subtitle={this.props.category[0].subtitle}
            data={this.props.products}
            configPublic={this.props.configPublic} />
        <EmailSignUp
            configPublic={this.props.configPublic} />
      </WrapperLayout>
    );
  }
}

module.exports = View;
