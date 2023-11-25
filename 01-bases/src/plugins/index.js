const { getUUID } = require('./get-uuid.plugin');
const { getAge } = require('./get-age.plugin');
const { httpClient } = require('./http-client.plugin');
module.exports ={
    getUUID,
    getAge,
    httpClient
}