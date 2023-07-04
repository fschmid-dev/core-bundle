const TurboHelper = class {
    constructor() {
        document.addEventListener('turbo:before-cache', () => {
            this.closeMenu();
        });

        document.addEventListener('turbo:before-render', (event) => {
            this.beforeRender(event);
        });

        document.addEventListener('turbo:before-fetch-request', (event) => {
            this.beforeFetchRequest(event);
        });

        document.addEventListener('turbo:before-fetch-response', (event) => {
            this.beforeFetchResponse(event);
        });
    }

    closeMenu() {
        if (document.body.classList.contains('mm-wrapper--opened')) {
            const mBurger = document.querySelector('mm-burger');
            if (mBurger) {
                mBurger.click();
                mBurger.remove();
            }

            const mMenu = document.querySelector('#mm-clone-mmenu');
            if (mMenu) {
                mMenu.remove();
            }

            /*
            const mWrapperBlocker = document.querySelector('.mm-blocker');
            if (mWrapperBlocker) {
                mWrapperBlocker.remove();
            }
             */
        }
    }

    beforeRender(event) {
        console.log(event);
    }

    beforeFetchRequest(event) {
        event.detail.fetchOptions.headers['Turbo-Fetch'] = 1;
        const frameId = event.detail.fetchOptions.headers['Turbo-Frame'];
        if (!frameId) {
            return;
        }
        const frame = document.querySelector(`#${frameId}`);
        if (!frame || !frame.dataset.turboFormRedirect) {
            return;
        }
        event.detail.fetchOptions.headers['Turbo-Frame-Redirect'] = 1;
    }

    beforeFetchResponse(event) {
        const fetchResponse = event.detail.fetchResponse;
        const redirectLocation = fetchResponse.response.headers.get('Turbo-Location');

        if (!redirectLocation) {
            console.log('no redirect location');
            return;
        }

        event.preventDefault();
        Turbo.clearCache();
        Turbo.visit(redirectLocation);
    }
};

export default new TurboHelper();
