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
import ProductDetail from '../template/productDetail.jsx';
import RecommendationProducts from '../template/recommendationProducts.jsx';
import EmailSignUp from '../template/emailSignUp.jsx';
import Footer from '../template/footer.jsx';

/* COMPONENT
*************************************/

class View extends React.PureComponent {

    pageContent() {
        return <div className="wrapper pdp">
            <Header />
            <NavigationSearch />
            <NavigationMain />
            <main
                id="main-content"
                className={(this.props.state.data.isMainContentHidden? 'd-none d-sm-block' : 'd-block')}
            >
                <Breadcrumbs />
                <ProductDetail />
                <RecommendationProducts />
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
                        <WrapperDefault jsFile='pdp'>
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
