import React from 'react';
import config from '../../configPublic';

class View extends React.PureComponent {
    render() {
        let cdn = config.cdn.origin + '/';
        return (
            <picture>
                <source
                    media={'(max-width: 39.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 39.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.small + '@2x.webp'}
                    type='image/webp'
                />
                <source
                    media='(max-width: 39.9375rem)'
                    srcSet={cdn + this.props.small + '.webp'}
                    type='image/webp'
                />
                <source
                    media={'(max-width: 39.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 39.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.small + '@2x.jpg'}
                />
                <source
                    media='(max-width: 39.9375rem)'
                    srcSet={cdn + this.props.small + '.jpg'}
                />
                <source
                    media={'(max-width: 63.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 63.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.medium + '@2x.webp'}
                    type='image/webp'
                />
                <source
                    media='(max-width: 63.9375rem)'
                    srcSet={cdn + this.props.medium + '.webp'}
                    type='image/webp'
                />
                <source
                    media={'(max-width: 63.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 63.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.medium + '@2x.jpg'}
                />
                <source
                    media='(max-width: 63.9375rem)'
                    srcSet={cdn + this.props.medium + '.jpg'}
                />
                <source
                    media={'(max-width: 74.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 74.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.large + '@2x.webp'}
                    type='image/webp'
                />
                <source
                    media='(max-width: 74.9375rem)'
                    srcSet={cdn + this.props.large + '.webp'}
                    type='image/webp'
                />
                <source
                    media={'(max-width: 74.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 74.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.large + '@2x.jpg'}
                />
                <source
                    media='(max-width: 74.9375rem)'
                    srcSet={cdn + this.props.large + '.jpg'}
                />
                <source
                    media={'(max-width: 89.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 89.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.large + '@2x.webp'}
                    type='image/webp'
                />
                <source
                    media='(max-width: 89.9375rem)'
                    srcSet={cdn + this.props.large + '.webp'}
                    type='image/webp'
                />
                <source
                    media={'(max-width: 89.9375rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 89.9375rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.large + '@2x.jpg'}
                />
                <source
                    media='(max-width: 89.9375rem)'
                    srcSet={cdn + this.props.large + '.jpg'}
                />
                <source
                    media={'(max-width: 400rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 400rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.large + '@2x.webp'}
                    type='image/webp'
                />
                <source
                    media='(max-width: 400rem)'
                    srcSet={cdn + this.props.large + '.webp'}
                    type='image/webp'
                />
                <source
                    media={'(max-width: 400rem) and (min-resolution: 192dpi),'
                        + ' (max-width: 400rem) and (-webkit-min-device-pixel-ratio: 2)'}
                    srcSet={cdn + this.props.large + '@2x.jpg'}
                />
                <source
                    media='(max-width: 400rem)'
                    srcSet={cdn + this.props.large + '.jpg'}
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
