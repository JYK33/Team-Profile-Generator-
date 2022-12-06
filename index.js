
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const employee = [];
const position = employee.role

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
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
   
]).then(({ position })) => {
  switch (position) {
    case 'Manager':
        // what is officeNumber
    case 'Intern':
        // what school 
    case 'Engineer':
        // what is their github 
    default :
        // uh oh
  }  
}