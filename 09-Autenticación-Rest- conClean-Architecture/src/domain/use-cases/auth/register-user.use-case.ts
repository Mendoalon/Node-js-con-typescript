import { JwtAdapter } from '../../../config';
import { RegisterUserDto } from '../../dto/auth/register-User.dto';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

interface UserToken {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}

type SingToken = (payload: Object, duration?: string) => Promise<string | null>;


interface RegisterUserUserCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}


export class RegisterUser implements RegisterUserUserCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly singToken: SingToken = JwtAdapter.generateToken,
    ) { }

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {

        //Crear usuario
        const user = await this.authRepository.register(registerUserDto);

        //Token
        const token = await this.singToken({ id: user.id }, '2h');

        if (!token) throw CustomError.internalServer('Error generating token');

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }

    }

}