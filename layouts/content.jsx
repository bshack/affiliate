const React = require('react');


/* VIEWS
*************************************/

const WrapperLayout = require('./wrapper.jsx');
const NavigationMain = require('../views/navigationMain.jsx');
const Breadcrumbs = require('../views/breadcrumbs.jsx');
const CategoryProducts = require('../views/categoryProducts.jsx');
const Content = require('../views/content.jsx');
const EmailSignUp = require('../views/emailSignUp.jsx');


/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
          configPublic={this.props.configPublic}
          title={this.props.content[0].metatitle}
          description={this.props.content[0].metadescription}
          image={this.props.configPublic.www.origin + this.props.configPublic.social.image}
          canonical={this.props.configPublic.www.origin + '/' + this.props.content[0].filename + '.html'}
          navigationFooter={this.props.navigationFooter}
        >
        <NavigationMain
            data={this.props.navigationMain}
            configPublic={this.props.configPublic} />
        <Breadcrumbs
            data={this.props.breadcrumbs}
            configPublic={this.props.configPublic} />
        <Content
            data={this.props.content}
            configPublic={this.props.configPublic} />
        <EmailSignUp
            configPublic={this.props.configPublic} />
        <CategoryProducts
            subtitle='You Also May Like'
            data={this.props.products}
            configPublic={this.props.configPublic} />
      </WrapperLayout>
    );
  }
}

module.exports = View;
