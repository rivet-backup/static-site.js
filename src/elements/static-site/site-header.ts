import { LitElement, html, customElement, property } from 'lit-element';
import { cssify } from '../../utils/css';
import { classMap } from 'lit-html/directives/class-map';
import styles from './site-header.scss';
import assets from '../../data/assets';
import { windowEventGroups } from '../../utils/global-events';
import timing from '../../utils/timing';

const MOBILE_WIDTH_THRESHOLD_MEDIUM = 945;

@customElement('site-header')
export default class SiteHeader extends LitElement {
	static styles = cssify(styles);
	@property({ type: Boolean })
	navOpen: boolean = false;

	@property({ type: Boolean })
	isMobile: boolean = false;

	// === EVENT HANDLERS ===
	handleResize: () => void;

	connectedCallback() {
		super.connectedCallback();

		// Handle mobile change
		this.handleResize = this.onResize.bind(this);
		this.onResize();
		windowEventGroups.add('resize', this.onResize.bind(this), timing.milliseconds(100));
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Remove event handler
		windowEventGroups.remove('resize', this.handleResize, timing.milliseconds(100));
	}

	// Update on mobile change
	onResize() {
		let newValue = window.innerWidth <= MOBILE_WIDTH_THRESHOLD_MEDIUM;

		if (this.isMobile != newValue) this.isMobile = newValue;
	}

	onClick() {
		this.navOpen = !this.navOpen;
	}

	// === RENDER ===
	render() {
		let navClasses = classMap({
			opened: this.navOpen
		});

		return html`
			<div id="base" class=${navClasses}>
				<div id="container">
					<div id="intro">
						<!-- Logo -->
						<a id="main-logo" href="/">
							<e-svg src="logo/logo-small" id="logo-icon" preserve></e-svg>
						</a>
						<h1 id="main-header">
							<slot name="icon"></slot>
							<slot name="title"></slot>
						</h1>
					</div>
					${this.isMobile
						? html`<icon-button
								id="open-nav"
								src=${this.navOpen ? 'regular/circle-xmark' : 'regular/ellipsis-vertical'}
								large
								color="#cecece"
								@click=${this.onClick.bind(this)}
						  >
						  </icon-button>`
						: null}
					<div id="navigation">
						<a class="nav-link" href="/developer">Developers</a>
						<a class="nav-link" href="/support">Support</a>
						<div id="buttons">
							<!-- <stylized-button href="/developer/dashboard">Dashboard</stylized-button> -->
							<stylized-button href="/arcade">Open Rivet</stylized-button>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}
