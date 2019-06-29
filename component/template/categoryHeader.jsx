import React from 'react';
import {connect} from 'react-redux';

class View extends React.PureComponent {
    render() {
        return (
            <section className="category-header container">
                <div className="row no-gutters">
                    <div className='col-12'>
                        {this.props.state.data.category[0].title?
                            <h1>{this.props.state.data.category[0].title}</h1> : null}
                        {this.props.state.data.category[0].subtitle?
                            <h2>{this.props.state.data.category[0].subtitle}</h2> : null}
                    </div>
                </div>
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
