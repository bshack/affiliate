import React from 'react';
import {connect} from 'react-redux';
import NavigationFooter from './navigationFooter.jsx';

class View extends React.Component {
    render() {
        return (
            <footer className="container">
                <div className="row">
                    <div className="col-12">
                        <NavigationFooter
                            data={this.props.navigationFooter}
                            configPublic={this.props.config} />
                        {String.fromCharCode(169) + ' ' + (new Date().getFullYear())}
                    </div>
                </div>
            </footer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        navigationFooter: state.data.navigationFooter,
        config: state.data.config
    }
}

export default connect(
    mapStateToProps,
    {}
)(View);
