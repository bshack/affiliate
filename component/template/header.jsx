import React from 'react';
import {connect} from 'react-redux';


class View extends React.Component {
    render() {
        return (
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            {this.props.config.name}
                        </div>
                        <div className="col-8">
                            <fieldset>
                                <label htmlFor="search">search</label>
                                <input id="search" type="search" placeholder="search" />
                                <button type="submit">search</button>
                            </fieldset>
                        </div>
                        <div className="col-1" />
                    </div>
                </div>
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
