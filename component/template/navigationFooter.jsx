import React from 'react';

class View extends React.PureComponent {
    render() {
        return (
            <nav className="navigation-footer" aria-label="footer navigation">
                <ul>
                    {this.props.data.map(
                        (content, index) =>
                            <li key={index}><a href={'/' + content.filename + '.html'}>{content.title}</a></li>
                    )}
                </ul>
            </nav>
        );
    }
}

export default View;
