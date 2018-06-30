var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
            <title>{this.props.title}</title>
            <link rel="stylesheet" type="text/css" media="all" href="//fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i" />
            <link rel="stylesheet" type="text/css" media="all" href="/style/global.css" />
        </head>
        <body>
            <header>
            logo
            </header>
            {this.props.children}
            <footer>
            &copy;
            </footer>
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;
