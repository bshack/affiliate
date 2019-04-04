var React = require('react');

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
            <meta name="twitter:card" content="" />
            <meta name="twitter:site" content="" />
            <meta name="twitter:creator" content="" />
            <meta name="twitter:url" content="" />
            <meta name="twitter:title" content={this.props.title} />
            <meta name="twitter:description" content={this.props.description} />
            <meta name="twitter:image" content="" />
            <meta property="og:title" content={this.props.title} />
            <meta property="og:type" content="" />
            <meta property="og:url" content="" />
            <meta property="og:image:url" content="" />
            <meta property="og:image:height" content="" />
            <meta property="og:image:width" content="" />
            <meta property="og:image:alt" content="" />
            <meta property="og:site_name" content="" />
            <meta property="og:description" content={this.props.description} />
            <meta property="og:locale" content="en_US" />
            <meta property="fb:admins" content="" />
            <meta property="fb:app_id" content="" />
            <link rel="canonical" href="" />
            <link rel="author" href="https://plus.google.com/+" />
            <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="true" />
            <link rel="stylesheet" type="text/css" media="all" href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i" />
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
            <footer>
            &copy;
            </footer>
            <script src="/script/vendors-index.js" />
            <script src="/script/index.js" />
        </body>
      </html>
    );
  }
}

module.exports = WrapperLayout;
