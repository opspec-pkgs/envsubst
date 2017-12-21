const variables = require('./variables.json');
const fs = require('fs');
const path = require('path');

let hydratedTemplate = fs.readFileSync(path.join(__dirname, 'template'), 'utf8');

Object.entries(variables).forEach(([name, value]) => {
    let literalValue = JSON.stringify(value);
    literalValue = literalValue.substring(1, literalValue.length - 1);

    // replace ${name}
    hydratedTemplate = hydratedTemplate.replace(new RegExp(`\\$\{${name}}`, 'g'), literalValue);
    // replace $name
    hydratedTemplate = hydratedTemplate.replace(new RegExp(`\\$${name}`, 'g'), literalValue);
});

fs.writeFileSync('/result', hydratedTemplate);