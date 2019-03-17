import React from 'react';
import ReactDOM from 'react-dom';

export default function yo() {

    class HelloMessage extends React.Component {

        componentDidMount() {

        }

        render() {
            return (
                <div>
                    <h1>Hello, world!</h1>
                </div>
            );
        }
    }

    ReactDOM.render(
        <HelloMessage />,
        document.querySelector('main')
    );

}
