class Window {

    getBreakpoint(window) {

        let smallBreakpoint = 576;
        let mediumBreakpoint = 768;
        let largeBreakpoint = 992;
        let xlargeBreakpoint = 1200;

        if (window.outerWidth < smallBreakpoint) {
            return 'xsmall';
        }

        if (window.outerWidth >= smallBreakpoint && window.outerWidth < mediumBreakpoint) {
            return 'small';
        }

        if (window.outerWidth >= mediumBreakpoint && window.outerWidth < largeBreakpoint) {
            return 'medium';
        }

        if (window.outerWidth >= largeBreakpoint && window.outerWidth <= xlargeBreakpoint) {
            return 'large';
        }

        if (window.outerWidth >= xlargeBreakpoint) {
            return 'xlarge';
        }

    }

}

export default Window;
