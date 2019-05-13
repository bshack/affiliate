import React from 'react';
import {connect} from 'react-redux';


class View extends React.Component {
    render() {
        return (
            <header>
                logo
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        config: state.data.config
    }
}

export default connect(
    mapStateToProps,
    {}
)(View);
