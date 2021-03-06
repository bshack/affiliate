import React from 'react';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import config from '../../configPublic';

/* VIEWS
*************************************/

import WrapperDefault from '../wrapper/default.jsx';
import Header from '../template/header.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import NavigationSearch from '../template/navigationSearch.jsx';
import Content from '../template/content.jsx';
import FeaturedProducts from '../template/featuredProducts.jsx';
import CategoryHeader from '../template/categoryHeader.jsx';
import CategoryProducts from '../template/categoryProducts.jsx';
import EmailSignUp from '../template/emailSignUp.jsx';
import EmailUnsubscribe from '../template/emailUnsubscribe.jsx';
import Footer from '../template/footer.jsx';

/* COMPONENT
*************************************/

class View extends React.PureComponent {

    pageContent() {
        return <div className="wrapper index">
            <Header />
            <NavigationSearch />
            <NavigationMain />
            <main
                id="main-content"
                className={(this.props.state.data.isMainContentHidden? 'closed' : null)}
            >
                <CategoryHeader
                    h1='Featured Products'
                />
                <FeaturedProducts />
                <EmailSignUp />
                <CategoryHeader
                    h2='What&apos;s New'
                />
                <CategoryProducts />
            </main>
            <Footer />
        </div>;
    }

    render() {
        return (
            <Provider store={this.props.store}>
                {
                    this.props.fullDocumentRender === true?
                        <WrapperDefault jsFile='index'>
                            {this.pageContent()}
                        </WrapperDefault>
                        :
                        this.pageContent()
                }
            </Provider>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(
    mapStateToProps
)(View);
