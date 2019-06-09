import React from 'react';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import config from '../../configPublic';

/* VIEWS
*************************************/

import LayoutWrapper from '../layout/wrapper.jsx';
import Header from '../template/header.jsx';
import NavigationMain from '../template/navigationMain.jsx';
import NavigationSearch from '../template/navigationSearch.jsx';
import Breadcrumbs from '../template/breadcrumbs.jsx';
import Footer from '../template/footer.jsx';

/* COMPONENT
*************************************/

class View extends React.PureComponent {

    pageContent() {
        return <div className="wrapper">
            <Header />
            <NavigationSearch />
            <NavigationMain />
            <main
                id="main-content"
                className={(this.props.state.data.isMainContentHidden? 'd-none d-sm-block' : 'd-block')}
            >
                <Breadcrumbs />
                <section className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Style Guide</h1>
                            <h2>Fonts</h2>

                            <p>Open Sans Light Regular <em>font-open-sans-light-regular</em></p>
                            <p className="font-open-sans-light-regular">The quick brown fox jumps over the lazy dog</p>

                            <p>Open Sans Light Italic <em>font-open-sans-light-italic</em></p>
                            <p className="font-open-sans-light-italic">The quick brown fox jumps over the lazy dog</p>

                            <p>Open Sans Regular <em>font-open-sans-regular</em></p>
                            <p className="font-open-sans-regular">The quick brown fox jumps over the lazy dog</p>

                            <p>Open Sans Italic <em>font-open-sans-italic</em></p>
                            <p className="font-open-sans-italic">The quick brown fox jumps over the lazy dog</p>

                            <p>Open Sans Semi bold Regular <em>font-open-sans-semi-bold-regular</em></p>
                            <p className="font-open-sans-semi-bold-regular"
                            >The quick brown fox jumps over the lazy dog</p>

                            <p>Open Sans Semi bold italic <em>font-open-sans-semi-bold-italic</em></p>
                            <p className="font-open-sans-semi-bold-italic"
                            >The quick brown fox jumps over the lazy dog</p>

                            <p>Open Sans Bold <em>font-open-sans-bold</em></p>
                            <p className="font-open-sans-bold">The quick brown fox jumps over the lazy dog</p>

                            <p>Open Sans Bold Italic <em>font-open-sans-bold-italic</em></p>
                            <p className="font-open-sans-bold-italic">The quick brown fox jumps over the lazy dog</p>

                            <p>Open Sans Extra Bold regular <em>font-open-sans-extra-bold-regular</em></p>
                            <p className="font-open-sans-extra-bold-regular"
                            >The quick brown fox jumps over the lazy dog</p>

                            <p>Open Sans Extra Bold Italic <em>font-open-sans-extra-bold-italic</em></p>
                            <p className="font-open-sans-extra-bold-italic"
                            >The quick brown fox jumps over the lazy dog</p>

                            <h2>Colors</h2>
                            <p>black-1 <em>#333</em></p>
                            <div className="swatch color-black-1-background"></div>
                            <p>blue-1 <em>#06f</em></p>
                            <div className="swatch color-blue-1-background"></div>
                            <p>grey-1 <em>#f2f2f2</em></p>
                            <div className="swatch color-grey-1-background"></div>
                            <p>grey-2 <em>#ccc</em></p>
                            <div className="swatch color-grey-2-background"></div>
                            <p>grey-3 <em>#999</em></p>
                            <div className="swatch color-grey-3-background"></div>
                            <p>grey-4 <em>#666</em></p>
                            <div className="swatch color-grey-4-background"></div>
                            <p>green-1 <em>#679300</em></p>
                            <div className="swatch color-green-1-background"></div>
                            <p>white-1 <em>#fff</em></p>
                            <div className="swatch color-white-1-background"></div>

                            <h2>Anchors</h2>
                            <p>anchor-1</p>
                            <a className="anchor-1" href="javascript:void(0);">get the deal now</a>
                            <p>anchor-2</p>
                            <a className="anchor-2" href="javascript:void(0);">offer details</a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>;
    }

    render() {
        return (
            <Provider store={this.props.store}>
                {
                    this.props.fullDocumentRender === true?
                        <LayoutWrapper jsFile='style'>
                            {this.pageContent()}
                        </LayoutWrapper>
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
