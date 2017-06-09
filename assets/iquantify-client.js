"use strict";



define('iquantify-client/adapters/application', ['exports', 'iquantify-client/config/environment', 'active-model-adapter', 'ember'], function (exports, _iquantifyClientConfigEnvironment, _activeModelAdapter, _ember) {
  exports['default'] = _activeModelAdapter['default'].extend({
    host: _iquantifyClientConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),

    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('iquantify-client/adapters/quantum', ['exports', 'iquantify-client/adapters/application'], function (exports, _iquantifyClientAdaptersApplication) {
  exports['default'] = _iquantifyClientAdaptersApplication['default'].extend({
    createRecord: function createRecord(store, type, record) {
      // console.log('record is : ', record);
      // console.log('store is: ', store);
      // console.log('type is: ', type);
      var api = this.get('host');
      var serialized = this.serialize(record, { includeId: true });
      // console.log('serialized: ', serialized);
      var researchId = serialized.research_id;
      var url = api + '/research/' + researchId;
      var data = { quantum: serialized };
      return this.ajax(url, 'POST', { data: data });
    }
  });
});
define('iquantify-client/app', ['exports', 'ember', 'iquantify-client/resolver', 'ember-load-initializers', 'iquantify-client/config/environment'], function (exports, _ember, _iquantifyClientResolver, _emberLoadInitializers, _iquantifyClientConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _iquantifyClientConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _iquantifyClientConfigEnvironment['default'].podModulePrefix,
    Resolver: _iquantifyClientResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _iquantifyClientConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('iquantify-client/components/change-password-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    passwords: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('passwords'));
      },

      reset: function reset() {
        this.set('passwords', {});
        this.sendAction('goToResearches');
      }
    }
  });
});
define('iquantify-client/components/email-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('iquantify-client/components/flash-message', ['exports', 'ember-cli-flash/components/flash-message'], function (exports, _emberCliFlashComponentsFlashMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashComponentsFlashMessage['default'];
    }
  });
});
define('iquantify-client/components/hamburger-menu', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'button',
    classNames: ['navbar-toggle', 'collapsed'],
    attributeBindings: ['toggle:data-toggle', 'target:data-target', 'expanded:aria-expanded'],
    toggle: 'collapse',
    target: '#navigation',
    expanded: false
  });
});
define('iquantify-client/components/my-application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    actions: {
      signOut: function signOut() {
        this.sendAction('signOut');
      }
    }
  });
});
define('iquantify-client/components/navbar-header', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['navbar-header']
  });
});
define('iquantify-client/components/password-confirmation-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('iquantify-client/components/password-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('iquantify-client/components/researches/research-add-button', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('iquantify-client/components/researches/research-count', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    quantumPlusOne: {
      count: 1
    },
    quantumMinusOne: {
      count: -1
    },
    actions: {
      createQuantumPlusOne: function createQuantumPlusOne() {
        var data = this.get('quantumPlusOne');
        data.research = this.get('research');
        this.sendAction('createQuantum', data);
      },
      createQuantumMinusOne: function createQuantumMinusOne() {
        var data = this.get('quantumMinusOne');
        data.research = this.get('research');
        this.sendAction('createQuantum', data);
      }
    }
  });
});
define('iquantify-client/components/researches/research-create-modal', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    newResearch: {
      title: null,
      description: null,
      directions: null,
      announcement: {
        message: null
      }
    },
    actions: {
      closeModal: function closeModal() {
        this.toggleProperty('modal');
        this.$('form').trigger('reset');
        // // console.log('closeModal this: ', this)
      },
      createResearch: function createResearch() {
        // // console.log('modal newResearch: ', this.get('newResearch'));
        return this.sendAction('createResearch', this.get('newResearch'));
      }
    }
  });
});
define('iquantify-client/components/researches/research-edit-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      goToResearches: function goToResearches() {
        this.sendAction('goToResearches');
      },
      editResearch: function editResearch() {
        this.sendAction('editResearch', this.get('research'));
      }
    }
  });
});
define('iquantify-client/components/researches/research-list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'tr',
    actions: {
      researchDelete: function researchDelete() {
        // // console.log('research-list this: ', this.get('research') );
        return this.sendAction('researchDelete', this.get('research'));
      },
      goToResearchEdit: function goToResearchEdit() {
        this.sendAction('goToResearchEdit', this.get('research'));
      },
      goToResearch: function goToResearch() {
        this.sendAction('goToResearch', this.get('research'));
      }
    }
  });
});
define('iquantify-client/components/researches/research-table', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      researchDelete: function researchDelete(research) {
        // // console.log('in research-table,js researchDelete research: ', research);
        return this.sendAction('researchDelete', research);
      },
      goToResearchEdit: function goToResearchEdit(research) {
        this.sendAction('goToResearchEdit', research);
      },
      goToResearch: function goToResearch(research) {
        this.sendAction('goToResearch', research);
      }
    }
  });
});
define('iquantify-client/components/sign-in-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
        this.sendAction('goToIndex');
      }
    }
  });
});
define('iquantify-client/components/sign-up-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    credentials: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
        this.sendAction('goToIndex');
      }
    }
  });
});
define('iquantify-client/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('iquantify-client/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('iquantify-client/flash/object', ['exports', 'ember-cli-flash/flash/object'], function (exports, _emberCliFlashFlashObject) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashFlashObject['default'];
    }
  });
});
define('iquantify-client/helpers/app-version', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _iquantifyClientConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('iquantify-client/helpers/format-date', ['exports', 'ember', 'moment'], function (exports, _ember, _moment) {

  // export function formatDate(params, hash) {
  //   compute(params, hash) {
  //     let newDate
  //     if (hash.formatType === 'datetime') {
  //       newDate = moment(params).format('MM/DD/YYYY h:mm:ss a');
  //     } else if (has.formatType == 'date') {
  //       newDate = moment(params).format('MM/DD/YYYY');
  //     } else {
  //       newDate = params
  //     }
  //     return newDate;
  //   }
  // }

  exports['default'] = _ember['default'].Helper.extend({
    compute: function compute(params, hash) {
      {
        var formattedDate = undefined;
        // // console.log('params: ', params)
        // // console.log('hash: ', hash)
        if (hash.formatType === 'datetime') {
          formattedDate = (0, _moment['default'])(params, _moment['default'].ISO_8601).format('MM/DD/YYYY h:mm:ss a');
        } else if (hash.formatType === 'date') {
          formattedDate = (0, _moment['default'])(params, _moment['default'].ISO_8601).format('MM/DD/YYYY');
        } else {
          formattedDate = params;
        }
        return formattedDate;
      }
    }
  });
});
define('iquantify-client/helpers/is-after', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/is-after'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersIsAfter) {
  exports['default'] = _emberMomentHelpersIsAfter['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/is-before', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/is-before'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersIsBefore) {
  exports['default'] = _emberMomentHelpersIsBefore['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/is-between', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/is-between'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersIsBetween) {
  exports['default'] = _emberMomentHelpersIsBetween['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/is-same-or-after', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/is-same-or-after'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersIsSameOrAfter) {
  exports['default'] = _emberMomentHelpersIsSameOrAfter['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/is-same-or-before', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/is-same-or-before'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersIsSameOrBefore) {
  exports['default'] = _emberMomentHelpersIsSameOrBefore['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/is-same', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/is-same'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersIsSame) {
  exports['default'] = _emberMomentHelpersIsSame['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/moment-add', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/moment-add'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersMomentAdd) {
  exports['default'] = _emberMomentHelpersMomentAdd['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/moment-calendar', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/moment-calendar'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersMomentCalendar) {
  exports['default'] = _emberMomentHelpersMomentCalendar['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _emberMomentHelpersMomentDuration) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMomentDuration['default'];
    }
  });
});
define('iquantify-client/helpers/moment-format', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/moment-format'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersMomentFormat) {
  exports['default'] = _emberMomentHelpersMomentFormat['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/moment-from-now', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersMomentFromNow) {
  exports['default'] = _emberMomentHelpersMomentFromNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/moment-from', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/moment-from'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersMomentFrom) {
  exports['default'] = _emberMomentHelpersMomentFrom['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/moment-subtract', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/moment-subtract'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersMomentSubtract) {
  exports['default'] = _emberMomentHelpersMomentSubtract['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/moment-to-date', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/moment-to-date'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersMomentToDate) {
  exports['default'] = _emberMomentHelpersMomentToDate['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/moment-to-now', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersMomentToNow) {
  exports['default'] = _emberMomentHelpersMomentToNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/moment-to', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/helpers/moment-to'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentHelpersMomentTo) {
  exports['default'] = _emberMomentHelpersMomentTo['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('iquantify-client/helpers/moment-unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _emberMomentHelpersUnix) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix['default'];
    }
  });
  Object.defineProperty(exports, 'unix', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix.unix;
    }
  });
});
define('iquantify-client/helpers/moment', ['exports', 'ember-moment/helpers/moment'], function (exports, _emberMomentHelpersMoment) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMoment['default'];
    }
  });
});
define('iquantify-client/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _emberMomentHelpersNow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersNow['default'];
    }
  });
});
define('iquantify-client/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('iquantify-client/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('iquantify-client/helpers/unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _emberMomentHelpersUnix) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix['default'];
    }
  });
  Object.defineProperty(exports, 'unix', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix.unix;
    }
  });
});
define("iquantify-client/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('iquantify-client/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'iquantify-client/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _iquantifyClientConfigEnvironment) {
  var _config$APP = _iquantifyClientConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('iquantify-client/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('iquantify-client/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('iquantify-client/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/index'], function (exports, _emberDataSetupContainer, _emberDataIndex) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('iquantify-client/initializers/export-application-global', ['exports', 'ember', 'iquantify-client/config/environment'], function (exports, _ember, _iquantifyClientConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_iquantifyClientConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _iquantifyClientConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_iquantifyClientConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('iquantify-client/initializers/flash-messages', ['exports', 'ember', 'iquantify-client/config/environment'], function (exports, _ember, _iquantifyClientConfigEnvironment) {
  exports.initialize = initialize;
  var deprecate = _ember['default'].deprecate;

  var merge = _ember['default'].assign || _ember['default'].merge;
  var INJECTION_FACTORIES_DEPRECATION_MESSAGE = '[ember-cli-flash] Future versions of ember-cli-flash will no longer inject the service automatically. Instead, you should explicitly inject it into your Route, Controller or Component with `Ember.inject.service`.';
  var addonDefaults = {
    timeout: 3000,
    extendedTimeout: 0,
    priority: 100,
    sticky: false,
    showProgress: false,
    type: 'info',
    types: ['success', 'info', 'warning', 'danger', 'alert', 'secondary'],
    injectionFactories: ['route', 'controller', 'view', 'component'],
    preventDuplicates: false
  };

  function initialize() {
    var application = arguments[1] || arguments[0];

    var _ref = _iquantifyClientConfigEnvironment['default'] || {};

    var flashMessageDefaults = _ref.flashMessageDefaults;

    var _ref2 = flashMessageDefaults || [];

    var injectionFactories = _ref2.injectionFactories;

    var options = merge(addonDefaults, flashMessageDefaults);
    var shouldShowDeprecation = !(injectionFactories && injectionFactories.length);

    application.register('config:flash-messages', options, { instantiate: false });
    application.inject('service:flash-messages', 'flashMessageDefaults', 'config:flash-messages');

    deprecate(INJECTION_FACTORIES_DEPRECATION_MESSAGE, shouldShowDeprecation, {
      id: 'ember-cli-flash.deprecate-injection-factories',
      until: '2.0.0'
    });

    options.injectionFactories.forEach(function (factory) {
      application.inject(factory, 'flashMessages', 'service:flash-messages');
    });
  }

  exports['default'] = {
    name: 'flash-messages',
    initialize: initialize
  };
});
define('iquantify-client/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('iquantify-client/initializers/local-storage-adapter', ['exports', 'ember-local-storage/initializers/local-storage-adapter'], function (exports, _emberLocalStorageInitializersLocalStorageAdapter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter.initialize;
    }
  });
});
define('iquantify-client/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('iquantify-client/initializers/text-field', ['exports', 'ember'], function (exports, _ember) {
  exports.initialize = initialize;

  function initialize() {
    _ember['default'].TextField.reopen({
      classNames: ['form-control']
    });
  }

  exports['default'] = {
    name: 'text-field',
    initialize: initialize
  };
});
define('iquantify-client/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("iquantify-client/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('iquantify-client/models/quantum', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    count: _emberData['default'].attr('string'),
    longitude: _emberData['default'].attr('number'),
    latitude: _emberData['default'].attr('number'),
    research: _emberData['default'].belongsTo('research'),
    user: _emberData['default'].belongsTo('user')
  });
});
define('iquantify-client/models/research', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    directions: _emberData['default'].attr('string'),
    announcement: _emberData['default'].attr(),
    hide: _emberData['default'].attr('boolean'),
    editable: _emberData['default'].attr('boolean'),
    total: _emberData['default'].attr('number'),
    createdAt: _emberData['default'].attr(),
    updatedAt: _emberData['default'].attr(),
    user: _emberData['default'].belongsTo('user'),
    quantums: _emberData['default'].hasMany('quantum')
  });
});
define('iquantify-client/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string'),
    researches: _emberData['default'].hasMany('research'),
    quantums: _emberData['default'].hasMany('quantums')
  });
});
define('iquantify-client/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('iquantify-client/router', ['exports', 'ember', 'iquantify-client/config/environment'], function (exports, _ember, _iquantifyClientConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _iquantifyClientConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('sign-up');
    this.route('sign-in');
    this.route('change-password');
    this.route('users');
    this.route('researches', function () {
      this.route('research-edit', { path: '/:research_id' });
    });

    this.route('research', { path: 'research/:research_id' }, function () {});
  });

  exports['default'] = Router;
});
define('iquantify-client/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signOut: function signOut() {
        var _this = this;

        this.get('auth').signOut().then(function () {
          return _this.get('store').unloadAll();
        }).then(function () {
          return _this.transitionTo('index');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was an unexpected problem. You have been signed out.');
        }).then(function () {
          _this.transitionTo('index');
        });
      },

      error: function error(reason) {
        var unauthorized = reason.errors && reason.errors.some(function (error) {
          return error.status === '401';
        });

        if (unauthorized) {
          this.get('flashMessages').danger('You must be authenticated to access this page.');
          this.transitionTo('/sign-in');
        } else {
          this.get('flashMessages').danger('There was a problem. Please try again.');
        }

        return false;
      }
    }
  });
});
define('iquantify-client/routes/change-password', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      changePassword: function changePassword(passwords) {
        var _this = this;

        this.get('auth').changePassword(passwords)
        // .then(() => this.get('auth').signOut())
        .then(function () {
          return _this.transitionTo('researches');
        }).then(function () {
          _this.get('flashMessages').success('Successfully changed your password!');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      },
      goToResearches: function goToResearches() {
        this.transitionTo('researches');
      }
    }
  });
});
define('iquantify-client/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('iquantify-client/routes/research', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.get('store').findRecord('research', params.research_id);
    },
    actions: {
      createQuantum: function createQuantum(quantum) {
        var _this = this;

        var quantumRecord = this.get('store').createRecord('quantum', quantum);
        quantumRecord.save().then(function () {
          // let researchRecord = this.get('store').findRecord('research', quantum.research.id);
          _this.refresh();
        }).then(function () {
          _this.transitionTo('research');
        });
      }
    }
  });
});
define('iquantify-client/routes/researches/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    flashMessages: _ember['default'].inject.service(),
    model: function model() {
      return this.get('store').findAll('research');
    },
    actions: {
      researchDelete: function researchDelete(research) {
        var _this = this;

        // // console.log('Delete action on top research: ', research);
        research.destroyRecord()['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      },
      createResearch: function createResearch(research) {
        var _this2 = this;

        // console.log('list createItem data: ', research.title);
        if (!research.title) {
          this.get('flashMessages').danger('Title is required!');
        } else {
          var researchRecord = this.get('store').createRecord('research', research);
          researchRecord.save().then(function () {
            _ember['default'].$('.modal').modal('hide');
            _ember['default'].$('form').trigger('reset');
            _this2.refresh();
          })['catch'](function () {
            _this2.get('flashMessages').danger('There was a problem. Please try again.');
          });
        }
      },
      goToResearchEdit: function goToResearchEdit(research) {
        this.transitionTo('researches.research-edit', research);
      },
      goToResearch: function goToResearch(research) {
        this.transitionTo('research', research);
      }
    }
  });
});
define('iquantify-client/routes/researches/research-edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      // console.log('route research-edit params: ', params);
      return this.get('store').findRecord('research', params.research_id);
    },
    flashMessages: _ember['default'].inject.service(),
    actions: {
      goToResearches: function goToResearches() {
        this.transitionTo('researches');
      },
      editResearch: function editResearch(research) {
        var _this = this;

        if (!research.get('title')) {
          this.get('flashMessages').danger('Title is required!');
        } else {
          research.save().then(function () {
            _this.transitionTo('researches');
          })['catch'](function () {
            _this.get('flashMessages').danger('There was a problem. Please try again');
          });
        }
      }
    }
  });
});
define('iquantify-client/routes/sign-in', ['exports', 'ember', 'rsvp'], function (exports, _ember, _rsvp) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    model: function model() {
      return _rsvp['default'].Promise.resolve({});
    },

    actions: {
      signIn: function signIn(credentials) {
        var _this = this;

        return this.get('auth').signIn(credentials).then(function () {
          return _this.transitionTo('researches');
        }).then(function () {
          return _this.get('flashMessages').success('Thanks for signing in!');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      },
      goToIndex: function goToIndex() {
        this.transitionTo('index');
      }
    }
  });
});
define('iquantify-client/routes/sign-up', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signUp: function signUp(credentials) {
        var _this = this;

        this.get('auth').signUp(credentials).then(function () {
          return _this.get('auth').signIn(credentials);
        }).then(function () {
          return _this.transitionTo('researches');
        }).then(function () {
          _this.get('flashMessages').success('Successfully signed-up! You have also been signed-in.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      },
      goToIndex: function goToIndex() {
        this.transitionTo('index');
      }
    }
  });
});
define('iquantify-client/routes/users', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('user');
    }
  });
});
define('iquantify-client/serializers/application', ['exports', 'active-model-adapter'], function (exports, _activeModelAdapter) {
  exports['default'] = _activeModelAdapter.ActiveModelSerializer.extend({
    keyForAttribute: function keyForAttribute(attr) {
      return attr;
    }
  });
});
define('iquantify-client/services/ajax', ['exports', 'ember', 'ember-ajax/services/ajax', 'iquantify-client/config/environment'], function (exports, _ember, _emberAjaxServicesAjax, _iquantifyClientConfigEnvironment) {
  exports['default'] = _emberAjaxServicesAjax['default'].extend({
    host: _iquantifyClientConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),
    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('iquantify-client/services/auth', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Service.extend({
    ajax: _ember['default'].inject.service(),
    credentials: (0, _emberLocalStorage.storageFor)('auth'),
    isAuthenticated: _ember['default'].computed.bool('credentials.token'),

    signUp: function signUp(credentials) {
      return this.get('ajax').post('/sign-up', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation
          }
        }
      });
    },

    signIn: function signIn(credentials) {
      var _this = this;

      return this.get('ajax').post('/sign-in', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password
          }
        }
      }).then(function (result) {
        _this.get('credentials').set('id', result.user.id);
        _this.get('credentials').set('email', result.user.email);
        _this.get('credentials').set('token', result.user.token);
      });
    },

    changePassword: function changePassword(passwords) {
      return this.get('ajax').patch('/change-password/' + this.get('credentials.id'), {
        data: {
          passwords: {
            old: passwords.previous,
            'new': passwords.next
          }
        }
      });
    },

    signOut: function signOut() {
      var _this2 = this;

      return this.get('ajax').del('/sign-out/' + this.get('credentials.id'))['finally'](function () {
        return _this2.get('credentials').reset();
      });
    }
  });
});
define('iquantify-client/services/flash-messages', ['exports', 'ember-cli-flash/services/flash-messages'], function (exports, _emberCliFlashServicesFlashMessages) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashServicesFlashMessages['default'];
    }
  });
});
define('iquantify-client/services/moment', ['exports', 'ember', 'iquantify-client/config/environment', 'ember-moment/services/moment'], function (exports, _ember, _iquantifyClientConfigEnvironment, _emberMomentServicesMoment) {
  exports['default'] = _emberMomentServicesMoment['default'].extend({
    defaultFormat: _ember['default'].get(_iquantifyClientConfigEnvironment['default'], 'moment.outputFormat')
  });
});
define('iquantify-client/storages/auth', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {
  exports['default'] = _emberLocalStorageLocalObject['default'].extend({});
});
define("iquantify-client/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "vNFtGLbp", "block": "{\"statements\":[[\"append\",[\"helper\",[\"my-application\"],null,[[\"signOut\"],[\"signOut\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/application.hbs" } });
});
define("iquantify-client/templates/change-password", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "v+u7NVHf", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"jumbotron\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Change Password\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"change-password-form\"],null,[[\"submit\",\"goToResearches\"],[\"changePassword\",\"goToResearches\"]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]}],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/change-password.hbs" } });
});
define("iquantify-client/templates/components/change-password-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ZE0jtOM/", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"previous\"],[\"flush-element\"],[\"text\",\"Old Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"previous\",\"Old password\",[\"get\",[\"passwords\",\"previous\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"next\"],[\"flush-element\"],[\"text\",\"New Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"next\",\"New password\",[\"get\",[\"passwords\",\"next\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Change Password\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/change-password-form.hbs" } });
});
define("iquantify-client/templates/components/email-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Iv00x5bF", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"email\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"email\",\"email\",\"Email\",[\"get\",[\"email\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/email-input.hbs" } });
});
define("iquantify-client/templates/components/hamburger-menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "NLxlRnyD", "block": "{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/hamburger-menu.hbs" } });
});
define("iquantify-client/templates/components/my-application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "fEfjRgRN", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/my-application.hbs" } });
});
define("iquantify-client/templates/components/navbar-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2AJwu0VW", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hamburger-menu\"]],false],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"application\"],[[\"class\"],[\"navbar-brand\"]],0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"iQuantify\"],[\"close-element\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/navbar-header.hbs" } });
});
define("iquantify-client/templates/components/password-confirmation-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "vXVi+/mT", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"password-confirmation\"],[\"flush-element\"],[\"text\",\"Password Confirmation\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password-confirmation\",\"Password Confirmation\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/password-confirmation-input.hbs" } });
});
define("iquantify-client/templates/components/password-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "XQzHkAtJ", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"kind\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password\",\"Password\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/password-input.hbs" } });
});
define("iquantify-client/templates/components/researches/research-add-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "V8TnXUh1", "block": "{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-primary btn-lg\"],[\"static-attr\",\"data-toggle\",\"modal\"],[\"static-attr\",\"data-target\",\"#my-modal\"],[\"static-attr\",\"data-backdrop\",\"static\"],[\"static-attr\",\"data-keyboard\",\"false\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-plus\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"  New\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/researches/research-add-button.hbs" } });
});
define("iquantify-client/templates/components/researches/research-count", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "V0C1tAfR", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"jumbotron\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-success btn-lg counter\"],[\"static-attr\",\"data-dismiss\",\"modal\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createQuantumPlusOne\"]],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-plus\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"research\",\"total\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-danger btn-lg counter\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createQuantumMinusOne\"]],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-minus\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\" 1\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"research\",\"title\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\".announcement\"],[\"flush-element\"],[\"append\",[\"helper\",[\"format-date\"],[[\"get\",[\"research\",\"updatedAt\"]]],[[\"formatType\"],[\"date\"]]],false],[\"text\",\"   \"],[\"append\",[\"unknown\",[\"research\",\"announcement\",\"message\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"research\",\"description\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Directions\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"research\",\"directions\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/researches/research-count.hbs" } });
});
define("iquantify-client/templates/components/researches/research-create-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Sy+rSY8l", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"my-modal\"],[\"static-attr\",\"class\",\"modal fade\"],[\"static-attr\",\"tabindex\",\"-1\"],[\"static-attr\",\"role\",\"dialog\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-dialog modal-lg\"],[\"static-attr\",\"role\",\"document\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-content\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-header\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"close\"],[\"static-attr\",\"data-dismiss\",\"modal\"],[\"static-attr\",\"aria-label\",\"Close\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"closeModal\"]],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"text\",\"×\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h3\",[]],[\"static-attr\",\"class\",\"modal-title\"],[\"flush-element\"],[\"text\",\"New Research\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-horizontal\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-body\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"fieldset\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"form-group-edit-title\"],[\"static-attr\",\"class\",\"form-group  has-feedback form-group-research-title\"],[\"flush-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-3 control-label\"],[\"static-attr\",\"for\",\"research-edit-title\"],[\"flush-element\"],[\"text\",\"Title\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-8\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"type\",\"class\",\"placeholder\",\"value\"],[\"research-edit-title\",\"text\",\"research-title form-control\",\"Title\",[\"get\",[\"newResearch\",\"title\"]]]]],false],[\"text\",\"\\n              \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"research-edit-description\"],[\"static-attr\",\"class\",\"col-sm-3 control-label\"],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-8\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"type\",\"class\",\"placeholder\",\"rows\",\"value\"],[\"research-edit-description\",\"text\",\"research-description form-control\",\"Description\",\"3\",[\"get\",[\"newResearch\",\"description\"]]]]],false],[\"text\",\"\\n              \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"research-edit-directions\"],[\"static-attr\",\"class\",\"col-sm-3 control-label\"],[\"flush-element\"],[\"text\",\"Directions\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-8\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"type\",\"class\",\"placeholder\",\"rows\",\"value\"],[\"research-edit-directions\",\"text\",\"research-directions form-control\",\"Directions\",\"3\",[\"get\",[\"newResearch\",\"directions\"]]]]],false],[\"text\",\"\\n              \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"research-edit-announcement\"],[\"static-attr\",\"class\",\"col-sm-3 control-label\"],[\"flush-element\"],[\"text\",\"Announcement\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-8\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"type\",\"class\",\"placeholder\",\"rows\",\"value\"],[\"research-edit-announcement\",\"text\",\"research-announcement form-control\",\"Announcement\",\"3\",[\"get\",[\"newResearch\",\"announcement\",\"message\"]]]]],false],[\"text\",\"\\n              \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-footer\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"id\",\"reset-research-edit\"],[\"static-attr\",\"type\",\"reset\"],[\"static-attr\",\"class\",\"btn btn-secondary reset\"],[\"flush-element\"],[\"text\",\"Reset\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"static-attr\",\"data-dismiss\",\"modal\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"closeModal\"]],[\"flush-element\"],[\"text\",\"Close\"],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"createResearch\"]],[\"flush-element\"],[\"text\",\"Save\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"close-element\"],[\"comment\",\" /.modal-content \"],[\"text\",\"\\n\\n  \"],[\"close-element\"],[\"comment\",\" /.modal-dialog \"],[\"text\",\"\\n\"],[\"close-element\"],[\"comment\",\" /.modal \"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"          \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]}],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/researches/research-create-modal.hbs" } });
});
define("iquantify-client/templates/components/researches/research-edit-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "6J9A3n2P", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-horizontal\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"fieldset\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"form-group-edit-title\"],[\"static-attr\",\"class\",\"form-group  has-feedback form-group-research-title\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"col-sm-3 control-label\"],[\"static-attr\",\"for\",\"research-edit-title\"],[\"flush-element\"],[\"text\",\"Title\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-8\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"input\"],null,[[\"id\",\"type\",\"class\",\"placeholder\",\"value\",\"required\"],[\"research-edit-title\",\"text\",\"research-title form-control\",\"Title\",[\"get\",[\"research\",\"title\"]],\"true\"]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"research-edit-description\"],[\"static-attr\",\"class\",\"col-sm-3 control-label\"],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-8\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"type\",\"class\",\"placeholder\",\"rows\",\"value\"],[\"research-edit-description\",\"text\",\"research-description form-control\",\"Description\",\"3\",[\"get\",[\"research\",\"description\"]]]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"research-edit-directions\"],[\"static-attr\",\"class\",\"col-sm-3 control-label\"],[\"flush-element\"],[\"text\",\"Directions\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-8\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"type\",\"class\",\"placeholder\",\"rows\",\"value\"],[\"research-edit-directions\",\"text\",\"research-directions form-control\",\"Directions\",\"3\",[\"get\",[\"research\",\"directions\"]]]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"research-edit-announcement\"],[\"static-attr\",\"class\",\"col-sm-3 control-label\"],[\"flush-element\"],[\"text\",\"Announcement\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-8\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"id\",\"type\",\"class\",\"placeholder\",\"rows\",\"value\"],[\"research-edit-announcement\",\"text\",\"research-announcement form-control\",\"Announcement\",\"3\",[\"get\",[\"research\",\"announcement\",\"message\"]]]]],false],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"static-attr\",\"data-dismiss\",\"modal\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"goToResearches\"]],[\"flush-element\"],[\"text\",\"Cancel\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"editResearch\"]],[\"flush-element\"],[\"text\",\"Save\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/researches/research-edit-form.hbs" } });
});
define("iquantify-client/templates/components/researches/research-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "c2TY+l8l", "block": "{\"statements\":[[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"research\",\"editable\"]]],null,0],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"research\",\"title\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-arrow-circle-right\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"goToResearch\"]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"research\",\"announcement\",\"message\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"format-date\"],[[\"get\",[\"research\",\"createdAt\"]]],[[\"formatType\"],[\"datetime\"]]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"td\",[]],[\"flush-element\"],[\"append\",[\"helper\",[\"format-date\"],[[\"get\",[\"research\",\"updatedAt\"]]],[[\"formatType\"],[\"datetime\"]]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-default edit-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"goToResearchEdit\"]],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-pencil\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-default delete-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"researchDelete\"]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-trash-o\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/researches/research-list.hbs" } });
});
define("iquantify-client/templates/components/researches/research-table", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "HitcVV2L", "block": "{\"statements\":[[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table table-responsive\"],[\"static-attr\",\"style\",\"float:right\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"thead\",[]],[\"static-attr\",\"class\",\"thead-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Actions\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Title\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Go\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Announcement\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Research Item Created\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"th\",[]],[\"flush-element\"],[\"text\",\"Research Item Updated\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"researches\"]]],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"researches/research-list\"],null,[[\"research\",\"researchDelete\",\"goToResearchEdit\",\"goToResearch\"],[[\"get\",[\"research\"]],\"researchDelete\",\"goToResearchEdit\",\"goToResearch\"]]],false],[\"text\",\"\\n\"]],\"locals\":[\"research\"]}],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/researches/research-table.hbs" } });
});
define("iquantify-client/templates/components/sign-in-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "U1PHpKWP", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign In\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/sign-in-form.hbs" } });
});
define("iquantify-client/templates/components/sign-up-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "+/c3Vqy9", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-confirmation-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"passwordConfirmation\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign Up\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/components/sign-up-form.hbs" } });
});
define("iquantify-client/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "QJiCtvW8", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"navbar-header\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"navigation\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#navigation\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,2],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"jumbotron\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"iQuantify\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"lead\"],[\"flush-element\"],[\"text\",\"Crowdsourced Research\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"lead\"],[\"flush-element\"],[\"text\",\"Need an easy way to get data for a research project?\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"lead\"],[\"flush-element\"],[\"text\",\"Then this is the web app for you!\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"A simple interface makes it easy for your research assistants to capture data. Sign up to see what it's all about.\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-up\"],null,1],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Or, if you already have an account\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-in\"],null,0],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Sign In\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Sign Up\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]}],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/index.hbs" } });
});
define("iquantify-client/templates/research", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "axlNu0ea", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"navbar-header\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"navigation\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#navigation\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"researches\"],null,2],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"change-password\"],null,1],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"append\",[\"helper\",[\"researches/research-count\"],null,[[\"research\",\"createQuantum\"],[[\"get\",[\"model\"]],\"createQuantum\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]},{\"statements\":[[\"text\",\"Change Password\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Researches\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/research.hbs" } });
});
define("iquantify-client/templates/researches/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "0PmDBG4+", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"navbar-header\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"navigation\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#navigation\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"researches\"],null,2],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"change-password\"],null,1],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"jumbotron\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Research Items\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"researches/research-add-button\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"researches/research-create-modal\"],null,[[\"createResearch\"],[\"createResearch\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"researches/research-table\"],null,[[\"researches\",\"researchDelete\",\"goToResearchEdit\",\"goToResearch\"],[[\"get\",[\"model\"]],\"researchDelete\",\"goToResearchEdit\",\"goToResearch\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]},{\"statements\":[[\"text\",\"Change Password\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Researches\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/researches/index.hbs" } });
});
define("iquantify-client/templates/researches/research-edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "fHE4G2fn", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"navbar-header\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"navigation\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#navigation\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"researches\"],null,2],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"change-password\"],null,1],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"jumbotron\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Edit Research\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"researches/research-edit-form\"],null,[[\"research\",\"goToResearches\",\"editResearch\"],[[\"get\",[\"model\"]],\"goToResearches\",\"editResearch\"]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]},{\"statements\":[[\"text\",\"Change Password\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Researches\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/researches/research-edit.hbs" } });
});
define("iquantify-client/templates/sign-in", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "o8FA3gge", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"navbar-header\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"navigation\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#navigation\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"jumbotron\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign In\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"sign-in-form\"],null,[[\"submit\",\"reset\",\"credentials\",\"goToIndex\"],[\"signIn\",\"reset\",[\"get\",[\"model\"]],\"goToIndex\"]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]}],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/sign-in.hbs" } });
});
define("iquantify-client/templates/sign-up", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "gCQPnC+9", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"navbar-header\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"navigation\"],[\"static-attr\",\"data-toggle\",\"collapse\"],[\"static-attr\",\"data-target\",\"#navigation\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"jumbotron\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign Up\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"sign-up-form\"],null,[[\"submit\",\"goToIndex\"],[\"signUp\",\"goToIndex\"]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]}],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/sign-up.hbs" } });
});
define("iquantify-client/templates/users", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "0oarq06K", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Users\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"user\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"user\"]}],\"hasPartials\":false}", "meta": { "moduleName": "iquantify-client/templates/users.hbs" } });
});


define('iquantify-client/config/environment', ['ember'], function(Ember) {
  var prefix = 'iquantify-client';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("iquantify-client/app")["default"].create({"name":"iquantify-client","version":"0.0.0+d9c4dd4d"});
}
//# sourceMappingURL=iquantify-client.map
