
import { JwtAdapter, BcryptAdapter  } from '../../config';
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {
    private readonly bcryptAdapter: BcryptAdapter;

    // DI
    constructor(bcryptAdapter: BcryptAdapter) {
        this.bcryptAdapter = bcryptAdapter;
      }


    public async registerUser(registerUserDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if (existUser) throw CustomError.badRequest('Email already exist');

        try {
            const user = new UserModel(registerUserDto);

            // Encriptar la contraseña
            user.password = this.bcryptAdapter.hashPassword(registerUserDto.password);

            await user.save();
            // JWT <---- para mantener la autenticación del usuario

            const { password, ...userEntity } = UserEntity.fromObject(user);


            return {
                user: userEntity,
                token: 'ABC'
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async loginUser(loginUserDto: LoginUserDto) {

        const user = await UserModel.findOne({ email: loginUserDto.email });

        if (!user) throw CustomError.badRequest('User not register');
        const hasMatching = this.bcryptAdapter.comparePassword(loginUserDto.password, user.password);

        if (!hasMatching) throw CustomError.badRequest('Date is not valid');


        const { password, ...userEntity } = UserEntity.fromObject(user);

        const token = await JwtAdapter.generateToken({ id: user.id, email: user.email});
        if (!token) throw CustomError.internalServer('Error while generating JWT');

        return {
            user: userEntity,
            token: token,
        }

    }


}
