const getAgePlugin = require('get-age');

const getAge = (birthdate) => {

    if ( !birthdate ) {
        return new Error('birthdate is requiered');
    }

    return getAgePlugin(birthdate);
}

module.exports = {
    getAge
}