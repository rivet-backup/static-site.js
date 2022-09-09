import { LitElement, html, customElement, property, PropertyValues, query } from 'lit-element';
import { cssify } from '../../utils/css';
import { styleMap } from 'lit-html/directives/style-map';
import timing from '../../utils/timing';
import styles from './parallax-element.scss';
import { bodyEventGroups, windowEventGroups } from '../../utils/global-events';

const PARALLAX_INTENSITY = 100;
const BASE_PARALLAX = 50;

@customElement('parallax-element')
export default class ParallaxElement extends LitElement {
	static styles = cssify(styles);

	@property({ type: Number })
	depth: number = 0;

	cacheWidth: number = 0;
	@property({ type: Number })
	cacheHeight: number = 0;

	@property({ type: Number })
	offsetPos: number = 0;

	@property({ type: Boolean })
	clamp: boolean = false;

	@query('#base')
	baseElement: HTMLElement;

	init: boolean = false;

	// === EVENT HANDLERS ===
	handleResize: () => void;
	handleScroll: () => void;

	constructor() {
		super();

		// Cache window size
		this.cacheWidth = window.innerWidth;
		this.cacheHeight = window.innerHeight;
	}

	updated(p: PropertyValues) {
		super.updated(p);

		// Initiate the element to the right position (before any scrolling or resizing)
		if (!this.init && this.baseElement && this.cacheHeight) {
			setTimeout(() => {
				this.onScroll();
			}, 100);

			this.init = true;
		}
	}

	connectedCallback() {
		super.connectedCallback();

		this.handleResize = this.windowResize.bind(this);
		windowEventGroups.add('resize', this.handleResize, timing.milliseconds(100));

		this.handleScroll = this.onScroll.bind(this);
		bodyEventGroups.add('scroll', this.handleScroll);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Remove event handlers
		windowEventGroups.remove('resize', this.handleResize, timing.milliseconds(100));
		bodyEventGroups.remove('scroll', this.handleScroll);
	}

	render() {
		let style = styleMap({
			transform: `translateY(${this.offsetPos}px)`,
			transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
		});

		return html`<div id="base">
			<div id="parallax" style=${style}><slot></slot></div>
		</div>`;
	}

	onScroll() {
		if (!this.baseElement) return;
		let bounds = this.baseElement.getBoundingClientRect();

		let og = document.body.scrollTop + bounds.top + bounds.height / 2;

		this.offsetPos = (bounds.top + bounds.height / 2 - this.cacheHeight / 2) / this.cacheHeight;
		if (this.clamp) this.offsetPos = Math.min(0, this.offsetPos);
		this.offsetPos *= (BASE_PARALLAX * PARALLAX_INTENSITY) / (this.depth + PARALLAX_INTENSITY);
	}

	windowResize() {
		this.cacheWidth = window.innerWidth;
		this.cacheHeight = window.innerHeight;

		this.onScroll();
	}
}
