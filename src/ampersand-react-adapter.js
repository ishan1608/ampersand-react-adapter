import Events from 'ampersand-events';
import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const deferBounce = function(fn) {
	let triggered = false;
	return function () {
		let self = this;
		if (!triggered) {
			triggered = true;
			setTimeout(function () {
				fn.call(self);
				triggered = false;
			}, 0)
		}
	}
};

const safeForceUpdate = function() {
	if (this._isMounted) {
		this.forceUpdate();
	}
};

const getDisplayName = (WrappedComponent) => {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

let ampersandReactAdapter = (WrappedComponent) => {
	class AmpersandReactAdapter extends React.Component {

		constructor(props) {
			super(props);
			this._isMounted = false;
			Events.createEmitter(this);
		}

		watch(modelOrCollection, opts) {
			let events;

			if (modelOrCollection !== null && typeof modelOrCollection === 'object') {
				if (modelOrCollection.isCollection) {
					events = 'add remove reset sort';
				} else if (modelOrCollection.isState) {
					events = 'change';
				}
			}

			if (!events) {
				return;
			}

			this.listenTo(modelOrCollection, events, deferBounce(safeForceUpdate.bind(this)));

			if (opts.reRender) safeForceUpdate.call(this);
		}

		// noinspection JSUnusedGlobalSymbols
		componentDidMount() {
			this._isMounted = true;
			const watched = this.getObservedItems && this.getObservedItems();
			if (watched) {
				for (let watchedObject of watched) {
					this.watch(watchedObject, this);
				}
			}
			if (this.autoWatch !== false) {
				for (let propKey of Object.keys(this.props)) {
					this.watch(this.props[propKey], this);
				}
			}
		}

		// noinspection JSUnusedGlobalSymbols
		componentWillUnmount() {
			this.stopListening();
			this._isMounted = false;
		}

		// noinspection JSUnusedGlobalSymbols
		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	AmpersandReactAdapter.displayName = `AmpersandReactAdapter(${getDisplayName(WrappedComponent)})`;
	hoistNonReactStatic(AmpersandReactAdapter, WrappedComponent);
	return AmpersandReactAdapter;
};
// noinspection JSUnusedGlobalSymbols
export default ampersandReactAdapter;
