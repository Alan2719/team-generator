const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
let position;
let teamMembers = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

let createFile = (name,file) => {
    fs.writeFile(name, file, (err) => {
        if (err) {
            throw err;
        } else {
            console.log("Your file was succesfully created!")
        }
    })
}

let getManagerInfo = () => {
    inquirer.prompt([
        {
            message:"What is the name of the manager? ",
            type:"input",
            name:"_name"
        },
        {
            message:"What is the id of the manager? ",
            type:"input",
            name:"_id"
        },
        {
            message:"What is the email of the manager? ",
            type:"input",
            name:"_email"
        },
        {
            message:"What is the office number of the mamager? ",
            type:"input",
            name:"_officeNumber"
        }
    ]).then((response) => {
        //console.log(response);
        let manager = new Manager(response._name, response._id, response._email, response._officeNumber);
        teamMembers.push(manager);
        addMembers();
    })
}

let getEngineerInfo = () => {
    inquirer.prompt([
        {
            message:"What is the name of the engineer? ",
            type:"input",
            name:"_name"
        },
        {
            message:"What is the id of the engineer? ",
            type:"input",
            name:"_id"
        },
        {
            message:"What is the email of the engineer? ",
            type:"input",
            name:"_email"
        },
        {
            message:"What is the Github user of the engineer? ",
            type:"input",
            name:"_user"
        }
    ]).then((response) => {
        //console.log(response);
        let engineer = new Engineer(response._name, response._id, response._email, response._user);
        teamMembers.push(engineer);
        addMembers();
    })
}

let getInternInfo = () => {
    inquirer.prompt([
        {
            message:"What is the name of the intern? ",
            type:"input",
            name:"_name"
        },
        {
            message:"What is the id of the intern? ",
            type:"input",
            name:"_id"
        },
        {
            message:"What is the email of the intern? ",
            type:"input",
            name:"_email"
        },
        {
            message:"What is the name of the school where the intern study? ",
            type:"input",
            name:"_school"
        }
    ]).then((response) => {
        //console.log(response);
        let intern = new Intern(response._name, response._id, response._email, response._school);
        teamMembers.push(intern);
        addMembers();
    })
}

let getPosition = () => {
    inquirer.prompt([
        {
            type:"checkbox",
            message:'Select the memeber you want to add to your team: ',
            name:'member',
            choices: ["Manager", "Engineer", "Intern"]
        }
    ]).then((data) => {
        //console.log(__dir);
        position = data.member[0];
        switch(position) {
            case "Manager":
                getManagerInfo();
                break;
            case "Engineer":
                getEngineerInfo();
                break;
            case "Intern":
                getInternInfo();
                break;
            default:
                console.log("Not position provided")
                break;
        }
    })
}

let addMembers = () => {
    inquirer.prompt([
        {
            type:"checkbox",
            message:"Do you want another member? ",
            name:"answer",
            choices:["Yes","No"]
        }
    ]).then((res) => {
        if (res.answer[0] === "Yes") {
            getPosition();
        } else {
            console.log(teamMembers);
            let file = render(teamMembers);
            console.log(file);
            console.log(outputPath);
            createFile(outputPath,file);
        }
    })
}

getPosition();




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
