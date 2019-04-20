const React = require('react');


/* VIEWS
*************************************/

const WrapperLayout = require('./wrapper.jsx');
const NavigationMain = require('../navigationMain.jsx');
const Breadcrumbs = require('../breadcrumbs.jsx');
const CategoryProducts = require('../categoryProducts.jsx');
const EmailSignUp = require('../emailSignUp.jsx');


/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
        configPublic={this.props.configPublic}
        title={this.props.category[0].title}
        discription={this.props.category[0].discription}
        image={this.props.configPublic.www.origin + this.props.configPublic.social.image}
        canonical={this.props.configPublic.www.origin + '/' + this.props.category[0].path + '/index.html'}
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
