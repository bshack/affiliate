const React = require('react');

const NavigationFooter = require('../views/navigationFooter.jsx');


/* COMPONENT
*************************************/

class WrapperLayout extends React.Component {
  render() {
    return (
      <html lang="en-US" dir="ltr">
        <head>
            <meta charSet="utf-8" />
            <title>{this.props.title}</title>
            <meta httpEquiv="x-ua-compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no" />
            <meta name="description" content={this.props.description} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="" />
            <meta name="twitter:url" content={this.props.canonical} />
            <meta name="twitter:title" content={this.props.title} />
            <meta name="twitter:description" content={this.props.description} />
            <meta name="twitter:image" content="" />
            <meta name="twitter:image:alt" content={this.props.title} />
            <meta property="og:title" content={this.props.title} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={this.props.canonical} />
            <meta property="og:image:url" content="" />
            <meta property="og:image:height" content="" />
            <meta property="og:image:width" content="" />
            <meta property="og:image:alt" content={this.props.title} />
            <meta property="og:site_name" content="" />
            <meta property="og:description" content={this.props.description} />
            <meta property="og:locale" content="en_US" />
            <meta property="fb:admins" content="" />
            <meta property="fb:app_id" content="" />
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
