import { LitElement, html, customElement, property } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './developer-summary.scss';
import assets from '../../data/assets';

@customElement('developer-summary')
export default class DeveloperSummary extends LitElement {
	static styles = cssify(styles);

	render() {
		return html`
			<div id="base">
				<h1>For Developers</h1>
				<div id="info-sections">
					<div class="info-section">
						<lazy-img src=${assets.asset('/graphics/drop.png')} bg-size="contain"></lazy-img>
						<h3>Drop your database</h3>
						<p>Social features are provided for you with access to a KV store</p>
					</div>
					<div class="info-section">
						<lazy-img src=${assets.asset('/graphics/reboot.png')} bg-size="contain"></lazy-img>
						<h3>Reboot your servers</h3>
						<p>Managed autoscaling game hosting for any language in X lines of code</p>
					</div>
					<div class="info-section">
						<lazy-img src=${assets.asset('/graphics/serve.png')} bg-size="contain"></lazy-img>
						<h3>Serve your assets</h3>
						<p>Host your website and game assets for cheaper</p>
					</div>
				</div>
				<div id="platforms">
					<div class="platforms-list">
						<h2>Supports</h2>
						<div class="items">
							<e-svg id="rust" src="brands/rust-lang" title="Rust"></e-svg>
							<e-svg id="ts" src="brands/typescript-lang" title="TypeScript"></e-svg>
							<e-svg id="js" src="brands/javascript-lang" title="JavaScript"></e-svg>
						</div>
					</div>
					<div class="platforms-list">
						<h2>Coming soon</h2>
						<div class="items">
							<e-svg id="csharp" src="brands/csharp-lang" title="C#"></e-svg>
							<e-svg id="cpp" src="brands/cplusplus-lang" title="C++"></e-svg>
							<e-svg id="java" src="brands/java-lang" title="Java"></e-svg>
							<e-svg id="lua" src="brands/lua-lang" title="Lua"></e-svg>
							<e-svg id="go" src="brands/go-lang" title="Go"></e-svg>
							<e-svg id="kotlin" src="brands/kotlin-lang" title="Kotlin"></e-svg>
						</div>
					</div>
				</div>
				<div id="actions">
					<stylized-button href="/developer">Learn More</stylized-button>
					<stylized-button id="dashboard-button" href="/developer/dashboard" color="white">
						Go to Dashboard
						<e-svg src="solid/arrow-right"></e-svg>
					</stylized-button>
				</div>
			</div>
		`;
	}
}
