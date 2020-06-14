// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Engineer extends Employee {
    constructor(_name,_id,_email,user) {
        super(_name,_id,_email);
        this.GithubUser = user;
    }

    getGithub() {
        return this.GithubUser;
    }

    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;