/*
 * Copyright 2012-2016 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Scott Andrews
 */

'use strict';

var interceptor, UrlBuilder;

interceptor = require('../interceptor');
UrlBuilder = require('../UrlBuilder');

function startsWith(str, prefix) {
  return str.indexOf(prefix) === 0;
}

function endsWith(str, suffix) {
  return str.lastIndexOf(suffix) + suffix.length === str.length;
}

/**
 * Prefixes the request path with a common value.
 *
 * @param {Client} [client] client to wrap
 * @param {number} [config.prefix] path prefix
 *
 * @returns {Client}
 */
module.exports = interceptor({
  request: function (request, config) {
    var path;

    if (config.prefix && !(new UrlBuilder(request.path).isFullyQualified())) {
      path = config.prefix;
      if (request.path) {
        if (!endsWith(path, '/') && !startsWith(request.path, '/')) {
          // add missing '/' between path sections
          path += '/';
        }
        path += request.path;
      }
      request.path = path;
    }

    return request;
  }
});
