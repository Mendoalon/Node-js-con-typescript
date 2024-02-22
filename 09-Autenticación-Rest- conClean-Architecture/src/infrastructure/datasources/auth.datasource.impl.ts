import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";


type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ) { }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;

        try {

            // 1 verificar si el usuario existe.
            const user = await UserModel.findOne({ email });
            if (!user) throw CustomError.banRequest('Credentials not found');

            const isMatching = this.comparePassword(password, user.password);

            if (!isMatching) throw CustomError.banRequest('Credentials not found');


            //3. Maperar la respuesta a nuestra entidad.
            return UserMapper.userEntityFromObject(user);


        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }

    }


    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;

        try {

            // 1 verificar si el correo existe.
            const exitEmail = await UserModel.findOne({ email });
            if (exitEmail) throw CustomError.banRequest('User already registered');

            // 2. Hash de contraseña
            const user = await UserModel.create({ name, email, password: this.hashPassword(password) });

            await user.save();

            //3. Maperar la respuesta a nuestra entidad.
            return UserMapper.userEntityFromObject(user);


        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }


}