/*
 * nnviz
 * https://github.com/eric/nnviz
 *
 * Copyright (c) 2014 Eric Mittelhammer
 * Licensed under the MIT license.
 */

 /*jslint node: true */
 /*jslint browser: true */


  var React = require('react');

  var Components = require('./components.js');

  exports.init = function(elementId, network) {
    var container = document.getElementById(elementId);
    console.log(Components.Network);
    React.renderComponent(Components.Network({}), container);
  };
  