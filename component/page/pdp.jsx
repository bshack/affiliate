import React from 'react';
import { Provider } from 'react-redux';

/* VIEWS
*************************************/

import LayoutWrapper from '../layout/wrapper.jsx';
import Header from '../template/header.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import Breadcrumbs from '../template/breadcrumbs.jsx';
import ProductDetail from '../template/productDetail.jsx';
import RecommendationProducts from '../template/recommendationProducts.jsx';
import EmailSignUp from '../template/emailSignUp.jsx';
import Footer from '../template/footer.jsx';

/* COMPONENT
*************************************/

export default class View extends React.PureComponent {
    render() {
        return (
            <Provider store={this.props.store}>
                {
                    this.props.fullDocumentRender === true?
                        <LayoutWrapper jsFile='pdp'>
                            <div id="wrapper">
                                <Header />
                                <main>
                                    <NavigationMain />
                                    <Breadcrumbs />
                                    <ProductDetail />
                                    <RecommendationProducts />
                                    <EmailSignUp />
                                </main>
                                <Footer />
                            </div>
                        </LayoutWrapper>
                        :
                        <div id="wrapper">
                            <Header />
                            <main>
                                <NavigationMain />
                                <Breadcrumbs />
                                <ProductDetail />
                                <RecommendationProducts />
                                <EmailSignUp />
                            </main>
                            <Footer />
                        </div>
                }
            </Provider>
        );
    }
}
