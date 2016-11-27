// Generated by CoffeeScript 1.10.0
(function() {
  var plugin;

  plugin = function(core) {
    var mix;
    mix = function(giv, rec, override) {
      var k, results, results1, v;
      if (override === true) {
        results = [];
        for (k in giv) {
          v = giv[k];
          results.push(rec[k] = v);
        }
        return results;
      } else {
        results1 = [];
        for (k in giv) {
          v = giv[k];
          if (!rec.hasOwnProperty(k)) {
            results1.push(rec[k] = v);
          }
        }
        return results1;
      }
    };
    core.uniqueId = function(length) {
      var id;
      if (length == null) {
        length = 8;
      }
      id = "";
      while (id.length < length) {
        id += Math.random().toString(36).substr(2);
      }
      return id.substr(0, length);
    };
    core.clone = function(data) {
      var copy, k, v;
      if (data instanceof Array) {
        copy = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = data.length; i < len; i++) {
            v = data[i];
            results.push(v);
          }
          return results;
        })();
      } else {
        copy = {};
        for (k in data) {
          v = data[k];
          copy[k] = v;
        }
      }
      return copy;
    };
    core.countObjectKeys = function(o) {
      var k, v;
      if (typeof o === "object") {
        return ((function() {
          var results;
          results = [];
          for (k in o) {
            v = o[k];
            results.push(k);
          }
          return results;
        })()).length;
      }
    };
    return core.mixin = function(receivingClass, givingClass, override) {
      if (override == null) {
        override = false;
      }
      switch ((typeof givingClass) + "-" + (typeof receivingClass)) {
        case "function-function":
          return mix(givingClass.prototype, receivingClass.prototype, override);
        case "function-object":
          return mix(givingClass.prototype, receivingClass, override);
        case "object-object":
          return mix(givingClass, receivingClass, override);
        case "object-function":
          return mix(givingClass, receivingClass.prototype, override);
      }
    };
  };

  if ((typeof define !== "undefined" && define !== null ? define.amd : void 0) != null) {
    define(function() {
      return plugin;
    });
  } else if ((typeof window !== "undefined" && window !== null ? window.scaleApp : void 0) != null) {
    window.scaleApp.plugins.util = plugin;
  } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = plugin;
  }

}).call(this);
