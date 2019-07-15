import React from 'react';

import {connect} from 'react-redux';

class View extends React.PureComponent {

    render() {
        return (
            <section className="category-campaigns container">
                yo
            </section>
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
