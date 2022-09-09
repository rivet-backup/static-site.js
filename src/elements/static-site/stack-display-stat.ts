import { LitElement, html, customElement, property } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './stack-display-stat.scss';

@customElement('stack-display-stat')
export class StackDisplayStat extends LitElement {
	static styles = cssify(styles);

	@property({ type: Number })
	value: number = 0;

	updateInterval: any = null;

	connectedCallback() {
		super.connectedCallback();

		this.updateInterval = setInterval(this.updateStat.bind(this), 250);
		this.updateStat();
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		clearInterval(this.updateInterval);
	}

	updateStat() {
		let hoursA = (Date.now() - 1606330800000) / 1000 / 60 / 60;
		let hoursPlayedA = hoursA * 650;

		let hoursB = (Date.now() - 1641236400000) / 1000 / 60 / 60;
		let hoursPlayedB = hoursB * 1700;

		this.value = Math.floor(hoursPlayedA + hoursPlayedB);
	}

	render() {
		let statStr = this.value.toString().padStart(9, '0');
		return html`
			<div id="base">
				<div id="header">Play Hours Served</div>
				<div id="holder">
					<div class="stat-tile">${statStr[0]}</div>
					<div class="stat-tile">${statStr[1]}</div>
					<div class="stat-tile">${statStr[2]}</div>
					<div class="stat-separator">,</div>
					<div class="stat-tile">${statStr[3]}</div>
					<div class="stat-tile">${statStr[4]}</div>
					<div class="stat-tile">${statStr[5]}</div>
					<div class="stat-separator">,</div>
					<div class="stat-tile">${statStr[6]}</div>
					<div class="stat-tile">${statStr[7]}</div>
					<div class="stat-tile">${statStr[8]}</div>
				</div>
			</div>
		`;
	}
}
