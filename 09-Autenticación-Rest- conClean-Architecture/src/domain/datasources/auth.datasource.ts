import { UserEntity } from "../entities/user.entity";
import { LoginUserDto } from "../dto/auth/login-user.dto";
import { RegisterUserDto } from '../dto/auth/register-User.dto';



export abstract class AuthDatasource {

    //todo:
    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>

}