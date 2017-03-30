// import fetch from 'fetch-everywhere';
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _lodashIsplainobject = require('lodash.isplainobject');

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

var _CALL_API = require('./CALL_API');

var _CALL_API2 = _interopRequireDefault(_CALL_API);

var _validation = require('./validation');

var _errors = require('./errors');

var _util = require('./util');

/**
 * A Redux middleware that processes RSAA actions.
 *
 * @type {ReduxMiddleware}
 * @access public
 */
function apiMiddleware(_ref) {
  var _this = this;

  var getState = _ref.getState;

  return function (next) {
    return function callee$2$0(action) {
      var validationErrors, _callAPI, _requestType, callAPI, endpoint, headers, method, body, credentials, bailout, types, _normalizeTypeDescriptors, requestType, successType, failureType, res;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            if (_validation.isRSAA(action)) {
              context$3$0.next = 2;
              break;
            }

            return context$3$0.abrupt('return', next(action));

          case 2:
            console.log(action);
            // Try to dispatch an error request FSA for invalid RSAAs
            validationErrors = _validation.validateRSAA(action);

            if (!validationErrors.length) {
              context$3$0.next = 8;
              break;
            }

            _callAPI = action[_CALL_API2['default']];

            if (_callAPI.types && Array.isArray(_callAPI.types)) {
              _requestType = _callAPI.types[0];

              if (_requestType && _requestType.type) {
                _requestType = _requestType.type;
              }
              next({
                type: _requestType,
                payload: new _errors.InvalidRSAA(validationErrors),
                error: true
              });
            }
            return context$3$0.abrupt('return');

          case 8:
            callAPI = action[_CALL_API2['default']];
            endpoint = callAPI.endpoint;
            headers = callAPI.headers;
            method = callAPI.method;
            body = callAPI.body;
            credentials = callAPI.credentials;
            bailout = callAPI.bailout;
            types = callAPI.types;
            _normalizeTypeDescriptors = _util.normalizeTypeDescriptors(types);
            requestType = _normalizeTypeDescriptors[0];
            successType = _normalizeTypeDescriptors[1];
            failureType = _normalizeTypeDescriptors[2];
            context$3$0.prev = 20;

            if (!(typeof bailout === 'boolean' && bailout || typeof bailout === 'function' && bailout(getState()))) {
              context$3$0.next = 23;
              break;
            }

            return context$3$0.abrupt('return');

          case 23:
            context$3$0.next = 31;
            break;

          case 25:
            context$3$0.prev = 25;
            context$3$0.t0 = context$3$0['catch'](20);
            context$3$0.next = 29;
            return _regeneratorRuntime.awrap(_util.actionWith(_extends({}, requestType, {
              payload: new _errors.RequestError('[CALL_API].bailout function failed'),
              error: true
            }), [action, getState()]));

          case 29:
            context$3$0.t1 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t1));

          case 31:
            if (!(typeof endpoint === 'function')) {
              context$3$0.next = 42;
              break;
            }

            context$3$0.prev = 32;

            endpoint = endpoint(getState());
            context$3$0.next = 42;
            break;

          case 36:
            context$3$0.prev = 36;
            context$3$0.t2 = context$3$0['catch'](32);
            context$3$0.next = 40;
            return _regeneratorRuntime.awrap(_util.actionWith(_extends({}, requestType, {
              payload: new _errors.RequestError('[CALL_API].endpoint function failed'),
              error: true
            }), [action, getState()]));

          case 40:
            context$3$0.t3 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t3));

          case 42:
            if (!(typeof headers === 'function')) {
              context$3$0.next = 53;
              break;
            }

            context$3$0.prev = 43;

            headers = headers(getState());
            context$3$0.next = 53;
            break;

          case 47:
            context$3$0.prev = 47;
            context$3$0.t4 = context$3$0['catch'](43);
            context$3$0.next = 51;
            return _regeneratorRuntime.awrap(_util.actionWith(_extends({}, requestType, {
              payload: new _errors.RequestError('[CALL_API].headers function failed'),
              error: true
            }), [action, getState()]));

          case 51:
            context$3$0.t5 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t5));

          case 53:
            context$3$0.next = 55;
            return _regeneratorRuntime.awrap(_util.actionWith(requestType, [action, getState()]));

          case 55:
            context$3$0.t6 = context$3$0.sent;
            next(context$3$0.t6);
            context$3$0.prev = 57;
            context$3$0.next = 60;
            return _regeneratorRuntime.awrap(fetch(endpoint, { method: method, body: body, credentials: credentials, headers: headers }));

          case 60:
            res = context$3$0.sent;
            context$3$0.next = 69;
            break;

          case 63:
            context$3$0.prev = 63;
            context$3$0.t7 = context$3$0['catch'](57);
            context$3$0.next = 67;
            return _regeneratorRuntime.awrap(_util.actionWith(_extends({}, requestType, {
              payload: new _errors.RequestError(context$3$0.t7.message),
              error: true
            }), [action, getState()]));

          case 67:
            context$3$0.t8 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t8));

          case 69:
            if (!res.ok) {
              context$3$0.next = 76;
              break;
            }

            context$3$0.next = 72;
            return _regeneratorRuntime.awrap(_util.actionWith(successType, [action, getState(), res]));

          case 72:
            context$3$0.t9 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t9));

          case 76:
            context$3$0.next = 78;
            return _regeneratorRuntime.awrap(_util.actionWith(_extends({}, failureType, {
              error: true
            }), [action, getState(), res]));

          case 78:
            context$3$0.t10 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t10));

          case 80:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[20, 25], [32, 36], [43, 47], [57, 63]]);
    };
  };
}

exports.apiMiddleware = apiMiddleware;

// Do not process actions without a [CALL_API] property

// Parse the validated RSAA action

// Should we bail out?

// Process [CALL_API].endpoint function

// Process [CALL_API].headers function

// We can now dispatch the request FSA

// Make the API call

// The request was malformed, or there was a network error

// Process the server response