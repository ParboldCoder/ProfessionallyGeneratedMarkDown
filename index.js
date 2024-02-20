const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const util = require("util");
const emailValidator = require("email-validator");

const generateMarkdown = require("./utils/generateMarkdown");

const writeFileAsync = util.promisify(fs.writeFile);

const validateEmail = (email) =>
  emailValidator.validate(email)
    ? true
    : "Please enter a valid email address.";

const questions = [
    {
    type: "input",
    name: "project",
    message: "What is your project's name?",
    },
    {
    type: "input",
    name: "description",
    message: "Please write a short description of your project.",
    },
    {
    type: "input",
    name: "username",
    message: "What is your GitHub username?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
    validate: validateEmail,
  },
  {
    type: "list",
    name: "license",
    message:
      "What kind of license should your project have? Please pick one of the licenses from the list or select None if you would like no licence.",
    choices: ["MIT", "GNU GPLv3", "Apache License 2.0", "ISC", "None", "Other"],
  },
  {
    type: "input",
    name: "otherLicense",
    message: "Please specify the license:",
    when: (answers) => answers.license === "Other",
  },
  {
    type: "input",
    name: "dependencies",
    message: "What command should be run to install dependencies",
    
  },
  {
    type: "input",
    name: "tests",
    message: "What command should be run to run tests",
  },
  {
    type: "input",
    name: "usage",
    message: "What does the user need to know about using the repo?",
  },
  {
    type: "input",
    name: "contribution",
    message: "What does the user need to know about contributing to the repo?",
  },
  {
    type: "input",
    name: "credits",
    message:
      "List your collaborators, if any, with links to their GitHub profiles.",
  },
  {
    type: "checkbox",
    name: "badges",
    message:
      "Please select which languages and tools you used to create this project.",
    choices: ["HTML", "CSS", "Bootstrap", "JavaScript", "jQuery", "NodeJS"],
  },
];

const promptUser = () => inquirer.prompt(questions);

const init = async () => {
  try {
    const answers = await promptUser();
    const markdown = generateMarkdown(answers);

    !fs.existsSync(`generated`) && fs.mkdirSync(`generated`);

    await writeFileAsync(
      path.join(`${process.cwd()}/generated/`, "README.md"),
      markdown
    );

    console.info("Successfully wrote to README.md");
  } catch (err) {
    console.error(err);
  }
};

init();
