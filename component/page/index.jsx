import React from 'react';
import {Provider} from 'react-redux';

/* VIEWS
*************************************/

import LayoutWrapper from '../layout/wrapper.jsx';
import Header from '../template/header.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import Content from '../template/content.jsx';
import FeaturedProducts from '../template/featuredProducts.jsx';
import CategoryProducts from '../template/categoryProducts.jsx';
import EmailSignUp from '../template/emailSignUp.jsx';
import EmailUnsubscribe from '../template/emailUnsubscribe.jsx';
import Footer from '../template/footer.jsx';

/* COMPONENT
*************************************/

export default class View extends React.Component {
    render() {
        return (
            <Provider store={this.props.store}>
                {
                    this.props.fullDocumentRender === true?
                        <LayoutWrapper jsFile='index'>
                            <div id="wrapper">
                                <Header />
                                <main>
                                    <NavigationMain />
                                    <Content />
                                    <FeaturedProducts />
                                    <EmailSignUp />
                                    <CategoryProducts />
                                </main>
                                <Footer />
                            </div>
                        </LayoutWrapper>
                        :
                        <div id="wrapper">
                            <Header />
                            <main>
                                <NavigationMain />
                                <Content />
                                <FeaturedProducts />
                                <EmailSignUp />
                                <CategoryProducts />
                            </main>
                            <Footer />
                        </div>
                }
            </Provider>
        );
    }
}
