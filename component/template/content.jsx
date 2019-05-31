import React from 'react';
import {connect} from 'react-redux';

class View extends React.PureComponent {
    render() {
        return (
            <section className="content container">
                <div className="row justify-content-center">
                    <div className={'col-12 col-md-10 content-'
                        + this.props.data[0].filename}
                    dangerouslySetInnerHTML={{__html: this.props.data[0].content}} />
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.content
    }
}

export default connect(
    mapStateToProps
)(View);
