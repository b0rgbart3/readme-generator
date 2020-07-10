const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const questions = [
    {
      name: 'title',
      message: 'What is your title of your project?',
      default: 'Project Title',
    },
    {
        name: 'description',
        message: 'Please describe your project:',
        default: 'This is the project description.',
    },
    {
        name: 'installation',
        message: 'Instructions for Installation:',
        default: 'Instructions',
    },
    {
        name: 'usage',
        message: 'Usage:',
        default: 'Usage',
    },
    {
        name: 'license',
        message: 'What is the license you would like to share it under?',
        default: 'license',
    },
    {
        name: 'contributing',
        message: 'Are other people allowed to contribute?',
        default: 'yes',
    },
    {
        name: 'githubProfileName',
        message: 'What is your github profile name?',
        default: 'githubprofilename',
    }
  ];

  inquirer
  .prompt(questions).then(answers => {


    let readmeFile = `
    # ${answers.}
    
    `

  });

