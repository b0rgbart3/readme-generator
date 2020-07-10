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
    type: 'list',
      message: 'Select license',
      name: 'license',
      choices: [
        new inquirer.Separator(' License '),
        {
          name: 'MIT',
        },
        {
          name: 'Apache',
        },
        {
          name: 'GPL',
        },
        {
            name: 'Unlicensed / Public Domain',
        }
        ]
    },
    {
        name: 'contributing',
        message: 'Contribution instructions:',
        default: '',
    },
    {
        name: 'tests',
        message: 'Tests:',
        default: '',
    },
    {
        name: 'githubProfileName',
        message: 'What is your github profile name?',
        default: '',
    },
    {
        type: 'boolean',
        name: 'includePic',
        message: 'Do you want to include your github profile pic?',
        default: true,
    },
    {
        type: 'boolean',
        name: 'includeGithubEmail',
        message: 'Do you want to include your github email?',
        default: true,
    }
  ];

  inquirer
  .prompt(questions).then(answers => {


    let realAnswers = questions.filter( question => answers[question.name] !="");
    console.log(realAnswers);
//     let title = `
// # ${answers.title}
// ${answers.description}`;

// let install = `
// ## Installation
// ${answers.installation}
// `;

// let usage = `
// ## Usage
// ${answers.usage}
// `;

// let credits = `
// ## Credits
// ${answers.credits}
// `;

// let license = `
// ## License
// ${answers.license}
// `;

// let badges = `
// ## Badges
// ${answers.badges}
// `;

// let contributing = `
// ## Contributing
// ${answers.contributing}
// `;

// let tests=`
// ## Tests
// ${answers.tests}
// `;


// let readmeFile = answers.title;
// if (answers.usage) {
//     readmeFile+= answers.usage;
// }
// if (answers.usage) {
//     readmeFile+= answers.usage;
// }


    // fs.writeFile("output.md", readmeFile, function(err) {

    //     if (err) {
    //       return console.log(err);
    //     }
    
    //   });



  });

