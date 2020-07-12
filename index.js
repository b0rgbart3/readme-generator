const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

//const asyncAxios = util.promisify(axios.get);

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
        name: 'image',
        message: 'url of Screengrab or other image:',
        default: '',
    },
    {
      name: 'imageDescription',
      message: 'description of your image:',
      default: '',
    },
    {
        name: 'Installation',
        message: 'Instructions for Installation:',
        default: '',
    },
    {
        name: 'Usage',
        message: 'Usage:',
        default: 'Usage',
    },
    {
        name: 'Live Demo',
        message: "What is the url of the live demo?",
        default: ""
    },
    {
    type: 'list',
      message: 'Select license',
      name: 'License',
      choices: [
        new inquirer.Separator(' License '),
        {
          name: 'MIT',
        },
        {
          name: 'GPL 3',
        },
        {
            name: 'GPL',
          },
        {
          name: 'Creative Commons',
        },
        {
            name: 'Unlicensed / Public Domain',
        }
        ]   
    },
    {
        name: 'Contributing',
        message: 'Contribution instructions:',
        default: '',
    },
    {
        name: 'Tests',
        message: 'Tests:',
        default: '',
    },
    {
      name: 'Badges',
      message: "What would you like the subject of your badge to be?",
      default: "",
    },
    {
      name: 'badgeStatus',
      message: "What would you like the status of your badge to be?",
      default: "",
    },
    {
        name: 'githubProfileName',
        message: 'What is your github profile name?',
        default: 'b0rgBart3',
    },
    {
        name: 'includePic',
        message: 'Do you want to include your github profile pic?',
        default: 'y',
    },
    {
      name: 'githubEmail',
      message: 'What is your github email address?',
      default: 'borgBart3@gmail.com',
  },
    // {
    //     name: 'includeGithubEmail',
    //     message: 'Do you want to include your github email?',
    //     default: 'y',
    // }
  ];

// let profilepic = [![](https://github.com/remarkablemark.png?size=50)](https://github.com/remarkablemark)


  let licenses = [
    'MIT','GPL 3','GPL', 'Creative Commons','Unlicensed / Public Domain'
  ]
  let licenseBadges = [
"[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)",
"[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)",
"[![GPL license](https://img.shields.io/badge/License-GPL-blue.svg)](http://perso.crans.org/besson/LICENSE.html)",
"[![CC-0 license](https://img.shields.io/badge/License-CC--0-blue.svg)](https://creativecommons.org/licenses/by-nd/4.0)"
  ]


  // Send the questions array to the Inquirer -- 

  inquirer
  .prompt(questions).then(answers => {

    // The user's answers will appear in the answers object

    // Start the output with the title and description (these are not optional)

    let readMeFileStringPart1 = `# ${answers.title}\n`;
    readMeFileStringPart1 += `${answers.description}\n\n`;
    let readMeFileStringPart2 = "";

    // realAnswers is a filtered version of the answers -- that only includes answers that aren't blank
    let realAnswers = questions.filter( question => answers[question.name] !="");

    // we don't actually need the first two -- title and description, because those are already included (above)
    realAnswers.splice(0,2);

    let license = "";
    let genericBadge = "";
    let profileName = "";
    let profilePic = "";
    let profileEmail = "";
    let imagePath = "";
    let tableOfContents = "# Table of contents\n";
    let sectionCount = 0;

    // Loop through the rest of the answers and add to the output string accordingly.
    realAnswers.forEach( question => {
      console.log(question.name);
      console.log(answers[question.name]);
      
        // depending on the question, we need to handle the output differently
        switch (question.name) {
         

          case "License": 
            sectionCount++;
            license = answers[question.name];
            console.log("looking at license: " + license);
            let licenseIndex = licenses.indexOf(license);
            console.log(licenseIndex);
            if ((licenseIndex != -1) && (licenseIndex < 4) ){
              readMeFileStringPart2 +="<a name='License'></a>\n## License\n";
              readMeFileStringPart2 += licenseBadges[licenseIndex] + "\n";
              tableOfContents += `${sectionCount}. [${question.name}](#${question.name})\n`;
            }

         //   console.log("License: " + answers[question.name]);
            break;

          case "liveDemo":
            sectionCount++;
            readMeFileStringPart2 += "<a name='liveDemo'></a>\n## Live Demo\n";
            readMeFileStringPart2 += "<a href='"+answers[question.name]+"'>"+answers[question.name]+"</a>\n";
            tableOfContents += `${sectionCount}. [${question.name}](#${question.name})\n`;
              break;

          case "image":
             //readMeFileString += "<img src='" + answers[question.name] + "' />"
             imagePath = answers[question.name];
            
             break;

          case "imageDescription":
            // ![alt text](http://url/to/img.png)
            if (imagePath) { 
              readMeFileStringPart1 += "![" + answers[question.name]+ "](" + imagePath + ")\n";
            }
            break;

          case "Installation":
            sectionCount++;
            readMeFileStringPart2 += `<a name="Installation"></a>\n## Installation\n`;
            readMeFileStringPart2 += "```sh\n" + answers[question.name] + "\n```\n";
            tableOfContents += `${sectionCount}. [${question.name}](#${question.name})\n`;
            break;
          case "Usage":
            sectionCount++;
            readMeFileStringPart2 += `<a name="Usage"></a>\n## Usage\n`;
            readMeFileStringPart2 += "```sh\n" + answers[question.name] + "\n```\n";
            tableOfContents += `${sectionCount}. [${question.name}](#${question.name})\n`;
            break;
          case "Badges":
            sectionCount++;
            // take the spaces out of the inputted string
            let badgeSubject = answers[question.name].split(" ").join("_");

            // create the first half of the badge
            genericBadge = `<a name="Badges"></a>\n## Badges\n [![Generic badge](https://img.shields.io/badge/${badgeSubject}`;
            tableOfContents += `${sectionCount}. [${question.name}](#${question.name})\n`;
            break;

          case "badgeStatus":
            // take the spaces out of the inputted string
            let badgeStatus = answers[question.name].split(" ").join("_");

            // create the 2nd half of the badge
            genericBadge += `-${badgeStatus}-<COLOR>.svg)](https://shields.io/)`;
            readMeFileStringPart2 += genericBadge + "\n";
            break;

          case "githubProfileName":
            profileName = answers[question.name];
            readMeFileStringPart2 += "\n**on github:** <a href='github.com/" + profileName + "'>"+profileName+"</a>\n";
            break;
          
          case "includePic":
            profilePic = answers[question.name];
            let includePic = false;
            if (profilePic.length > 0) {
              if (profilePic[0] === "y")
              {
                includePic = true;
              }
            }
            
            if (includePic) {
              let profilepicString  = `[![](https://github.com/${profileName}.png?size=90)](https://github.com/remarkablemark)`;
              readMeFileStringPart2 += profilepicString + "\n";
            }
            
            break;

            case "githubEmail": 
              profileEmail = answers[question.name];
              readMeFileStringPart2 += "\nEmail: " + profileEmail + "\n";
            break;

          // case "includeGithubEmail":
          //   profileEmail = answers[question.name];
          //   let includeEmail = false;
          //   if (profileEmail.length > 0) {
          //     if (profileEmail[0] === "y")
          //     {
          //       includeEmail = true;
          //     }
          //   }

          //   if (includeEmail) {
          //     // Send a get request to the github API to get the email address
          //     // that is associated with this github account

          //    // queryUrl = `https://api.github.com/users/${profileName}/events/public`;
          //     queryUrl = `https://api.github.com/users/${profileName}`;
          //     axios.get(queryUrl).then(function(res) {

             
        
          //       // parse the returned object to get the email address by itself
          //       console.log("Got: " +  {res}  );
          //     }, (error) => {
          //       console.log("There was an error getting your email address from the github API.");
          //     });
          //   }
            //let emailObject = getEmailObject();
           // console.log(emailObject);


           // break;


          // For all other cases, we can simply include an h2 and the answer
          default: 
            sectionCount++;
            readMeFileStringPart2 += `<a name="${question.name}"></a>\n## ` + question.name + "\n" + answers[question.name] + "\n";
            tableOfContents += `${sectionCount}. [${question.name}](#${question.name})\n`;
          break;

        }
  
    })
   
   
    //console.log(readMeFileString);


    fs.writeFile("goodREADME.md", readMeFileStringPart1 + tableOfContents + readMeFileStringPart2, function(err) {

        if (err) {
          return console.log(err);
        }
    
      });



  });

  // async function getEmailObject() {
  //   githubAPIURL = `https://api.github.com/users/${profileName}/events/public`;
  //   try {
  //     email = await asyncAxios(githubAPIURL);
  //     console.log("tried to get email: " + email);
  //     return email;
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }