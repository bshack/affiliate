import React from 'react';
import CopyToClipboard from './copyToClipboard.jsx';
import {connect} from 'react-redux';

class View extends React.PureComponent {

    campaigns() {
        let i;
        let str = '';
        let campaigns = [];

        for (i = 0; i < this.props.state.data.campaign.length; i++) {
            campaigns.push(
                <div className="campaign col-12 col-md-4 col-lg-3" key={this.props.state.data.campaign[i].id}>
                    <div className="inner">
                        {
                            this.props.state.data.campaign[i].isExclusive?
                                <div>Exclusive</div>
                                :
                                null
                        }
                        <div className="title"><strong>{this.props.state.data.campaign[i].title}</strong></div>
                        {
                            (this.props.state.data.campaign[i].code?
                                <div className="code">
                                    <span>code:</span><br /><strong>{this.props.state.data.campaign[i].code}</strong>
                                    <CopyToClipboard content={this.props.state.data.campaign[i].code} />
                                </div>
                                :
                                <div>
                                    <span>no code needed, just click this link:</span>
                                    <a
                                        className="anchor-2"
                                        href={this.props.state.data.campaign[i].url}
                                    >Get Deal Now</a>
                                </div>
                            )
                        }
                        <div className="store"><span>use code at</span> <a href={this.props.state.data.campaign[i].url}
                        >{this.props.state.data.campaign[i].storeName}</a></div>
                    </div>
                </div>
            );
        }
        return <div className="campaigns row no-gutters">{campaigns}</div>;
    }

    render() {
        return (
            <section className="category-campaigns container">
                <h2>Promo Codes</h2>
                {this.campaigns()}
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
};

export default connect(
    mapStateToProps
)(View);
