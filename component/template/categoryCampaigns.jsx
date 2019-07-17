import React from 'react';
import Campaign from './campaign.jsx';
import {connect} from 'react-redux';

class View extends React.PureComponent {

    campaigns() {

        let i;
        let str = '';
        let campaigns = [];

        {this.props.state.data.campaign.map(
            (campaign, index) => {
                campaigns.push(
                    <div key={index} className='col-12 col-md-4 col-lg-3'>
                        <Campaign campaign={campaign} />
                    </div>
                );
            }
        )}

        return <div className="campaigns row no-gutters">{campaigns}</div>;

    }

    render() {
        return (
            this.props.state.data.campaign.length ?
                <section className="category-campaigns container">
                    {this.campaigns()}
                </section>
                :
                null
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
