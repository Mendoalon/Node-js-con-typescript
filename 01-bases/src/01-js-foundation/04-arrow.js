const users = [

    { id: 1, name: 'Luis Mejia' },
    { id: 2, name: 'Pacho tino' },
];

const getUserById = (id, callback) => {

    const user = users.find(user => user.id === id);

    (user) ? callback(null, user)
           : callback(`Usuario no encontrado con el id: ${id}`);

};


module.exports = {
    getUserById
};