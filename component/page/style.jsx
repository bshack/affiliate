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
                <section className="container style-guide">
                    <div className="row margin-bottom-large">
                        <div className="col-12">
                            <h1 className="heading-1 margin-bottom-medium">Style Guide</h1>
                            <div className="row margin-bottom-large">
                                <div className="col-12">
                                    <h2 className="heading-2 margin-bottom-medium">Colors</h2>
                                    <h3>Primary</h3>
                                    <div className="row margin-bottom-medium">
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-blue-1"></div>
                                            <p className="label-style-standard">
                                                blue-1 (#14e8d5)
                                            </p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-green-2"></div>
                                            <p className="label-style-standard">
                                                green-2 (#11d37f)
                                            </p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-pink-1"></div>
                                            <p className="label-style-standard">
                                                pink-1 (#ff3c91)
                                            </p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-purple-1"></div>
                                            <p className="label-style-standard">
                                                purple-1 (#964bff)
                                            </p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-yellow-1"></div>
                                            <p className="label-style-standard">
                                                yellow-1 (#fff25f)
                                            </p>
                                        </div>
                                    </div>
                                    <h3>Secondary</h3>
                                    <div className="row margin-bottom-medium">
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-blue-2"></div>
                                            <p className="label-style-standard">
                                                blue-2 (#2ab1ce)
                                            </p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-blue-3"></div>
                                            <p className="label-style-standard">
                                                blue-3 (#00b9f0)
                                            </p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-green-1"></div>
                                            <p className="label-style-standard">
                                                green-1 (#00ff9c)
                                            </p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-purple-2"></div>
                                            <p className="label-style-standard">
                                                purple-2 (#6428a0)
                                            </p>
                                        </div>
                                    </div>
                                    <h3>Teritiary</h3>
                                    <div className="row margin-bottom-medium">
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-grey-1"></div>
                                            <p className="label-style-standard">
                                                grey-1 (#444)
                                            </p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-grey-2"></div>
                                            <p className="label-style-standard">
                                                grey-2 (#afafaf)
                                            </p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-grey-3"></div>
                                            <p className="label-style-standard">
                                                grey-3 (#e2e2e2)
                                            </p>
                                        </div>
                                    </div>
                                    <h3>Other</h3>
                                    <div className="row">
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-black-1"></div>
                                            <p className="label-style-standard">
                                                black-1 (#1c1c1c)
                                            </p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-blue-4"></div>
                                            <p className="label-style-standard">
                                                blue-4 (#007bff)
                                            </p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-white-1"></div>
                                            <p className="label-style-standard">
                                                white-1 (#fff)
                                            </p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch color-background-white-2"></div>
                                            <p className="label-style-standard">
                                                white-2 (#fff, .95 alpha)
                                            </p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch gradient-background-1"></div>
                                            <p className="label-style-standard">gradient-1</p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch gradient-background-2"></div>
                                            <p className="label-style-standard">gradient-2</p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch gradient-background-3"></div>
                                            <p className="label-style-standard">gradient-3</p>
                                        </div>
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="swatch gradient-background-4"></div>
                                            <p className="label-style-standard">gradient-4</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h2 className="heading-2 margin-bottom-medium">Fonts</h2>
                            <p>
                                <span
                                    className="font-open-sans-light-regular font-size-xxlarge color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Light Regular<br />font-open-sans-light-regular
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-light-italic font-size-xxlarge color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Light Italic<br />font-open-sans-light-italic
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-regular font-size-xxlarge color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Regular<br />font-open-sans-regular
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-italic font-size-xxlarge color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Italic<br />font-open-sans-italic
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-semi-bold-regular font-size-xxlarge color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Semi bold Regular<br />font-open-sans-semi-bold-regular
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-semi-bold-italic font-size-xxlarge color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Semi bold italic<br />font-open-sans-semi-bold-italic
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-bold font-size-xxlarge color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Bold<br />font-open-sans-bold
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-bold-italic font-size-xxlarge color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Bold Italic<br />font-open-sans-bold-italic
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-extra-bold-regular font-size-xxlarge color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Extra Bold regular<br />font-open-sans-extra-bold-regular
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-extra-bold-italic font-size-xxlarge color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Extra Bold Italic<br />font-open-sans-extra-bold-italic
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="row margin-bottom-large">
                        <div className="col-12">
                            <h2 className="heading-2 margin-bottom-medium">Font Sizes</h2>

                            <p>
                                <span
                                    className="font-open-sans-regular font-size-xxsmall color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    xxsmall (10px)<br />font-size-xxsmall
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-regular font-size-xsmall color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    xsmall (12px)<br />font-size-xsmall
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-regular font-size-small color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    small (14px)<br />font-size-small
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-regular font-size-medium color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    medium (16px)<br />font-size-medium
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-regular font-size-large color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    large (18px)<br />font-size-large
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-regular font-size-xlarge color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    xlarge (20px)<br />font-size-xlarge
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-regular font-size-xxlarge color-black-1"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    xxlarge (22px)<br />font-size-xxlarge
                                </span>
                            </p>

                        </div>
                    </div>
                    <div className="row margin-bottom-large">
                        <div className="col-12">
                            <h2 className="heading-2 margin-bottom-medium">Heading Styles</h2>
                            <p>
                                <span className="heading-1">
                                    The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    heading 1<br />heading-1
                                </span>
                            </p>
                            <p>
                                <span className="heading-2">
                                    The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    heading 2<br />heading-2
                                </span>
                            </p>
                            <p>
                                <span className="heading-3">
                                    The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    heading 3<br />heading-3
                                </span>
                            </p>
                            <p>
                                <span className="heading-4">
                                    The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    heading 4<br />heading-4
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="row margin-bottom-large">
                        <div className="col-12">
                            <h2 className="heading-2 margin-bottom-medium">Copy Styles</h2>
                            <p>
                                <span className="copy-style-standard">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo
                                    velit <a href="javascript:void(0);">vitae quam consecte</a> tur egestas. Proin
                                    in lacus metus. Vivamus <em>tincidunt tellus in pretium</em> vulputate. Ut
                                    mattis tortor e t enim tempus bibendum. Quisque id nisi vel libero tempus
                                    cursus. Sed nisi nibh, viverra id quam qui s, scelerisque mollis dui.
                                    <strong> Pellentesque consequat</strong> nec ex<sup>1</sup> ut facilisis.
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    standard<br />copy-style-standard
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="row margin-bottom-large">
                        <div className="col-12">
                            <h2 className="heading-2 margin-bottom-medium">Label Styles</h2>
                            <p>
                                <span
                                    className="label-style-standard"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    standard<br />label-style-standard
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="row margin-bottom-large">
                        <div className="col-12">
                            <h2 className="heading-2 margin-bottom-medium">Anchor Styles</h2>

                            <p>
                                <a className="anchor-standard" href="javascript:void(0);">click here</a>
                                <br />
                                <span className="label-style-standard">
                                    standard<br />anchor-standard
                                </span>
                            </p>

                            <p>
                                <a className="anchor-2" href="javascript:void(0);">get the deal now</a>
                                <br />
                                <span className="label-style-standard">
                                    anchor 2<br />anchor-2
                                </span>
                            </p>

                        </div>
                    </div>
                    <div className="row margin-bottom-large">
                        <div className="col-12">
                            <h2 className="heading-2 margin-bottom-medium">Button Styles</h2>
                            <p>
                                <button type="button" className="button-standard">click here</button>
                                <br />
                                <span className="label-style-standard">
                                    standard<br />button-standard
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="row margin-bottom-large">
                        <div className="col-12">
                            <h2 className="heading-2 margin-bottom-medium">Images</h2>
                            <h3>Graphics</h3>
                            <div className="row margin-bottom-medium">
                                <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                    <a href="./default/image/loader.svg" target="_blank">
                                        <img className="graphic" alt="loader.svg" src="./default/image/loader.svg" />
                                    </a>
                                    <p className="label-style-standard">
                                        loader.svg
                                    </p>
                                </div>
                                <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                    <a href="./default/image/logo-desktop-tagline.svg" target="_blank">
                                        <img
                                            className="graphic"
                                            alt="logo-desktop-tagline.svg"
                                            src="./default/image/logo-desktop-tagline.svg"
                                        />
                                    </a>
                                    <p className="label-style-standard">
                                        logo-desktop-tagline.svg
                                    </p>
                                </div>
                                <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                    <a href="./default/image/logo-mobile.svg" target="_blank">
                                        <img
                                            className="graphic"
                                            alt="logo-mobile.svg"
                                            src="./default/image/logo-mobile.svg"
                                        />
                                    </a>
                                    <p className="label-style-standard">
                                        logo-mobile.svg
                                    </p>
                                </div>
                            </div>
                            <h3>Icons</h3>
                            <div className="row margin-bottom-medium">
                                <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                    <a href="./default/image/menu-black.svg" target="_blank">
                                        <img
                                            className="icon"
                                            alt="menu-black.svg"
                                            src="./default/image/menu-black.svg"
                                        />
                                    </a>
                                    <p className="label-style-standard">
                                        menu-black.svg
                                    </p>
                                </div>
                                <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                    <a href="./default/image/menu-white.svg" target="_blank">
                                        <img
                                            className="icon reverse"
                                            alt="menu-white.svg"
                                            src="./default/image/menu-white.svg"
                                        />
                                    </a>
                                    <p className="label-style-standard">
                                        menu-white.svg
                                    </p>
                                </div>
                                <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                    <a href="./default/image/search-black.svg" target="_blank">
                                        <img
                                            className="icon"
                                            alt="search-black.svg"
                                            src="./default/image/search-black.svg"
                                        />
                                    </a>
                                    <p className="label-style-standard">
                                        search-black.svg
                                    </p>
                                </div>
                                <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                                    <a href="./default/image/search-white.svg" target="_blank">
                                        <img
                                            className="icon reverse"
                                            alt="search-white.svg"
                                            src="./default/image/search-white.svg"
                                        />
                                    </a>
                                    <p className="label-style-standard">
                                        search-white.svg
                                    </p>
                                </div>
                            </div>
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
                        <WrapperDefault jsFile='style'>
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
