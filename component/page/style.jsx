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
                    <div className="row">
                        <div className="col-12">
                            <h1>Style Guide</h1>
                            <h2>Fonts</h2>
                            <p>
                                <span
                                    className="font-open-sans-light-regular text-size-xxlarge"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Light Regular - font-open-sans-light-regular
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-light-italic text-size-xxlarge"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Light Italic - font-open-sans-light-italic
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-regular text-size-xxlarge"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Regular - font-open-sans-regular
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-italic text-size-xxlarge"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Italic - font-open-sans-italic
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-semi-bold-regular text-size-xxlarge"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Semi bold Regular - font-open-sans-semi-bold-regular
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-semi-bold-italic text-size-xxlarge"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Semi bold italic - font-open-sans-semi-bold-italic
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-bold text-size-xxlarge"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Bold - font-open-sans-bold
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-bold-italic text-size-xxlarge"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Bold Italic - font-open-sans-bold-italic
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-extra-bold-regular text-size-xxlarge"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Extra Bold regular - font-open-sans-extra-bold-regular
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-extra-bold-italic text-size-xxlarge"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    Open Sans Extra Bold Italic - font-open-sans-extra-bold-italic
                                </span>
                            </p>

                            <h2>Text Sizes</h2>

                            <p>
                                <span
                                    className="font-open-sans-regular text-size-xxsmall"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    xxsmall (10px) - text-size-xxsmall
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-regular text-size-xsmall"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    xsmall (12px) - text-size-xsmall
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-regular text-size-small"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    small (14px) - text-size-small
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-regular text-size-medium"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    medium (16px) - text-size-medium
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-regular text-size-large"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    large (18px) - text-size-large
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-regular text-size-xlarge"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    xlarge (20px) - text-size-xlarge
                                </span>
                            </p>

                            <p>
                                <span
                                    className="font-open-sans-regular text-size-xxlarge"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    xxlarge (22px) - text-size-xxlarge
                                </span>
                            </p>

                            <h2>Text Styles</h2>
                            <p>
                                <span
                                    className="text-style-standard"
                                >
                                        The quick brown fox jumps <em>over the</em>
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    standard - text-style-standard
                                </span>
                            </p>

                            <h2>Label Styles</h2>
                            <p>
                                <span
                                    className="label-style-standard"
                                >
                                        The quick brown fox jumps over the lazy dog
                                </span>
                                <br />
                                <span className="label-style-standard">
                                    standard - text-style-standard
                                </span>
                            </p>

                            <h2>Colors</h2>
                            <h3>Primary</h3>
                            <div className="row">
                                <div className="col-2">
                                    <div className="swatch color-background-blue-1"></div>
                                    <p className="label-style-standard">
                                        blue-1 <em>#14e8d5</em>
                                    </p>
                                </div>
                                <div className="col-2">
                                    <div className="swatch color-background-green-2"></div>
                                    <p className="label-style-standard">
                                        green-2 <em>#11d37f</em>
                                    </p>
                                </div>
                                <div className="col-2">
                                    <div className="swatch color-background-pink-1"></div>
                                    <p className="label-style-standard">
                                        pink-1 <em>#ff3c91</em>
                                    </p>
                                </div>
                                <div className="col-2">
                                    <div className="swatch color-background-purple-1"></div>
                                    <p className="label-style-standard">
                                        purple-1 <em>#964bff</em>
                                    </p>
                                </div>
                                <div className="col-2">
                                    <div className="swatch color-background-yellow-1"></div>
                                    <p className="label-style-standard">
                                        yellow-1 <em>#fff25f</em>
                                    </p>
                                </div>
                            </div>
                            <h3>Secondary</h3>
                            <div className="row">
                                <div className="col-2">
                                    <div className="swatch color-background-blue-2"></div>
                                    <p className="label-style-standard">
                                        blue-2 <em>#2ab1ce</em>
                                    </p>
                                </div>
                                <div className="col-2">
                                    <div className="swatch color-background-blue-3"></div>
                                    <p className="label-style-standard">
                                        blue-3 <em>#00b9f0</em>
                                    </p>
                                </div>
                                <div className="col-2">
                                    <div className="swatch color-background-green-1"></div>
                                    <p className="label-style-standard">
                                        green-1 <em>#00ff9c</em>
                                    </p>
                                </div>
                                <div className="col-2">
                                    <div className="swatch color-background-purple-2"></div>
                                    <p className="label-style-standard">
                                        purple-2 <em>#6428a0</em>
                                    </p>
                                </div>
                            </div>
                            <h3>Teritiary</h3>
                            <div className="row">
                                <div className="col-2">
                                    <div className="swatch color-background-grey-1"></div>
                                    <p className="label-style-standard">
                                        grey-1 <em>#444</em>
                                    </p>
                                </div>
                                <div className="col-2">
                                    <div className="swatch color-background-grey-2"></div>
                                    <p className="label-style-standard">
                                        grey-2 <em>#afafaf</em>
                                    </p>
                                </div>
                                <div className="col-2">
                                    <div className="swatch color-background-grey-3"></div>
                                    <p className="label-style-standard">
                                        grey-3 <em>#e2e2e2</em>
                                    </p>
                                </div>
                            </div>
                            <h3>Other</h3>
                            <div className="row">
                                <div className="col-2">
                                    <div className="swatch color-background-black-1"></div>
                                    <p className="label-style-standard">
                                        black-1 <em>#1c1c1c</em>
                                    </p>
                                </div>
                                <div className="col-2">
                                    <div className="swatch color-background-white-1"></div>
                                    <p className="label-style-standard">
                                        white-1 <em>#fff</em>
                                    </p>
                                </div>
                                <div className="col-2">
                                    <div className="swatch gradient-background-1"></div>
                                    <p className="label-style-standard">gradient-1</p>
                                </div>
                                <div className="col-2">
                                    <div className="swatch gradient-background-2"></div>
                                    <p className="label-style-standard">gradient-2</p>
                                </div>
                                <div className="col-2">
                                    <div className="swatch gradient-background-3"></div>
                                    <p className="label-style-standard">gradient-3</p>
                                </div>
                                <div className="col-2">
                                    <div className="swatch gradient-background-4"></div>
                                    <p className="label-style-standard">gradient-4</p>
                                </div>
                            </div>
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
