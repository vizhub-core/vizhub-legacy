(function (React, ReactDOM) {
	'use strict';

	var App = function () { return React.createElement( 'div', null, "Hello React JSX" ); };

	ReactDOM.render(React.createElement( App, null ), document.getElementById('root'));

}(React, ReactDOM));
