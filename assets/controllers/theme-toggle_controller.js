import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static values = {
        write: Boolean
    };

    target = null;

    connect() {
        if (this.writeValue) {
            this.target = document.body;
        } else {
            this.target = document.documentElement || document.getElementsByTagName('html')[0];
        }
    }

    toggle(event) {
        event.preventDefault();

        const currentTheme = getCookie('theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setCookie('theme', newTheme, 60, '.fschmid.wip');

        /*
        this.target.classList.remove(
            this.writeValue ? 'ea-' + currentTheme + '-scheme' : 'theme-' + currentTheme
        );
        this.target.classList.add(
            this.writeValue ? 'ea-' + newTheme + '-scheme' : 'theme-' + newTheme
        );
         */
        document.getElementsByTagName('html')[0].dataset.bsTheme = newTheme;
        let target = event.target;
        if (target.tagName !== 'a') {
            target = target.closest('a');
        }
        target.blur();
    }

    getCookie(cname) {
        let name = cname + '=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return false;
    }

    setCookie(cname, cvalue = false, exdays = 60, cdomain = null) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toUTCString();
        let cookieString = cname + '=' + cvalue + ';' + expires + ';path=/';

        if (cdomain) {
            cookieString += ';domain=' + cdomain;
        }

        document.cookie = cookieString;
    }
}
