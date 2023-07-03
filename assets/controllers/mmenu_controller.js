import { Controller } from '@hotwired/stimulus';
import { useWindowResize } from 'stimulus-use';

import 'mmenu-js/src/mmenu';
import 'mmenu-js/src/mmenu.scss';

export default class extends Controller {
    static values = {
        navbarContent: {
            type: String,
            default: '',
        },
        footerContent: {
            type: String,
            default: '',
        }
    }

    menu = null;
    footer = null;

    connect() {
        this.footer = document.getElementById('footer');

        this.initMenu();

        useWindowResize(this);
    }

    windowResize({ width }) {
        document.documentElement.style.setProperty('--header-height', this.element.getBoundingClientRect().height + 'px');

        if (this.footer) {
            document.documentElement.style.setProperty(
                '--footer-height',
                this.footer.getBoundingClientRect().height + 'px'
            );
        }

        if (width >= 992) {
            if (this.menu) {
                this.menu.close();
            }
        }
    }

    initMenu() {
        let navbars = true;
        if (this.navbarContentValue) {
            navbars = [
                {
                    content: [
                        this.navbarContentValue
                    ]
                },
                {
                    content: ['prev', 'title']
                }
            ]
        }

        if (this.footerContentValue) {
            const footer = {
                position: 'bottom',
                content: [
                    this.footerContentValue,
                ]
            }

            if (navbars === true) {
                navbars = [
                    footer
                ]
            } else {
                navbars.push(footer)
            }
        }

        this.menu = new Mmenu(
            '#mmenu',
            {
                offCanvas: {
                    position: 'bottom'
                },
                navbars: navbars
            }, {
                offCanvas: {
                    clone: true,
                },
                classNames: {
                    selected: 'menu-item--active'
                }
            }
        );

        setTimeout(() => {
            let panels = document.querySelectorAll('.mm-panel--noanimation');
            for (let i = 0; i < panels.length; i++) {
                panels[i].classList.remove('mm-panel--noanimation');
            }
        }, 10);
    }
}
