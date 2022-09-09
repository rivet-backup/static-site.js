import { LitElement, html, customElement } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './site-footer.scss';
import assets from '../../data/assets';
import config from '../../config';

@customElement('site-footer')
export default class SiteFooter extends LitElement {
	static styles = cssify(styles);

	// === RENDER ===
	render() {
		return html`
			<div id="base">
				<div id="centered">
					<div id="info-side">
						<div id="brand">
							<a id="brand-link" href="/">
								<e-svg src="logo/logo-small" id="logo-icon" preserve></e-svg>
								<h1>Rivet Gaming, LLC</h1>
							</a>
						</div>
						<div id="copyright">Rivet Gaming, LLC © 2022</div>
					</div>

					<div id="footer-columns">
						<div class="footer-column">
							<h1>Product</h1>
							<a href="/arcade">Open Rivet</a>
							<!-- <a href="/">Get on App Store</a> -->
							<!-- <a href="/">Get on Google Play</a> -->
							<a href="/developer/dashboard">Developer Dashboard</a>
						</div>
						<div class="footer-column">
							<h1>Social</h1>
							<!-- <a href="/">Blog</a> -->
							<a target="_blank" href="https://twitter.com/RivetOfficial">Twitter</a>
							<a target="_blank" href=${config.COMMUNITY_URL}>Developer Discord</a>
						</div>
						<div class="footer-column">
							<h1>Resources</h1>
							<a href="/support">Support</a>
							<!-- <a href="/">Media Resources</a> -->
							<a href="/terms">Terms of Service</a>
							<a href="/privacy">Privacy Policy</a>
							<a href="/acceptable-use">Acceptable Use</a>
							<a href="https://rivet-gg.betteruptime.com/" target="_blank">Status Page</a>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}
