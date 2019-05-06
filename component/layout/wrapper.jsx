const React = require('react');

const NavigationFooter = require('../template/navigationFooter.jsx');


/* COMPONENT
*************************************/

class WrapperLayout extends React.Component {
  render() {
      let descriptionSEO;
      let descriptionSocial;
      if (this.props.description && this.props.description !== '') {
          descriptionSEO = <meta name="description" content={this.props.description} />;
          descriptionSocial = this.props.description;
      } else {
          descriptionSocial = this.props.configPublic.description;
      }

    return (
      <html lang={this.props.configPublic.locale} dir="ltr">
        <head>
            <meta charSet="utf-8" />
            <title>{this.props.title}</title>
            <meta httpEquiv="x-ua-compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no" />
            {descriptionSEO}
            <meta name="twitter:card" content={this.props.configPublic.social.twitter.card} />
            <meta name="twitter:site" content={this.props.configPublic.social.twitter.name} />
            <meta name="twitter:url" content={this.props.canonical} />
            <meta name="twitter:title" content={this.props.title} />
            <meta name="twitter:description" content={descriptionSocial} />
            <meta name="twitter:image" content={this.props.image} />
            <meta name="twitter:image:alt" content={this.props.title} />
            <meta property="og:title" content={this.props.title} />
            <meta property="og:type" content={this.props.configPublic.social.facebook.type} />
            <meta property="og:url" content={this.props.canonical} />
            <meta property="og:image:url" content={this.props.image} />
            <meta property="og:image:height" content={this.props.configPublic.social.facebook.imageHeight} />
            <meta property="og:image:width" content={this.props.configPublic.social.facebook.imageWidth} />
            <meta property="og:image:alt" content={this.props.title} />
            <meta property="og:site_name" content={this.props.configPublic.name} />
            <meta property="og:description" content={descriptionSocial} />
            <meta property="og:locale" content={this.props.configPublic.locale} />
            <meta property="fb:admins" content={this.props.configPublic.social.facebook.admins} />
            <meta property="fb:app_id" content={this.props.configPublic.social.facebook.app_id} />
            <link rel="canonical" href={this.props.canonical} />
            <link rel="stylesheet" type="text/css" media="all" href="/style/index.css" />
        </head>
        <body>
            <header>
                logo
            </header>
            <div className='testinject'>
            </div>
            <main>
                {this.props.children}
            </main>
            <footer className="container">
                <div className="row">
                    <div className="col-12">
                    <NavigationFooter
                        data={this.props.navigationFooter}
                        configPublic={this.props.configPublic} />
                        &copy; {new Date().getFullYear()}
                    </div>
                </div>
            </footer>
            <script src="/script/vendors-index.js" />
            <script src="/script/index.js" />
        </body>
      </html>
    );
  }
}

module.exports = WrapperLayout;
