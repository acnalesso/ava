import jsdom from 'jsdom';
const React = require("../../app/vendor/react-with-addons");

global.TestUtils = React.addons.TestUtils;

const shallowRenderer = global.TestUtils.createRenderer();

global.React = React;
global.before = (callback) => {
  callback();
};

global.mount = () => {
  return shallowRenderer;
};

global.getMountedInstance = () => {
  return shallowRenderer._instance._instance;
};

global.setState = (options) => {
  return global.getMountedInstance().setState(...options);
};

global.renderedComponent = () => {
  return shallowRenderer.getRenderOutput();
};

global.getMountedInstance = () => {
  return shallowRenderer.getMountedInstance();
};

global.renderIntoShallowDOM = (component) => {
  shallowRenderer.render(component);
  shallowRenderer.getMountedInstance().componentDidMount();
  return shallowRenderer.getRenderOutput();
};

global.findElementWithTag = (component, tag, index = 0) => {
  if (component.type === tag) {
    return component;
  }

  if (component[index] && component[index].type && component[index].type === tag) {
    return component[index];
  } else {
    index++;
  }

  if (Object.prototype.toString.call(component) === '[object Array]') {
    return global.findElementWithTag(component, tag, index++);
  } else {
    return global.findElementWithTag(component.props.children, tag, 0);
  }
};

global.getText = (component, index = 0) => {
  if (component.props && typeof(component.props.children) === "string") {
    return component.props.children;
  }

  if (component && component[index] && typeof(component[index]) === "string") {
    return component.join("");
  } else {
    index++;
  }

  if (Object.prototype.toString.call(component) === '[object Array]') {
    return global.getText(component, index++);
  } else {
    return global.getText(component.props.children, 0);
  }
};

global.getTextOfTag = (component, tag) => {
  return global.getText(global.findElementWithTag(component, tag));
};
