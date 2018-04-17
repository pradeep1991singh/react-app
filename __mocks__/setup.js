
import fetch from './fetch-mock';
import { userStore } from './static-data'

// mock fetch
global.fetch = fetch;

// mock localStorage
const localStorageMock = (function () {
    const store = {};
    return {
        getItem: function (key) {
            return store[key] || JSON.stringify(userStore.user)
        },
        setItem: function (key, value) {
            store[key] = value.toString()
        },
        removeItem: function () {
            delete store[key]
        }
    };
})();

global.localStorage = localStorageMock
