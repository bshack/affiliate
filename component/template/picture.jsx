import React from 'react';

class View extends React.Component {
    render() {

        let cdn = this.props.configPublic.cdn.origin + '/';
        let slug = '';
        if (this.props.slug) {
            slug = '-' + this.props.slug;
        }

        return (
            <picture>
                <source
                    media={'(max-width: 39.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 39.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-small@2x.webp'}
                    type='image/webp'
                />
                <source
                    media='(max-width: 39.9375rem)'
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-small.webp'}
                    type='image/webp'
                />
                <source
                    media={'(max-width: 39.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 39.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-small@2x.jpg'}
                />
                <source
                    media='(max-width: 39.9375rem)'
                    srcSet={cdn + this.props.data.path+ '/'
                        + this.props.data.seoFilenamePart + slug + '-small.jpg'}
                />
                <source
                    media={'(max-width: 63.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 63.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.data.path+ '/'
                        + this.props.data.seoFilenamePart + slug + '-medium@2x.webp'}
                    type='image/webp'
                />
                <source
                    media='(max-width: 63.9375rem)'
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-medium.webp'}
                    type='image/webp'
                />
                <source
                    media={'(max-width: 63.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 63.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-medium@2x.jpg'}
                />
                <source
                    media='(max-width: 63.9375rem)'
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-medium.jpg'}
                />
                <source
                    media={'(max-width: 74.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 74.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-large@2x.webp'}
                    type='image/webp'
                />
                <source
                    media='(max-width: 74.9375rem)'
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-large.webp'}
                    type='image/webp'
                />
                <source
                    media={'(max-width: 74.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 74.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-large@2x.jpg'}
                />
                <source
                    media='(max-width: 74.9375rem)'
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-large.jpg'}
                />
                <source
                    media={'(max-width: 89.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 89.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-large@2x.webp'}
                    type='image/webp'
                />
                <source
                    media='(max-width: 89.9375rem)'
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-large.webp'}
                    type='image/webp'
                />
                <source
                    media={'(max-width: 89.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 89.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-large@2x.jpg'}
                />
                <source
                    media='(max-width: 89.9375rem)'
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-large.jpg'}
                />
                <source
                    media={'(max-width: 400rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 400rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-large@2x.webp'}
                    type='image/webp'
                />
                <source
                    media='(max-width: 400rem)'
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-large.webp'}
                    type='image/webp'
                />
                <source
                    media={'(max-width: 400rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 400rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-large@2x.jpg'}
                />
                <source
                    media='(max-width: 400rem)'
                    srcSet={cdn + this.props.data.path+ '/' + this.props.data.seoFilenamePart + slug + '-large.jpg'}
                />
                <img
                    src='data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw=='
                    alt={this.props.data.title}
                />
            </picture>
        );
    }
}

export default View;
