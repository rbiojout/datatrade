import React from 'react';
import ReactDOM from 'react-dom';
import AppReference from './AppReference';

import * as serviceWorker from './serviceWorker';


// Copied from http:jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }

  var urlParams = getUrlVars();

  /*
  switch (urlParams["template"]) {
    case "ok":

      ReactDOM.render(<Framework />, document.getElementById('root'));
      break;

    case undefined:
    default:
      ReactDOM.render(<App />, document.getElementById('root'));
      break;
  }
  */

ReactDOM.render(<AppReference />, document.getElementById('reference'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
