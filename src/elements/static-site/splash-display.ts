import { LitElement, html, customElement, property, query, PropertyValues } from 'lit-element';
import { cssify } from '../../utils/css';
import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';
import styles from './splash-display.scss';
import { windowEventGroups } from '../../utils/global-events';
import timing from '../../utils/timing';

const FRAME_WIDTH = 1280;
const FRAME_HEIGHT = 630;

@customElement('splash-display')
export default class SplashDisplay extends LitElement {
	static styles = cssify(styles);

	@query('#base')
	baseElement: HTMLElement;

	@query('#graphic')
	graphicElement: HTMLElement;

	@property({ type: Number })
	scale: number = 1;

	@property({ type: Boolean })
	hasLoaded: boolean = document.readyState == 'complete';

	@property({ type: Boolean })
	hasFrameLoaded: boolean = false;

	// === EVENT HANDLERS ===
	handleLoad: () => void;
	handleResize: () => void;

	connectedCallback() {
		super.connectedCallback();

		this.handleLoad = () => (this.hasLoaded = true);
		windowEventGroups.add('load', this.handleLoad, timing.milliseconds(100));
		this.handleResize = this.onResize.bind(this);
		windowEventGroups.add('resize', this.handleResize, timing.milliseconds(100));
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		windowEventGroups.remove('load', this.handleLoad, timing.milliseconds(100));
		windowEventGroups.remove('resize', this.handleResize, timing.milliseconds(100));
	}

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		// Wait for first update to complete
		this.updateComplete.then(async () => {
			await this.getUpdateComplete();

			// Wait until the element becomes visible
			let observer = new IntersectionObserver(
				entries => {
					entries.forEach(entry => {
						if (entry.intersectionRatio > 0) this.onResize();
					});
				},
				{ rootMargin: '0px', threshold: 1.0 }
			);

			observer.observe(this.baseElement);
		});
	}

	onResize() {
		if (!this.baseElement) return;

		let scale = this.graphicElement.clientHeight / FRAME_HEIGHT; // Scale height to contain height
		scale = Math.min(scale, this.baseElement.clientWidth / FRAME_WIDTH); // Scale to contain width
		scale = Math.min(scale, 1); // Set max width to page width & don't overscale

		this.scale = scale;
	}

	render() {
		let style = styleMap({
			transform: `scale(${this.scale.toFixed(3)})`,
			opacity: `${this.scale > 0.1 ? 1 : 0}`
		});

		return html`
			<div id="base">
				<div id="graphic" style=${style}>
					${this.hasLoaded
						? html`<iframe
								class=${classMap({ loaded: this.hasFrameLoaded })}
								id="graphic-frame"
								src="https://assets.rivet.gg/animations/home/animation.html"
								frameborder="0"
								scrolling="no"
								@load=${() => (this.hasFrameLoaded = true)}
						  ></iframe>`
						: null}
				</div>
				<div id="header">
					<h1>Multiplayer Gaming for <span class="rainbow">Everyone</span></h1>
					<h2>A complete suite for building, scaling, and connecting multiplayer games</h2>
					<div id="buttons">
						<stylized-button href="/arcade" color="white" right-icon="solid/arrow-right" splashy>
							Go to Social
						</stylized-button>
						<stylized-button
							href="/developer"
							color="#404040"
							right-icon="solid/arrow-right"
							splashy
						>
							Start Developing
						</stylized-button>
					</div>
				</div>
				<!-- <div id='graphic' style='background-image: url({{ env.ASSETS_URL }}/graphics/landing.png)'></div> -->
			</div>
		`;
	}
}
