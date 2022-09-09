import { LitElement, html, customElement, property, queryAll } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import { bodyEventGroups } from '../../utils/global-events';
import styles from './pricing-display.scss';
import { RangeSliderConfig } from '../common/range-slider';

export interface PricingInfoSection {
	title: string;
	icon: string;
	class: string;
	description: string;
	// Features list
	features: string[];
	// Calculates single price based on all sliders
	priceCalculator: (sliders: number[]) => number;
	// /mo, /hr, /sec, etc
	pricePeriod?: string;
	// Sets price to "Coming Soon"
	comingSoon?: boolean;
	// Sliders list
	sliders: Slider[];
}

interface SliderConfig {
	initialValue: number;
	// Config for slider display
	config: RangeSliderConfig;
	// Side effects (altering other sliders when changed)
	effects?: (value: number, sliders: Slider[]) => void;
}

class Slider {
	title: string;
	config: SliderConfig;
	value: number;

	constructor(title: string, config: SliderConfig) {
		this.title = title;
		this.config = config;
		this.value = this.config.initialValue;
	}
}

const PRICING_INFO_SECTIONS: PricingInfoSection[] = [
	{
		title: 'Social',
		icon: 'social',
		class: 'social',
		description:
			'Lorem ipsum dolor si t amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.',
		features: ['Feature 1', 'Feature 2'],
		priceCalculator: sliders => 0,
		sliders: []
	},
	{
		title: 'Parties',
		icon: 'parties',
		class: 'social',
		description: 'Parties help place players together in game lobbies.',
		features: [],
		priceCalculator: sliders => 0,
		sliders: []
	},
	{
		title: 'Leaderboards',
		icon: 'leaderboard',
		class: 'social',
		description: 'Incentivize identities with detailed in-game statistics that keep identities engaged.',
		features: [],
		priceCalculator: sliders => 0,
		sliders: []
	},
	{
		title: 'Database',
		icon: 'database',
		class: 'services',
		description:
			'Lorem ipsum dolor si t amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.',
		features: [],
		priceCalculator: sliders => 0,
		comingSoon: true,
		sliders: []
	},
	{
		title: 'Matchmaker',
		icon: 'matchmaker',
		class: 'services',
		description:
			'Efficiently manage servers with lobby customization and identity placement without downtime.',
		features: [],
		priceCalculator: sliders => {
			// Collapsed value
			if (!sliders.length) return 0.01;

			let coreFraction = sliders[1];
			let tierCostPerHour = 0;

			if (coreFraction == 1 / 8) {
				tierCostPerHour = (916_700 * 60 * 60) / 1_000_000_000_000;
			} else if (coreFraction == 1 / 4) {
				tierCostPerHour = (1_805_600 * 60 * 60) / 1_000_000_000_000;
			} else if (coreFraction == 1 / 2) {
				tierCostPerHour = (3_564_800 * 60 * 60) / 1_000_000_000_000;
			} else if (coreFraction == 1 / 1) {
				tierCostPerHour = (6_694_400 * 60 * 60) / 1_000_000_000_000;
			} else if (coreFraction == 2 / 1) {
				tierCostPerHour = (13_388_900 * 60 * 60) / 1_000_000_000_000;
			}

			return ((sliders[0] * 0.35) / 10) * tierCostPerHour;
		},
		pricePeriod: '/lobby/hr',
		sliders: [
			new Slider('Total Lobby Capacity', {
				initialValue: 500,
				config: {
					min: 100,
					max: 50000,
					step: 100,
					curve: {
						equation: x => x ** 2,
						inverse: x => x ** (1 / 2)
					},
					unit: 'Players'
				}
			}),
			new Slider('CPU Fraction', {
				initialValue: 1 / 4,
				config: {
					min: 0,
					max: 2,
					asFraction: true,
					gutter: [
						{
							at: 1 / 16
						},
						{
							at: 1 / 8
						},
						{
							at: 1 / 4
						},
						{
							at: 1 / 2
						},
						{
							at: 1
						}
					]
				},
				effects: (value, sliders) => {
					// Map core count to memory
					if (value == 1 / 8) {
						sliders[2].value = 125;
					} else if (value == 1 / 4) {
						sliders[2].value = 250;
					} else if (value == 1 / 2) {
						sliders[2].value = 458;
					} else if (value == 1 / 1) {
						sliders[2].value = 1000;
					} else if (value == 2 / 1) {
						sliders[2].value = 2000;
					}
				}
			}),
			new Slider('Memory', {
				initialValue: 250,
				config: {
					min: 0,
					max: 2000,
					gutter: [
						{
							at: 125 / 2000
						},
						{
							at: 250 / 2000
						},
						{
							at: 458 / 2000
						},
						{
							at: 1000 / 2000
						},
						{
							at: 2000 / 2000
						}
					],
					unit: 'MB'
				},
				effects: (value, sliders) => {
					// Map memory to core count
					if (value == 125) {
						sliders[1].value = 1 / 8;
					} else if (value == 250) {
						sliders[1].value = 1 / 4;
					} else if (value == 458) {
						sliders[1].value = 1 / 2;
					} else if (value == 1000) {
						sliders[1].value = 1 / 1;
					} else if (value == 2000) {
						sliders[1].value = 2 / 1;
					}
				}
			})
		]
	},
	{
		title: 'CDN',
		icon: 'cdn',
		class: 'deliver',
		description: 'Host static files and content easily. 100% free while in beta.',
		features: [],
		priceCalculator: sliders => 0,
		sliders: []
	},
	{
		title: 'Compute',
		icon: 'compute',
		class: 'deliver',
		description:
			'Run your entire infrastructure and services and integrate with Matchmaker to run your games on our cloud. Compute saves developers money by scaling resources for player fluctuations. Only pay for resources that are used.',
		features: [],
		priceCalculator: sliders => 0,
		sliders: []
	},
	{
		title: 'Deploy',
		icon: 'deploy',
		class: 'deliver',
		description: 'Deploy your games to Rivet and directly control versions, services, and regions.',
		features: [],
		priceCalculator: sliders => 0,
		sliders: []
	}
];

@customElement('pricing-display')
export default class PricingDisplay extends LitElement {
	static styles = cssify(styles);

	render() {
		return html`
			<div id="base">
				<!-- Social entries -->
				<h1 class="pricing-info-header social">Social</h1>
				<div class="pricing-info-scroller">
					${repeat(
						PRICING_INFO_SECTIONS.slice(0, 3),
						s => s.title,
						section => html` <div class="pricing-item">
							<pricing-card .data=${section}></pricing-card>
						</div>`
					)}
				</div>
				<h1 class="pricing-info-header services">Services</h1>
				<div class="pricing-info-scroller">
					${repeat(
						PRICING_INFO_SECTIONS.slice(3, 5),
						s => s.title,
						section => html` <div class="pricing-item">
							<pricing-card .data=${section}></pricing-card>
						</div>`
					)}
				</div>
				<h1 class="pricing-info-header deliver">Deliver</h1>
				<div class="pricing-info-scroller">
					${repeat(
						PRICING_INFO_SECTIONS.slice(5),
						s => s.title,
						section => html` <div class="pricing-item">
							<pricing-card .data=${section}></pricing-card>
						</div>`
					)}
				</div>
			</div>
		`;
	}
}
