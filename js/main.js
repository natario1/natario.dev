const loadStrings = (language) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.onload = () => {
            if (request.status === 200) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject(request.status);
            }
        };
        request.open("GET", "res/strings_" + language + ".json", true);
        request.send();
    });
};

const app = new Vue({
    el: '#container',
    data: {
        /* Set to undefined so we can use v-if in container and avoid rendering without strings */
        strings: undefined,
        language: undefined,
        languages: [ 'en', 'it', 'pt' ]
    },
    watch: {
        language: async function(value) {
            app.strings = await loadStrings(value);
        }
    }
});

app.language = 'en';
