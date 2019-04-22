const React = require('react');

class View extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            value: '',
            isValid: true,
            hasErrored: false
        };

        /*eslint-disable*/
        this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        /*eslint-enable*/

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
        if (this.state.hasErrored && !this.isValid()) {
            this.setState({
                isValid: false
            });
        } else {
            this.setState({
                isValid: true
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    let response = JSON.parse(xhr.response);
                    if (response.success === true) {
                        this.setState({
                            value: '',
                            isValid: true
                        });
                    }
                }
            }
            xhr.open('PUT', '/email/subscribe');
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify({
                email: this.state.value.trim().toLowerCase()
            }));
        } else {
            this.setState({
                isValid: false,
                hasErrored: true
            });
        }

    }

    isValid() {
        return this.emailRegex.test(this.state.value);
    }

    errorMessage() {
        if (this.state.isValid) {
            return '';
        } else {
            return <div className="error">please enter a valid email address</div>;
        }
    }

    render() {
        return (
            <section className="email-sign-up container">
                <div className="row justify-content-center">
                    <div className="col-10 col-md-8">
                        <h2>Sign Up For Weekly Deal Emails</h2>
                        <p>Once a week we will deliver our best deals to you.</p>
                        <form
                            id="marketing-email-sign-up"
                            name="marketing-email-sign-up"
                            onSubmit={this.handleSubmit} noValidate
                        >
                            <fieldset>
                                <legend>provide your email address</legend>
                                <label
                                    id="email-sign-up-label"
                                    htmlFor="email-sign-up">email</label>
                                <input
                                    id="email-sign-up"
                                    name="email-sign-up"
                                    type="email"
                                    className={this.state.isValid === false ? 'error' : ''}
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    onKeyUp={this.handleChange}
                                    onInput={this.handleChange}
                                    placeholder="email" />
                                {this.errorMessage()}
                                <button
                                    id="marketing-email-sign-up-submit"
                                    name="marketing-email-sign-up-submit"
                                    type="submit"
                                >sign up</button>
                            </fieldset>
                        </form>
                        <small>Your privacy is important, we won't share your email with anyone.</small>
                    </div>
                </div>
            </section>
        );
    }
}

module.exports = View;
