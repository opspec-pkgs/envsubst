const variables = require('/variables.json');
const envsub = require('envsub');

const envs = Object
    .entries(variables)
    .map(([name, value]) => {
        if (typeof value === 'string') {
            // stringifying strings adds surrounding dquotes; we don't want that
            return { name, value }
        }
        return { name, value: JSON.stringify(value) }
    })

envsub({
    templateFile: '/template',
    outputFile: '/result',
    options: {
        envs,
        protect: true,
        syntax: 'dollar-both',
    }
}).catch(err => {
    console.error(err.message);
    process.exit(1)
});