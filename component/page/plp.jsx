import React from 'react';
import { Provider } from 'react-redux';
import {connect} from 'react-redux';
import config from '../../configPublic';

/* VIEWS
*************************************/

import WrapperDefault from '../wrapper/default.jsx';
import Header from '../template/header.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import NavigationSearch from '../template/navigationSearch.jsx';
import Breadcrumbs from '../template/breadcrumbs.jsx';
import CategoryHeader from '../template/categoryHeader.jsx';
import CategoryProducts from '../template/categoryProducts.jsx';
import CategoryCampaigns from '../template/categoryCampaigns.jsx';
import EmailSignUp from '../template/emailSignUp.jsx';
import Footer from '../template/footer.jsx';

/* COMPONENT
*************************************/

class View extends React.PureComponent {
    pageContent() {
        return <div className="wrapper plp">
            <Header />
            <NavigationSearch />
            <NavigationMain />
            <main
                id="main-content"
                className={(this.props.state.data.isMainContentHidden? 'closed' : null)}
            >
                <Breadcrumbs />
                <CategoryHeader
                    h1={this.props.state.data.category[0].title}
                    h2={this.props.state.data.category[0].subtitle}
                />
                <CategoryCampaigns />
                <CategoryProducts />
                <EmailSignUp />
            </main>
            <Footer />
        </div>;
    }

    render() {
        return (
            <Provider store={this.props.store}>
                {
                    this.props.fullDocumentRender === true?
                        <WrapperDefault jsFile='plp'>
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
