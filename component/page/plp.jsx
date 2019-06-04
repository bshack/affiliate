import React from 'react';
import { Provider } from 'react-redux';
import config from '../../configPublic';

/* VIEWS
*************************************/

import LayoutWrapper from '../layout/wrapper.jsx';
import Header from '../template/header.jsx';
import Search from '../template/search.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import Breadcrumbs from '../template/breadcrumbs.jsx';
import CategoryProducts from '../template/categoryProducts.jsx';
import EmailSignUp from '../template/emailSignUp.jsx';
import Footer from '../template/footer.jsx';
import StoreSearch from '../../store/page/search';

const storeSearch = new StoreSearch(config);

/* COMPONENT
*************************************/

export default class View extends React.PureComponent {

    pageContent() {
        return <div id="wrapper">
            <Header />
            <Provider store={storeSearch.store}>
                <Search />
            </Provider>
            <NavigationMain />
            <main id="main-content">
                <Breadcrumbs />
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
                        <LayoutWrapper jsFile='plp'>
                            {this.pageContent()}
                        </LayoutWrapper>
                        :
                        this.pageContent()
                }
            </Provider>
        );
    }
}
