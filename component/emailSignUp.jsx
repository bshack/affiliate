var React = require('react');

class View extends React.Component {
  render() {
    return (
        <section className="email-sign-up container">
            <div className="row justify-content-center">
                <div className="col-10 col-md-8">
                    <h2>Sign Up For Weekly Deal Emails</h2>
                    <p>Once a week we will deliver our best deals to you.</p>
                    <form>
                        <input type="email" /><button type="submit">sign up</button>
                    </form>
                    <small>Your privacy is important, we won't share your email with anyone.</small>
                </div>
            </div>
        </section>
    );
  }
}

module.exports = View;
