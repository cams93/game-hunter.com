'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'gamehunter-secret',

  FACEBOOK_ID:      '918288498288782',
  FACEBOOK_SECRET:  'bb0a508ee691a546f2d16e8fca572201',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
