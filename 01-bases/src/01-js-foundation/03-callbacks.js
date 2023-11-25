const users = [

    { id: 1, name: 'Luis Mejia' },
    { id: 2, name: 'Pacho tino' },
];

function getUserById(id, callback) {
    const user = users.find( function(user){
        return user.id === id;
    });

    if (!user) {
        return callback(`Usuario no encontrado con el id: ${id}`);
    }

    return callback(null, user);
}


module.exports = {
    getUserById
};