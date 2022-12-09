
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
        'Intern',
        'Engineer',
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
      <h2>
     </header>
      <p> Name: ${employees.getName()}</p><br>
      <p> ID Number: ${employees.getId()}</p><br>
      <p> E-Mail: ${employees.getEmail()}</p><br>
      ${roleInfo(employees)}
    </div>
    `)}
    </div>
    </div>      
`)
}
function roleInfo(employees) {
    switch (employees.getRole()) {
        // getting the 
        case "Manager":
        return `<p> Office Number: ${employees.getOfficeNumber()}</p>`
        break;
        case "Intern":
        return `<p> School: ${employees.getSchool()}</p>`
        break;
        case "Engineer":
        return `<p> GitHub: <a href ="https://www.github.com/${employees.getGithub()}"> GitHub</a></p>`
        break;
    }
}

newEmployee();
        