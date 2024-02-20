const { generateBadges, generateLicenseBadge } = require("./generateBadges");

const generateMarkdown = (answers) => {
  return `# ${answers.project}

  ${generateLicenseBadge(answers.license)}

## Description

${answers.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Credits](#credits)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)
- [Badges](#badges)


## Installation 

To install the necessary dependencies, run the following command: 

${answers.dependencies}

## Usage

${answers.usage}

## License 

This project is licensed under the ${answers.license} license.

## Contributing

${answers.contribution}

## Tests

To run tests, use the following command: 

${answers.tests}

## Questions 

If you have any questions about this project, please reach out:
- GitHub: https://github.com/${answers.username}
- Email: ${answers.email}

## Badges

${answers.badges.length ? generateBadges(answers.badges) : ""}`;
};

module.exports = generateMarkdown;
