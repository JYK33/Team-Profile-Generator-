
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const employees = [];
// const position = employees.role

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
function newEmployee(){
    inquirer.prompt([
    {
       type: 'list',
    message:'What position is this employee?',
    name: 'position',
    choices: [
        'Manager',
        'Engineer',
        'Intern',
        ]
    },

    {
        type: 'input',
        message: 'what is the name of the employee?',
        name: 'name',
    },

    {
        type: 'input',
        message: 'what is the id of the employee?',
        name: 'id',
    },
   
    {
       type: 'input',
       message: 'what is the email of the employee?',
       name: 'email',
    },
    
]).then(({ position, name, id, email }) => {
    switch (position) {
        case 'Manager':
            // what is officeNumber
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the office number?',
                    name: 'officeNumber',
                }
            ]).then(({ officeNumber }) => {
                employees.push (new Manager(
                    name,
                    id,
                    email,
                    officeNumber,
                    ))
                    otherEmployee()
                })
                break;
        case 'Engineer':
        // what is their github 
            inquirer.prompt([
                {
                    type: 'input',
                    message: "What is the Engineer's github user ID?",
                    name: 'github',
                }
            ]).then(({ github }) => {
                employees.push (new Engineer(
                    name,
                    id,
                    email,
                    github,
                    ))
                    otherEmployee()
                });
                break;
                
        case 'Intern':
                    // what school 
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What school doess the intern attend?',
                    name: 'school',
                }
            ]).then(({ school }) => {
                employees.push (new Intern(
                    name,
                    id,
                    email,
                    school,
                    ))
                    otherEmployee()
                });
                break;
                default :
                // uh oh
            }  
        })
    
}        
function otherEmployee(){
    return inquirer.prompt([
        {
            type: 'confirm',
            message: 'Do you want to add more employees?',
            name: 'otherEmployee',
        }
        ]).then(({ otherEmployee }) => {
            if (otherEmployee) newEmployee()
            else renderHTMLFile();
        })
        }

// Function to write the html file
function renderHTMLFile() {
    fs.writeFileSync('./index.html', /*html*/`

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title> Our Team </title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    </head>
    
    <div class="jumbotron" style="text-align: center; border-bottom: 5px solid black; background : skyblue; color:black; text-align:center; " id="jumbotron">
     <h1 class= "display-4" style="font-weight:bolder">Meet The Team!</h1>
     <h1><i class="fa fa-users" style="font-size:60px"></i></h1>
    </div>
    <div class="container">
    <div class="row">

        
    ${employees.map(employees => `
    <div class="col-md-3 text-dark" style = "margin : 5px; padding: 0; text-align: center; background-color: wheat; border-radius: 3px; border-color: black; border-style: solid;">
     <header style = "background : lightblue">
      <h1>${employees.getRole()}</h1>
     </header>
      <h5> Name: ${employees.getName()}</h5><br>
      <h5> ID Number: ${employees.getId()}</h5><br>
      <h5> E-Mail: ${employees.getEmail()}</h5><br>
      ${roleInfo(employees)}
    </div>
    `)}
    </div>
    </div>      
`)
}
// function to get specific information about specific role
function roleInfo(employees) {
    switch (employees.getRole()) {
        // getting the office number
        case "Manager":
        return `<h5> Office Number: ${employees.getOfficeNumber()}</h5>`
        break;
        // getting the github username 
        case "Engineer":
        return `<h5><a href ="https://www.github.com/${employees.getGithub()}"> GitHub</a></h5>`
        break;
        // getting the school name 
        case "Intern":
        return `<h5> School: ${employees.getSchool()}</h5>`
        break;
    }
}

newEmployee();
        