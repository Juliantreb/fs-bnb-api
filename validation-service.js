class ValidationService {
    constructor() {}

    validateEmail(email) {
        return true;
    }
}

module.exports = ValidationService;

//If you want to export an instance
// var ValidationServ = new ValidationService();
// module.exports = ValidationServ;