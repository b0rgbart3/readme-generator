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

//console.log(answers);

// console.log("--------------------");
// console.log("There were "+questions.length+" questions.");

    let readMeFileString = `# ${answers.title}\n`;
    readMeFileString += `${answers.description}\n\n`;

    let realAnswers = questions.filter( question => answers[question.name] !="");

    realAnswers.splice(0,2);

    realAnswers.forEach( question => {
       readMeFileString += "## " + question.name + "\n" + answers[question.name] + "\n\n";

    })
    console.log(readMeFileString);


    // fs.writeFile("output.md", readmeFile, function(err) {

    //     if (err) {
    //       return console.log(err);
    //     }
    
    //   });



  });

