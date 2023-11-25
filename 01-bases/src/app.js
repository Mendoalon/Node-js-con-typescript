// const { getUUID, getAge } = require('./plugins');

// const { emailTemplate } = require('./js-foundation/01-template');
// require('./js-foundation/02.destructuring');
// const { getUserById }= require('./js-foundation/03-callbacks');
// const { getUserById }= require('./js-foundation/04-arrow');
// const { buildMakePerson } = require('./js-foundation/05-factory');

/*factory funcion*/
//  const makePerson =  buildMakePerson({ getUUID, getAge });
//  const obj = {name: 'Jonh', birthdate: '1985-10-21'}; 
//  const john = makePerson(obj);
// console.log({john});

const getPokemonById = require('./js-foundation/06-promeses');

getPokemonById(2)
    .then( (pokemon) => console.log({pokemon}) )
    .catch( (err) => console.log('Por favor intente de nuevo.') )
    .finally( ()=> console.log('Finalmente'))


