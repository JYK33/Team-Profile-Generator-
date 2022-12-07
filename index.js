
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const employees = [];
// const position = employees.role

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
// function newEmployee(){
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
            fs.writeFileSync('./index.html')
        }

        