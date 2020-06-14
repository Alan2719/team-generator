const Employee = require("./Employee");

class Manager extends Employee {
    constructor(_name,_id,_email,_phoneNumber){
        super(_name,_id,_email)
        this.phoneNumber = _phoneNumber;
    }

    getOfficeNumber() {
        return this.phoneNumber;
    }

    getRole() {
        return "Manager";
    }
}

module.exports = Manager;