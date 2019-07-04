const variables = require('/variables.json');
const fs = require('fs');

let hydratedTemplate = fs.readFileSync('/template', 'utf8');

Object.entries(variables).forEach(([name, value]) => {
    if (typeof value !== 'string') {
        // stringifying strings adds surrounding dquotes; we don't want that
        value = JSON.stringify(value)
    }

    // replace ${name}
    hydratedTemplate = hydratedTemplate.replace(new RegExp(`\\$\{${name}}`, 'g'), () => value);
    // replace $name
    hydratedTemplate = hydratedTemplate.replace(new RegExp(`\\$${name}`, 'g'), () => value);
});

fs.writeFileSync('/result', hydratedTemplate);