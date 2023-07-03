import { Controller } from '@hotwired/stimulus';

import 'mburger-webcomponent/dist/mburger';

export default class extends Controller {
    static values = {
        mBurger: {
            type: String,
            default: '',
        }
    }

    connect() {
        if (this.mBurgerValue === '') {
            console.error('empty mBurger value');
        } else {
            this.element.innerHTML = this.mBurgerValue;
        }
    }
}
