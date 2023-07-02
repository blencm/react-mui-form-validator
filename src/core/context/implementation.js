import React, { Component} from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

const MAX_SIGNED_31_BIT_INT = 1073741823;

const commonjsGlobal =
	typeof globalThis !== 'undefined' // 'global proper'
		? globalThis
		: typeof window !== 'undefined'
			? window // Browser
			: typeof global !== 'undefined'
				? global // node.js
				: {}


function getUniqueId() {
	const key = '__global_unique_id__';
	return commonjsGlobal[key] = (commonjsGlobal[key] || 0) + 1;
}



// Inlined Object.is polyfill.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function objectIs(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / (y);
  } else {
    return x !== x && y !== y;
  }
}


function createEventEmitter(value) {
  let handlers = [];
  return {
    on(handler) {
      handlers.push(handler);
    },

    off(handler) {
      handlers = handlers.filter(h => h !== handler);
    },

    get() {
      return value;
    },

    set(newValue, changedBits) {
      value = newValue;
      handlers.forEach(handler => handler(value, changedBits));
    }
  };
}

function onlyChild(children) {
  return Array.isArray(children) ? children[0] : children;
}

function createReactContext(
  defaultValue,
  calculateChangedBits
){
  const contextProp = '__create-react-context-' + getUniqueId() + '__';

  class Provider extends Component {
    emitter = createEventEmitter(this.props.value);

    static childContextTypes = {
      [contextProp]: PropTypes.object.isRequired
    };

    getChildContext() {
      return {
        [contextProp]: this.emitter
      };
    }

    static getDerivedStateFromProps(props, state) {
      if (props.value !== nextProps.value) {
        let oldValue = props.value;
        let newValue = nextProps.value;
        let changedBits;

        if (objectIs(oldValue, newValue)) {
          changedBits = 0; // No change
        } else {
          changedBits =
            typeof calculateChangedBits === 'function'
              ? calculateChangedBits(oldValue, newValue)
              : MAX_SIGNED_31_BIT_INT;
          if (process.env.NODE_ENV !== 'production') {
            warning(
              (changedBits & MAX_SIGNED_31_BIT_INT) === changedBits,
              'calculateChangedBits: Expected the return value to be a ' +
                '31-bit integer. Instead received: %s',
              changedBits
            );
          }

          changedBits |= 0;

          if (changedBits !== 0) {
            this.emitter.set(nextProps.value, changedBits);
          }
        }
      }
  
      // Return null to indicate no change to state.
      return null;
    }

    render() {
      return this.props.children;
    }
  }

  class Consumer extends Component {
    static contextTypes = {
      [contextProp]: PropTypes.object
    };

    observedBits;

    state = {
      value: this.getValue()
    };

    static getDerivedStateFromProps(props, state) {
      let { observedBits } = nextProps;
      this.observedBits =
        observedBits === undefined || observedBits === null
          ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
          : observedBits;
  
      // Return null to indicate no change to state.
      return null;
    }

    componentDidMount() {
      if (this.context[contextProp]) {
        this.context[contextProp].on(this.onUpdate);
      }
      let { observedBits } = this.props;
      this.observedBits =
        observedBits === undefined || observedBits === null
          ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
          : observedBits;
    }

    componentWillUnmount() {
      if (this.context[contextProp]) {
        this.context[contextProp].off(this.onUpdate);
      }
    }

    getValue() {
      if (this.context[contextProp]) {
        return this.context[contextProp].get();
      } else {
        return defaultValue;
      }
    }

    onUpdate = (newValue, changedBits) => {
      const observedBits = this.observedBits | 0;
      if ((observedBits & changedBits) !== 0) {
        this.setState({ value: this.getValue() });
      }
    };

    render() {
      return onlyChild(this.props.children)(this.state.value);
    }
  }

  return {
    Provider,
    Consumer
  };
}

export default createReactContext;