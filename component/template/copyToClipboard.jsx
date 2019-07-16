import React from 'react';
import ReactDOM from 'react-dom';
import Clipboard from 'clipboard';

class View extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
    }

    componentDidMount() {
        let node = ReactDOM.findDOMNode(this);
        this.clipboard = new Clipboard(node);
    }
    eventClickCode(e) {
        e.preventDefault();
        this.setState({
            copied: true
        });
    }

    render() {
        return (
            <button
                className={'copy-to-clipboard anchor-2' + (this.state.copied? ' copied' : '')}
                data-clipboard-text={this.props.content}
                onClick={this.eventClickCode.bind(this)}
            >{(this.state.copied? ' Copied' : 'Copy')}</button>
        );
    }

}

export default View;
