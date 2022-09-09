import { LitElement, html, customElement, property, query, PropertyValues, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import timing from '../../utils/timing';
import { classMap } from 'lit-html/directives/class-map';
import styles from './pricing-card.scss';
import assets from '../../data/assets';
import numbro from 'numbro';
import { PricingInfoSection } from './pricing-display';
import { RangeSliderConfig, SliderChangeEvent } from '../common/range-slider';

const SOCIAL_COLOR = '#FFCE4F';
const SERVICES_COLOR = '#57C3F8';
const DELIVER_COLOR = '#C8AFF9';

const LEGAL = html`Billing rounded up to nearest cent and second.`;

@customElement('pricing-card')
export default class PricingCard extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	data: PricingInfoSection;

	@property({ type: Boolean })
	collapsed: boolean = true;

	@property({ type: Number })
	displayPrice: number = 0;
	@property({ type: Number })
	newDisplayPrice: number = 0;

	timeout: number;

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.calculatePrice(true);
		this.displayPrice = this.newDisplayPrice;
	}

	changeSliderValue(index: number, event: SliderChangeEvent) {
		let slider = this.data.sliders[index];

		if (slider.value != event.value) {
			slider.value = event.value;

			// Do side effects
			if (slider.config.effects) slider.config.effects(slider.value, this.data.sliders);

			this.calculatePrice();

			if (!isNaN(this.displayPrice)) {
				this.animatePrice();
			}
		}
	}

	calculatePrice(noSliders: boolean = false) {
		this.newDisplayPrice = this.data.priceCalculator(
			noSliders ? [] : this.data.sliders.map(a => a.value)
		);
	}

	animatePrice() {
		// Create an animation timeout
		this.timeout = window.setTimeout(this.animatePrice.bind(this), timing.milliseconds(42));

		// Calculate step size
		let step = (this.newDisplayPrice - this.displayPrice) / 4.24;
		let absStep = Math.abs(step);

		// Set lower bound for step size
		if (absStep < 5.34) {
			absStep = 5.34;
			step = 5.34 * Math.sign(step);
		}

		// Set price and clear timeout
		if (
			this.displayPrice == this.newDisplayPrice ||
			Math.abs(this.newDisplayPrice - this.displayPrice) <= absStep
		) {
			this.displayPrice = this.newDisplayPrice;
			window.clearTimeout(this.timeout);
		}
		// Increase base price slowly
		else {
			this.displayPrice += step;
		}
	}

	toggleCollapse() {
		this.collapsed = !this.collapsed;

		// Calculate price
		this.calculatePrice(this.collapsed);

		// Animate price
		this.animatePrice();
	}

	render() {
		let color = getColor(this.data.class);
		let classObj: any = {
			collapsed: this.collapsed,
			[this.data.class]: true
		};

		let classes = classMap(classObj);

		let priceFormatted =
			!this.displayPrice && !this.data.sliders.length
				? 'Free'
				: `${numbro(this.displayPrice).format('$0,0.00')}${this.data.pricePeriod ?? '/mo'}`;

		if (isNaN(this.displayPrice)) priceFormatted = 'NaN';

		return html` <div id="base" class=${classes}>
			<div id="collapse-base">
				<div id="header">
					<e-svg id="icon" preserve non-icon src="/products/${this.data.icon}"></e-svg>
					<div id="wrap-area">
						<h1 id="title">${this.data.title}</h1>
						<div id="breakdown">
							${this.displayPrice || this.data.sliders.length
								? html`<h2 id="label">Starting at</h2>`
								: null}
							<h1 id="price">${this.data.comingSoon ? 'Coming Soon' : priceFormatted}</h1>
						</div>
					</div>
					<div id="expand-tip">Expand for more info</div>
				</div>
				<div id="content">
					<div id="left-side">
						<h2 id="description">${this.data.description}</h2>
						${this.data.features.length
							? html` <div id="features">
									<h2 id="features-title">Features</h2>
									<ul>
										${repeat(
											this.data.features,
											a => a,
											a => html`<li>${a}</li>`
										)}
									</ul>
							  </div>`
							: null}
					</div>
					${this.data.sliders.length
						? html` <div id="calculator">
								<h2 id="calculator-title">Pricing breakdown</h2>
								${repeat(
									this.data.sliders,
									s => s.title,
									(s, i) => html`<div class="slider">
										<div class="slider-header">
											<h1 class="slider-title">${s.title}</h1>
											<h2 class="slider-amount">
												${formatSliderAmount(s.value, s.config.config)}
											</h2>
										</div>
										<range-slider
											class="slider-input"
											.config=${s.config.config}
											.initial=${s.value}
											@change=${this.changeSliderValue.bind(this, i)}
										></range-slider>
									</div>`
								)}
						  </div>`
						: null}
				</div>

				<div id="footer">
					<stylized-button id="learn-more" text="#1d1d1c" color=${color} href="/developer"
						>Learn More</stylized-button
					>
					<p id="legal">${LEGAL}</p>
					<div id="silent-padding"></div>
				</div>
			</div>

			<icon-button
				id="toggle-collapse"
				src=${this.collapsed ? 'regular/chevron-down' : 'regular/chevron-up'}
				color="#ececec"
				large
				.trigger=${this.toggleCollapse.bind(this)}
			></icon-button>
		</div>`;
	}
}

function formatSliderAmount(value: number, config: RangeSliderConfig) {
	let number = config.asFraction
		? findRational(value, 16)
		: config.step && config.step < 1
		? numbro(value).format(`0,0.${'0'.repeat(Math.ceil(Math.log10(1 / config.step)))}`)
		: value > 0 && value < 1
		? numbro(value).format(`0,0.${'0'.repeat(Math.ceil(1 + Math.log10(1 / value)))}`)
		: numbro(value).format('0,0');
	return `${number}${config.unit ? ` ${config.unit}` : ''}`;
}

function getColor(name: string) {
	return name == 'social'
		? SOCIAL_COLOR
		: name == 'services'
		? SERVICES_COLOR
		: name == 'deliver'
		? DELIVER_COLOR
		: 'red';
}

// https://stackoverflow.com/a/23575730
function findRational(value: number, maxdenom: number): string {
	let best = { numerator: 1, denominator: 1, error: Math.abs(value - 1) };

	if (!maxdenom) maxdenom = 10000;

	for (let denominator = 1; best.error > 0 && denominator <= maxdenom; denominator++) {
		let numerator = Math.round(value * denominator);
		let error = Math.abs(value - numerator / denominator);
		if (error >= best.error) continue;

		best.numerator = numerator;
		best.denominator = denominator;
		best.error = error;
	}

	return `${best.numerator}/${best.denominator}`;
}
