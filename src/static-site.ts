import './elements/common/stylized-button';
import './elements/common/lazy-image'; // TODO: Use raw img in static pages
import './elements/common/embedded-svg';
import './elements/common/loading-placeholder';
import './elements/common/icon-button';
import './elements/common/range-slider';

import './elements/static-site/parallax-element';
import './elements/static-site/site-footer';
import './elements/static-site/site-header';
import './elements/static-site/stack-display';
import './elements/static-site/stack-display-stat';
import './elements/static-site/pricing-display';
import './elements/static-site/pricing-card';
import './elements/static-site/developer-summary';
import './elements/static-site/splash-display';

window.addEventListener('load', () => {
	document.body.classList.add('loaded');
});
