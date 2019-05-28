import React from 'react';
import {connect} from 'react-redux';
import NavigationFooter from '../template/navigationFooter.jsx';
import config from '../../configPublic';


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
            descriptionSEO = <meta name="description" content={config.description} />;
            descriptionSocial = config.description;
        }

        return (
            <html lang={config.locale} dir="ltr">
                <head>
                    <meta charSet="utf-8" />
                    <title>{this.props.data.meta.title}</title>
                    <meta httpEquiv="x-ua-compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no" />
                    {descriptionSEO}
                    <meta name="twitter:card" content={config.social.twitter.card} />
                    <meta name="twitter:site" content={config.social.twitter.name} />
                    <meta name="twitter:url" content={this.props.data.meta.canonical} />
                    <meta name="twitter:title" content={this.props.data.meta.title} />
                    <meta name="twitter:description" content={descriptionSocial} />
                    <meta name="twitter:image" content={'/' + config.static.version
                        + this.props.data.meta.image} />
                    <meta name="twitter:image:alt" content={this.props.data.meta.title} />
                    <meta property="og:title" content={this.props.data.meta.title} />
                    <meta property="og:type" content={config.social.facebook.type} />
                    <meta property="og:url" content={this.props.data.meta.canonical} />
                    <meta property="og:image:url" content={'/' + config.static.version
                        + this.props.data.meta.image} />
                    <meta property="og:image:height" content={config.social.facebook.imageHeight} />
                    <meta property="og:image:width" content={config.social.facebook.imageWidth} />
                    <meta property="og:image:alt" content={this.props.data.meta.title} />
                    <meta property="og:site_name" content={config.name} />
                    <meta property="og:description" content={descriptionSocial} />
                    <meta property="og:locale" content={config.locale} />
                    <meta property="fb:admins" content={config.social.facebook.admins} />
                    <meta property="fb:app_id" content={config.social.facebook.app_id} />
                    <link rel="icon" type="image/x-icon" href={'/' + config.static.version
                        + '/' + config.favicon} />
                    <link rel="canonical" href={this.props.data.meta.canonical} />
                    <link rel="stylesheet" type="text/css" media="all" href={'/'
                        + config.static.version + '/style/index.css'} />
                </head>
                <body>
                    <h1>hi!2</h1>
                    <div id="app">
                        {this.props.children}
                    </div>
                    <script src={'/' + config.static.version + '/script/global.js'} />
                    <script src={'/' + config.static.version
                        + '/script/' + this.props.jsFile + '.js'} />
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
