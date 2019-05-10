import React from 'react';
import Regex from '../../utility/regex';
import {connect} from 'react-redux';
import axios from 'axios';

const regex = new Regex();

class View extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            value: this.props.data.email,
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
                successMessage: false,
                errorMessage: false
            });
        } else {
            this.setState({
                isValid: true,
                successMessage: false,
                errorMessage: false
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            return axios.patch('/service/email/unsubscribe', {
                email: this.state.value.trim().toLowerCase()
            })
                .then((data) => {
                    this.setState({
                        value: '',
                        isValid: true,
                        successMessage: data.message,
                        errorMessage: false
                    });
                })
                .catch((error) => {
                    this.setState({
                        isValid: false,
                        successMessage: false,
                        errorMessage: error.message
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
            <section className="email-unsubscribe container">
                <div className="row justify-content-center">
                    <div className="col-10 col-md-8">
                        <h2>Unsubscribe From Weekly Deal Emails</h2>
                        <p>Sorry to see you go.</p>
                        <form
                            id="marketing-email-unsubscribe"
                            name="marketing-email-unsubscribe"
                            onSubmit={this.handleSubmit} noValidate
                        >
                            <fieldset>
                                <legend>provide your email address</legend>
                                <label
                                    id="email-unsubscribe-label"
                                    htmlFor="email-unsubscribe">email</label>
                                <input
                                    id="email-unsubscribe"
                                    name="email-unsubscribe"
                                    type="email"
                                    className={this.state.isValid === false ? 'error' : ''}
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    onKeyUp={this.handleChange}
                                    onInput={this.handleChange}
                                    placeholder="email" />
                                {this.message()}
                                <button
                                    id="marketing-email-unsubscribe-submit"
                                    name="marketing-email-unsubscribe-submit"
                                    type="submit"
                                >unsubscribe</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.unsubscribe
    }
}

export default connect(
    mapStateToProps,
    {}
)(View);
