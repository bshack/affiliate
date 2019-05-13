import React from 'react';
import {connect} from 'react-redux';
import NavigationFooter from '../template/navigationFooter.jsx';

/* COMPONENT
*************************************/

class WrapperLayout extends React.Component {
    render() {
        let descriptionSEO;
        let descriptionSocial;
        if (this.props.data.meta.description && this.props.data.meta.description !== '') {
            descriptionSEO = <meta name="description" content={this.props.data.meta.description} />;
            descriptionSocial = this.props.data.meta.description;
        } else {
            descriptionSocial = this.props.data.config.description;
        }

        return (
            <html lang={this.props.data.config.locale} dir="ltr">
                <head>
                    <meta charSet="utf-8" />
                    <title>{this.props.title}</title>
                    <meta httpEquiv="x-ua-compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no" />
                    {descriptionSEO}
                    <meta name="twitter:card" content={this.props.data.config.social.twitter.card} />
                    <meta name="twitter:site" content={this.props.data.config.social.twitter.name} />
                    <meta name="twitter:url" content={this.props.data.canonical} />
                    <meta name="twitter:title" content={this.props.data.title} />
                    <meta name="twitter:description" content={descriptionSocial} />
                    <meta name="twitter:image" content={this.props.data.image} />
                    <meta name="twitter:image:alt" content={this.props.data.title} />
                    <meta property="og:title" content={this.props.data.title} />
                    <meta property="og:type" content={this.props.data.config.social.facebook.type} />
                    <meta property="og:url" content={this.props.data.canonical} />
                    <meta property="og:image:url" content={this.props.data.image} />
                    <meta property="og:image:height" content={this.props.data.config.social.facebook.imageHeight} />
                    <meta property="og:image:width" content={this.props.data.config.social.facebook.imageWidth} />
                    <meta property="og:image:alt" content={this.props.data.title} />
                    <meta property="og:site_name" content={this.props.data.config.name} />
                    <meta property="og:description" content={descriptionSocial} />
                    <meta property="og:locale" content={this.props.data.config.locale} />
                    <meta property="fb:admins" content={this.props.data.config.social.facebook.admins} />
                    <meta property="fb:app_id" content={this.props.data.config.social.facebook.app_id} />
                    <link rel="canonical" href={this.props.data.canonical} />
                    <link rel="stylesheet" type="text/css" media="all" href="/style/index.css" />
                </head>
                <body>
                    <div id="app">
                        {this.props.children}
                    </div>
                    <script src="/script/global.js" />
                    <script src={'/script/' + this.props.jsFile + '.js'} />
                </body>
            </html>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

export default connect(
    mapStateToProps,
    {}
)(WrapperLayout);
