import React from 'react';
import {connect} from 'react-redux';
import NavigationFooter from './navigationFooter.jsx';
import config from '../../configPublic';

class View extends React.PureComponent {
    render() {
        return (
            <footer className={(this.props.state.data.isMainContentHidden? 'd-none d-sm-block' : 'd-block')}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <NavigationFooter
                                data={this.props.state.data.navigationFooter}
                                configPublic={config} />
                            <small>{String.fromCharCode(169) + ' ' + (new Date().getFullYear()) +
                                ' ' + config.name}</small>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(
    mapStateToProps
)(View);
