import React from 'react';
import Picture from './picture.jsx';

class View extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            main: true,
            secondary: false
        };
    }

    eventClickTab(e) {
        e.preventDefault();
        let target = e.target;
        if (target.tagName === 'IMG') {
            target = target.parentNode.parentNode.parentNode;
        }
        if (target.id === 'tab-1') {
            this.setState({
                main: true,
                secondary: false
            });
        } else {
            this.setState({
                main: false,
                secondary: true
            });
        }
    }

    render() {
        return (
            <div className="images row no-gutters">
                <ul role="tablist" className="col-2">
                    <li
                        key="main"
                        id="tab-1"
                        role="tab"
                        aria-controls="panel-1"
                        aria-selected={(this.state.main? 'true' : 'false')}
                        tabIndex={(this.state.main? '0' : '-1')}
                        onClick={this.eventClickTab.bind(this)}
                    >
                        <div className="image">
                            <Picture
                                data={this.props.data}
                                small={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                    + '-large'}
                                medium={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                    + '-large'}
                                large={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                    + '-large'}
                                xlarge={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                    + '-large'}
                                xxlarge={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                    + '-large'}
                            />
                        </div>
                    </li>
                    <li
                        key="additional"
                        id="tab-2"
                        role="tab"
                        aria-controls="panel-2"
                        aria-selected={(this.state.secondary? 'true' : 'false')}
                        tabIndex={(this.state.secondary? '0' : '-1')}
                        onClick={this.eventClickTab.bind(this)}
                    >
                        <div className="image">
                            <Picture
                                data={this.props.data}
                                small={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                    + '-additional-small'}
                                medium={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                    + '-additional-small'}
                                large={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                    + '-additional-small'}
                                xlarge={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                    + '-additional-small'}
                                xxlarge={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                    + '-additional-small'}
                            />
                        </div>
                    </li>
                </ul>
                <div
                    id="panel-1"
                    aria-labelledby="tab-1"
                    role="tabpanel"
                    aria-hidden={(this.state.main? 'false' : 'true')}
                    className="col-10"
                >
                    <div className="image">
                        <Picture
                            data={this.props.data}
                            small={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                + '-large'}
                            medium={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                + '-large'}
                            large={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                + '-large'}
                            xlarge={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                + '-large'}
                            xxlarge={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                + '-large'}
                        />
                    </div>
                </div>
                <div
                    id="panel-2"
                    aria-labelledby="tab-2"
                    role="tabpanel"
                    aria-hidden={(this.state.secondary? 'false' : 'true')}
                    className="col-10"
                >
                    <div className="image">
                        <Picture
                            data={this.props.data}
                            small={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                + '-additional-large'}
                            medium={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                + '-additional-large'}
                            large={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                + '-additional-large'}
                            xlarge={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                + '-additional-large'}
                            xxlarge={this.props.data.path + '/' + this.props.data.seoFilenamePart
                                + '-additional-large'}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export default View;
