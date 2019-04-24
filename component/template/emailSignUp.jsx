const React = require('react');
const Regex = require('../../utility/regex');
const UtilityAJAX = require('../../utility/ajax');

const regex = new Regex();
const utilityAJAX = new UtilityAJAX();

class View extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            value: '',
            isValid: true,
            hasErrored: false,
            errorMessage: false,
            successMessage: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
        if (this.state.hasErrored && !this.isValid()) {
            this.setState({
                isValid: false,
                errorMessage: false,
                successMessage: false
            });
        } else {
            this.setState({
                isValid: true,
                errorMessage: false,
                successMessage: false
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            utilityAJAX
                .request({
                    method: 'PUT',
                    url: '/email/subscribe',
                    params: {
                        email: this.state.value.trim().toLowerCase()
                    }
                })
                .then((data) => {
                    this.setState({
                        value: '',
                        isValid: true,
                        successMessage: data.message,
                        errorMessage: false
                    });
                })
                .catch((data) => {
                    this.setState({
                        isValid: false,
                        successMessage: false,
                        errorMessage: data.message
                    });
                });
        } else {
            this.setState({
                isValid: false,
                hasErrored: true,
                successMessage: false,
                errorMessage: false
            });
        }

    }

    isValid() {
        return regex.email.test(this.state.value);
    }

    message() {
        if (this.state.isValid === true) {
            if (this.state.successMessage) {
                return <div className="success">{this.state.successMessage}</div>;
            } else {
                return '';
            }
        } else if (this.state.isValid === false) {
            if (this.state.errorMessage) {
                return <div className="error">{this.state.errorMessage}</div>;
            } else {
                return <div className="error">please enter a valid email address</div>;
            }
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
                                {this.message()}
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
