import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from '../dto/auth/register-User.dto';
import { LoginUserDto } from "../dto/auth/login-user.dto";

export abstract class AuthRepository {



    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>  

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>

}