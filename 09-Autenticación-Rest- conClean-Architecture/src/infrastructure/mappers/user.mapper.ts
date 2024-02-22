import { CustomError, UserEntity } from "../../domain";

export class UserMapper {

    static userEntityFromObject(object: { [key: string]: any }) {

        const { id, _id, name, email, password, roles } = object;  
                

        if (!_id || !id) {
            throw CustomError.banRequest('Missing id');
        }

        if (!name) throw CustomError.banRequest('Missing name');

        if (!email) throw CustomError.banRequest('Missing email');

        if (!password) throw CustomError.banRequest('Missing password');

        if (!roles) throw CustomError.banRequest('Missing role');

        return new UserEntity(id || _id, name, email, password, roles);
    }

}