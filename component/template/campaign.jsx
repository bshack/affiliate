import React from 'react';
import CopyToClipboard from './copyToClipboard.jsx';

class View extends React.PureComponent {

    render() {

        return <div className="campaign">
            <div className="inner">
                <div className="type">Promo code</div>
                {
                    this.props.campaign.isExclusive?
                        <div>Exclusive</div>
                        :
                        null
                }
                <div className="title"><strong>{this.props.campaign.title}</strong></div>
                {
                    (this.props.campaign.code?
                        <div className="code">
                            <span>code:</span><br /><strong>{this.props.campaign.code}</strong>
                            <CopyToClipboard content={this.props.campaign.code} />
                            <div className="store"><span>use code at</span> <a href={this.props.campaign.url}
                            >{this.props.campaign.storeName}</a></div>
                        </div>
                        :
                        <div>
                            <span>no code needed, just click this link:</span>
                            <a
                                className="anchor-2"
                                href={this.props.campaign.url}
                            >Get Deal Now</a>
                        </div>
                    )
                }
            </div>
        </div>;
    }
}

export default View;
