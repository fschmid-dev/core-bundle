import { Controller } from '@hotwired/stimulus';

/* stimulusFetch: 'lazy' */
export default class extends Controller {
    static targets = ['progress'];
    static values = {
        closeCircleDuration: { type: Number, default: 3000 },
    }

    connect() {
        console.log('alert test');
        if (!this.element.parentElement.classList.contains('alert_container')) {
            const alertContainer = document.getElementsByClassName('alert_container')[0];
            alertContainer.appendChild(this.element);
        }

        if (this.hasProgressTarget) {
            const radius = this.progressTarget.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;

            this.element.style.setProperty('--initialStroke', circumference);

            setTimeout(() => {
                this.progressTarget.style.strokeDashoffset = 0;
                this.element.style.setProperty('--transitionDuration', `${this.closeCircleDurationValue}ms`)
                setTimeout(() => {
                    this.close()
                }, this.closeCircleDurationValue);
            }, 10);
        }
    }

    close () {
        this.element.style.height = this.element.offsetHeight + 'px';
        setTimeout(() => {
            this.element.classList.add('alert--close');
            setTimeout(() => {
                this.element.remove();
            }, 900);
        }, 10);
    }
}
