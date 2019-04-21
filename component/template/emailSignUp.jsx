const React = require('react');

class View extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let xhr = new xhrRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log(JSON.parse(xhr.response));
            }
        }
        xhr.open('POST', '/email/subscribe');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            email: this.state.value
        }));
    }

    render() {
        return (
            <section className="email-sign-up container">
                <div className="row justify-content-center">
                    <div className="col-10 col-md-8">
                        <h2>Sign Up For Weekly Deal Emails</h2>
                        <p>Once a week we will deliver our best deals to you.</p>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="email"
                                value={this.state.value}
                                onChange={this.handleChange}
                                placeholder="email" />
                            <button type="submit">sign up</button>
                        </form>
                        <small>Your privacy is important, we won't share your email with anyone.</small>
                    </div>
                </div>
            </section>
        );
    }
}

module.exports = View;
