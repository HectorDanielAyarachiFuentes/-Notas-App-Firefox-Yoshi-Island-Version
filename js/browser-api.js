// browser-api.js - Polyfill para compatibilidad entre navegadores (Chrome, Edge, Opera, Firefox)
// con soporte para ejecución en páginas web normales para desarrollo/depuración.

const browserAPI = globalThis.browser || globalThis.chrome || {
  storage: {
    local: {
      get: (keys, callback) => {
        const res = {};
        if (typeof keys === 'string') {
          try {
            const val = localStorage.getItem(keys);
            res[keys] = val !== null ? JSON.parse(val) : null;
          } catch(e) { res[keys] = null; }
        } else if (Array.isArray(keys)) {
          keys.forEach(k => {
            try {
              const val = localStorage.getItem(k);
              res[k] = val !== null ? JSON.parse(val) : null;
            } catch(e) { res[k] = null; }
          });
        } else if (typeof keys === 'object') {
          Object.keys(keys).forEach(k => {
            try {
              const val = localStorage.getItem(k);
              res[k] = val !== null ? JSON.parse(val) : keys[k];
            } catch(e) { res[k] = keys[k]; }
          });
        }
        if (callback) callback(res);
        return Promise.resolve(res);
      },
      set: (data, callback) => {
        Object.keys(data).forEach(k => {
          localStorage.setItem(k, JSON.stringify(data[k]));
        });
        if (callback) callback();
        return Promise.resolve();
      },
      remove: (keys, callback) => {
        if (typeof keys === 'string') {
          localStorage.removeItem(keys);
        } else if (Array.isArray(keys)) {
          keys.forEach(k => localStorage.removeItem(k));
        }
        if (callback) callback();
        return Promise.resolve();
      }
    },
    sync: {
      get: (keys, callback) => {
        const res = {};
        if (typeof keys === 'string') {
          try {
            const val = localStorage.getItem(keys);
            res[keys] = val !== null ? JSON.parse(val) : null;
          } catch(e) { res[keys] = null; }
        } else if (Array.isArray(keys)) {
          keys.forEach(k => {
            try {
              const val = localStorage.getItem(k);
              res[k] = val !== null ? JSON.parse(val) : null;
            } catch(e) { res[k] = null; }
          });
        } else if (typeof keys === 'object') {
          Object.keys(keys).forEach(k => {
            try {
              const val = localStorage.getItem(k);
              res[k] = val !== null ? JSON.parse(val) : keys[k];
            } catch(e) { res[k] = keys[k]; }
          });
        }
        if (callback) callback(res);
        return Promise.resolve(res);
      },
      set: (data, callback) => {
        Object.keys(data).forEach(k => {
          localStorage.setItem(k, JSON.stringify(data[k]));
        });
        if (callback) callback();
        return Promise.resolve();
      }
    }
  },
  runtime: {
    lastError: null,
    onMessage: {
      addListener: () => {}
    }
  },
  tabs: {
    query: () => Promise.resolve([])
  }
};

export default browserAPI;