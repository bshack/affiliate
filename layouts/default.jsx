var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
            <title>{this.props.title}</title>
            <link rel="stylesheet" type="text/css" media="all" href="//fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i" />
            <link rel="stylesheet" type="text/css" media="all" href="/style/index.css" />
        </head>
        <body>
            <header>
            logo
            </header>
            <main>
            </main>
            {this.props.children}
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

module.exports = DefaultLayout;
