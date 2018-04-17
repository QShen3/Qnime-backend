class BaseController {
    constructor(){
        this.info200 = {
            code: 200,
            desc: 'OK',
        }
    }

    error400 (info) {
        let error = new Error();
        error.info = info || '';
        error.statusCode = 400;
        return error;
    }
}

module.exports = BaseController;