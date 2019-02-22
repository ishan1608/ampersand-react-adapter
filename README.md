# ampersand-react-adapter

Higher order component for react classes to easily listen for changes and re-render from ampersand models/collections.


## How it works

This auto-listens to any ampersand model or collection that is passed to it as a `prop`. And re-renders the component on changes. It also unregisters the listener when the component is unmounted.

You can also optionally create a method in your component called: `getObservedItems`.

This will get called to determine which things should be watched.

Or you can explicitly call `watch` on the component and pass an ampersand model, state, or collection object.

If it's a collection, it listens to `'add remove reset sort'` events. If it's a `State` object, it listens to `'change'` events.

## install
[//]: # (TODO ishan 2019-02-23 Update the installation instructions once the package is ready to be published to npm)
```
npm install ampersand-react-adapter
```

## example
```javascript
import React from 'react';
import ampersandReactAdapter from 'ampersand-react-adapter';

class ExampleComponent extends React.Component{
	render() {
		return (
			<div></div>
		);
	}
}

export default ampersandReactAdapter(ExampleComponent);
```

## license

MIT

## NOTE
This is an effort to take the original [ampersand-react-mixin](https://github.com/AmpersandJS/ampersand-react-mixin) library and port it to [React Higher-Order Component](https://reactjs.org/docs/higher-order-components.html)
