const variables = require('./variables.json');
const fs = require('fs');
const path = require('path');

let hydratedTemplate = fs.readFileSync(path.join(__dirname, 'template'), 'utf8');

Object.entries(variables).forEach(([name, value]) => {
    // replace ${name}
    hydratedTemplate = hydratedTemplate.replace(new RegExp(`\\$\{${name}}`, 'g'), value);
    // replace $name
    hydratedTemplate = hydratedTemplate.replace(new RegExp(`\\$${name}`, 'g'), value);
});

fs.writeFileSync(path.join(__dirname, 'result'), hydratedTemplate);