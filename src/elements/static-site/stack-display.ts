import { LitElement, html, customElement, property, queryAll, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import { bodyEventGroups, windowEventGroups } from '../../utils/global-events';
import styles from './stack-display.scss';
import assets from '../../data/assets';
import config from '../../config';
import timing from '../../utils/timing';
import routes from '../../routes';

const PADDING_TOP = 300; // How far the start of the stack is from the top of the page

interface StackInfoTutorial {
	title: string;
	description: string;
	duration: number;
	url: string;
}

interface StackInfoSection {
	apiService?: string;
	title: string;
	icon: string;
	class: string;
	description: string;
	tutorials: StackInfoTutorial[];
}

// TODO: Communicate versioning, namespaces, rivet.game, SSL
const STACK_INFO_SECTIONS: StackInfoSection[] = [
	{
		title: 'Elastic Lobbies',
		icon: 'compute',
		class: 'deliver',
		description: 'Serverless game hosting platform for any game and engine',
		tutorials: [
			{
				title: 'Introduction to serverless game hosting',
				description: '',
				duration: 20,
				url: '/'
			},
			{
				title: 'Elastic Lobbies in 5 lines: NodeJS',
				description: '',
				duration: 30,
				url: '/'
			},
			// {
			// 	title: 'Elastic Lobbies in 8 lines: C#',
			// 	description: '',
			// 	duration: 40,
			// 	url: '/'
			// },
			{
				title: 'Elastic Lobbies in 8 lines: Java',
				description: '',
				duration: 40,
				url: '/'
			},
			{
				title: 'Elastic Lobbies: BYO Docker image & language',
				description: '',
				duration: 40,
				url: '/'
			},
			// {
			// 	title: 'How does autoscaling work?',
			// 	description: '',
			// 	duration: 10,
			// 	url: '/'
			// },
			{
				title: 'How do instant rolling deploys work?',
				description: '',
				duration: 10,
				url: '/'
			},
			// {
			// 	title: 'Game namespace & version management overview',
			// 	description: '',
			// 	duration: 10,
			// 	url: '/'
			// },
			{
				title: 'Logs & monitoring with Elastic Lobbies',
				description: '',
				duration: 20,
				url: '/'
			},
			{
				title: 'Managed SSL, DDoS protection, captchas, & more',
				description: '',
				duration: 15,
				url: '/'
			},
			{
				title: 'Namespacing & versioning for large groups',
				description: '',
				duration: 20,
				url: '/'
			}
		]
	},
	{
		title: 'CDN',
		icon: 'cdn',
		class: 'deliver',
		description:
			'Versioned content delivery network lets you host assets and webpages with a provided or custom domain',
		tutorials: [
			{
				title: 'Hosting a static website with Rivet CDN',
				description: '',
				duration: 10,
				url: '/'
			},
			{
				title: 'Your very own rivet.game subdomain',
				description: '',
				duration: 5,
				url: '/'
			},
			{
				title: 'Bring your own domain to Rivet CDN',
				description: '',
				duration: 10,
				url: '/'
			},
			{
				title: 'Securing a staging CDN namespace',
				description: '',
				duration: 5,
				url: '/'
			},
			// {
			// 	title: 'Game namespace & version management',
			// 	description: '',
			// 	duration: 10,
			// 	url: '/'
			// },
			{
				title: 'Namespacing & versioning for large groups',
				description: '',
				duration: 20,
				url: '/'
			}
		]
	},
	{
		apiService: 'api-matchmaker',
		title: 'Matchmaker',
		icon: 'matchmaker',
		class: 'services',
		description:
			'Flexible matchmaker for placing players in lobbies with no wait times, suitable for games of all types',
		tutorials: [
			{
				title: 'Configuring game modes',
				description: '',
				duration: 25,
				url: '/'
			},
			{
				title: 'Implementing custom games',
				description: '',
				duration: 20,
				url: '/'
			},
			{
				title: 'Intelligent matchmaking for low CCU',
				description: '',
				duration: 15,
				url: '/'
			},
			{
				title: 'Prevent botting with matchmaker captchas',
				description: '',
				duration: 30,
				url: '/'
			}
			// {
			// 	title: 'Player cap vs max direct players vs max party players',
			// 	description: '',
			// 	duration: 5,
			// 	url: '/'
			// },
			// {
			// 	title: 'Domain-based matchmaking authentication vs private matchmaking tokens',
			// 	description: '',
			// 	duration: 15,
			// 	url: '/'
			// },
		]
	},
	{
		apiService: 'api-kv',
		title: 'Database',
		icon: 'database',
		class: 'services',
		description: 'Easy to use key-value store for long term persistence',
		tutorials: [
			{
				title: 'Implementing inventory & trading',
				description: '',
				duration: 30,
				url: '/'
			},
			{
				title: 'Implementing persistent identity sandbox worlds',
				description: '',
				duration: 30,
				url: '/'
			},
			{
				title: 'Global, identity, and identity group KV stores',
				description: '',
				duration: 15,
				url: '/'
			},
			{
				title: 'How Rivet Database integrates with leaderboards',
				description: '',
				duration: 10,
				url: '/'
			}
		]
	},
	{
		apiService: 'api-identity',
		title: 'Identity',
		icon: 'social',
		class: 'social',
		description: 'Allow identities to authenticate and play with friends across multiple games',
		tutorials: [
			{
				title: 'Authenticating identities & managing anonymous accounts',
				description: '',
				duration: 15,
				url: '/'
			},
			{
				title: 'Integrating chat & notifications',
				description: '',
				duration: 25,
				url: '/'
			},
			{
				title: 'Integrating friends',
				description: '',
				duration: 10,
				url: '/'
			},
			{
				title: 'Managing identity presence & friends online',
				description: '',
				duration: 15,
				url: '/'
			},
			{
				title: 'Integrating identity groups',
				description: '',
				duration: 5,
				url: '/'
			}
		]
	},
	{
		apiService: 'api-party',
		title: 'Parties',
		icon: 'parties',
		class: 'social',
		description: 'Encourage players to invite their friends to play across multiple lobbies & platforms',
		tutorials: [
			{
				title: 'Creating and receiving party invites',
				description: '',
				duration: 5,
				url: '/'
			},
			{
				title: 'Displaying and updating party state',
				description: '',
				duration: 30,
				url: '/'
			},
			{
				title: 'Integrating parties with matchmaking',
				description: '',
				duration: 10,
				url: '/'
			}
		]
	},
	{
		title: 'Leaderboards',
		icon: 'leaderboard',
		class: 'social',
		description:
			'Pit your most dedicated players against each other with flexible, integrated leaderboards',
		tutorials: [
			{
				title: 'Configuring and branding leaderboards',
				description: '',
				duration: 15,
				url: '/'
			},
			{
				title: 'Publishing new player scores',
				description: '',
				duration: 10,
				url: '/'
			},
			{
				title: 'Displaying your own leaderboards in-game',
				description: '',
				duration: 10,
				url: '/'
			}
		]
	},
];

@customElement('stack-display')
export default class StackDisplay extends LitElement {
	static styles = cssify(styles);

	cacheWidth: number = 0;
	cacheHeight: number = 0;

	@property({ type: Number })
	activeSection: number = -1;

	@query('#cover-area')
	banner: HTMLElement;

	@queryAll('.stack-item')
	stackItems: HTMLElement[];

	// === EVENT HANDLERS ===
	handleScroll: () => void;
	handleResize: () => void;

	connectedCallback() {
		super.connectedCallback();

		this.handleScroll = this.onScroll.bind(this);
		bodyEventGroups.add('scroll', this.handleScroll);
		this.handleResize = this.onResize.bind(this);
		windowEventGroups.add('resize', this.handleResize, timing.milliseconds(500));
		this.onResize();
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		bodyEventGroups.remove('scroll', this.handleScroll);
		windowEventGroups.remove('resize', this.handleResize, timing.milliseconds(500));
	}

	onScroll() {
		let scrollPos = document.body.scrollTop - PADDING_TOP - this.cacheHeight * 0.75;

		if (scrollPos < -50 - this.cacheHeight * 0.375) {
			this.activeSection = -1;
			return;
		}

		for (let i = 0; i < this.stackItems.length; i++) {
			let item = this.stackItems[i];
			if (scrollPos < item.offsetTop + item.clientHeight / 2) {
				this.activeSection = i;
				break;
			}
		}
	}

	onResize() {
		this.cacheWidth = window.innerWidth;
		this.cacheHeight = window.innerHeight;
	}

	scrollToHeader() {
		this.banner.scrollIntoView({
			block: 'start',
			behavior: 'smooth'
		});
	}

	scrollToSection(index: number) {
		this.stackItems[index].scrollIntoView({
			block: 'center',
			behavior: 'smooth'
		});
	}

	render() {
		let activeCategory =
			this.activeSection < 2 ? 'deliver' : this.activeSection < 4 ? 'services' : 'social';

		let classes = classMap({
			social: activeCategory == 'social',
			services: activeCategory == 'services',
			deliver: activeCategory == 'deliver'
		});

		return html`
			<div id="base">
				<div id="sidebar-scroller">
					<div id="sidebar">${this.renderSidebar()}</div>
				</div>
				<div id='banner-list'>
					<div id='centered-cover'>
						<div id='cover-area'>
							<div id='cover-info'>
								<div id='main-stack-logo'>
									<parallax-element id='thumbnail-shapes' depth=-50>
										<lazy-img class='img' src=${assets.asset('/stack/rivet-stack-shapes.png')}></lazy-img>
									</parallax-element>
									<parallax-element id='thumbnail' depth=50>
										<lazy-img class='img' src=${assets.asset('/stack/rivet-stack.png')}></lazy-img>
									</parallax-element>
								</div>

								<div id='tagged-text'>
									<h1>Rivet Developer Stack</h2>
									<div id='tag'>PRIVATE BETA</div>
								</div>
								<h2>A complete solution for building and scaling social games with any engine</h2>

								<stack-display-stat></stack-display-stat>

								<div id='cover-actions'>
									<stylized-button href=${routes.devDashboard.build(
										{}
									)} color='white' splashy icon='solid/door-open' right-icon='solid/arrow-right'>
										Join Private Beta
									</stylized-button>
									<stylized-button href=${
										config.COMMUNITY_URL
									} target='_blank' color='#404040' right-icon='solid/arrow-right' splashy icon='solid/users'>
										Developer Community
									</stylized-button>
									<stylized-button href=${
										config.DOCUMENTATION_URL
									} target='_blank' color='#404040' right-icon='solid/arrow-right' splashy icon='solid/books'>
										Documentation
									</stylized-button>
								</div>
							</div>
						</div>

						<div id='see-more'>
							<span>Scroll for details</span>
							<e-svg src='solid/arrow-down'></e-svg>
						</div>
					</div>
					<div id='scroller-area'>
						<div id="stack-info-scroller">
						${repeat(
							STACK_INFO_SECTIONS,
							s => s.title,
							section =>
								html` <div class="stack-item">
									<div class="stack-info ${section.class}">
										<div class="stack-details">
											<div class="stack-header">
												<e-svg
													non-icon
													preserve
													src="products/${section.icon}"
												></e-svg>
												<h1 class="stack-title">${section.title}</h1>
											</div>
											<p class="stack-description">${section.description}</p>
										</div>
										<div class="stack-actions">
											<stylized-button
												color="#FFFFFF0C"
												href=${routes.devDashboard.build({})}
												icon="solid/door-open"
												>Join Private Beta</stylized-button
											>
											${section.apiService ? html`<stylized-button
												color="#FFFFFF0C"
												href=${`${config.DOCUMENTATION_URL}/docs/category/${section.apiService}`}
												target="_blank"
												icon="solid/books"
												>Documentation</stylized-button
											>` : null}
										</div>
										<div class="stack-tutorials">
											${section.tutorials.length
												? html`<h1 class="tutorial-header">Tutorials</h1>`
												: null}
											${repeat(
												section.tutorials,
												t => t.title,
												t => html` <a class="stack-tutorial">
													<div class="tutorial-info">
														<h1 class="tutorial-title">${t.title}</h1>
														<h2 class="tutorial-duration">
															${t.duration}
															minute${t.duration == 1 ? null : 's'}
														</h2>
														<!-- <p class="tutorial-description">${t.description}</p> -->
													</div>
													<div class="tutorial-coming-soon">COMING SOON</div>
													<!-- <e-svg
													class="tutorial-chevron"
													src="regular/chevron-right"
												></e-svg>-->
												</a>`
											)}
										</div>
									</div>
								</div>`
						)}
					</div>
					<div id="stack-scroller" class=${classes}>
						<div id="stack-thumbnail">
							<lazy-img
								class="ellipse-glow deliver"
								src=${assets.stackImageUrl('glow-ellipse-deliver')}
							></lazy-img>
							<lazy-img
								class="circle-glow deliver"
								src=${assets.stackImageUrl('glow-circle-deliver')}
							></lazy-img>
							<lazy-img
								class="ellipse-glow services"
								src=${assets.stackImageUrl('glow-ellipse-services')}
							></lazy-img>
							<lazy-img
								class="circle-glow services"
								src=${assets.stackImageUrl('glow-circle-services')}
							></lazy-img>
							<lazy-img
								class="ellipse-glow social"
								src=${assets.stackImageUrl('glow-ellipse-social')}
							></lazy-img>
							<lazy-img
								class="circle-glow social"
								src=${assets.stackImageUrl('glow-circle-social')}
							></lazy-img>
							<lazy-img
								class="stack-image deliver"
								src=${assets.stackImageUrl('stack-bottom')}
							></lazy-img>
							<lazy-img
								class="stack-image services"
								src=${assets.stackImageUrl('stack-middle')}
							></lazy-img>
							<lazy-img
								class="stack-image social"
								src=${assets.stackImageUrl('stack-top')}
							></lazy-img>
						</div>
					</div>
					</div>
				</div>
			</div>
		`;
	}

	renderSidebar() {
		return html`
			<stylized-button
				class="overview"
				color="#FFFFFF0C"
				text="#ffffff80"
				?force=${this.activeSection == -1}
				.trigger=${this.scrollToHeader.bind(this)}
				icon='solid/layer-group'
				>Overview</stylized-button
			>
			<h1 class="sidebar-header">Host</h1>
			${repeat(
				STACK_INFO_SECTIONS.slice(0, 2),
				s => s.title,
				section => {
					let index = STACK_INFO_SECTIONS.indexOf(section);
					return html`<stylized-button
						class="deliver"
						color="#FFFFFF0C"
						non-icon
						icon="product-negative-space/${section.icon}"
						?force=${this.activeSection == index}
						.trigger=${this.scrollToSection.bind(this, index)}
						>${section.title}</stylized-button
					>`;
				}
			)}
			<h1 class="sidebar-header">Service</h1>
			${repeat(
				STACK_INFO_SECTIONS.slice(2, 4),
				s => s.title,
				section => {
					let index = STACK_INFO_SECTIONS.indexOf(section);
					return html`<stylized-button
						class="services"
						color="#FFFFFF0C"
						non-icon
						icon="product-negative-space/${section.icon}"
						?force=${this.activeSection == index}
						.trigger=${this.scrollToSection.bind(this, index)}
						>${section.title}</stylized-button
					>`;
				}
			)}
			<h1 class="sidebar-header">Social</h1>
			${repeat(
				STACK_INFO_SECTIONS.slice(4),
				s => s.title,
				section => {
					let index = STACK_INFO_SECTIONS.indexOf(section);
					return html`<stylized-button
						class="social"
						color="#FFFFFF0C"
						non-icon
						icon="product-negative-space/${section.icon}"
						?force=${this.activeSection == index}
						.trigger=${this.scrollToSection.bind(this, index)}
						>${section.title}</stylized-button
					>`;
				}
			)}
		`;
	}
}
