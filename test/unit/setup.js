import jsdom from 'jsdom';
import React from "react";
import TestUtils from "react-addons-test-utils";

const shallowRenderer = TestUtils.createRenderer();

global.React = React;
global.TestUtils = TestUtils;
global.renderIntoShallowDOM = (component) => {
  shallowRenderer.render(component);
  return shallowRenderer.getRenderOutput();
};
global.before = (callback) => {
  callback();
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
