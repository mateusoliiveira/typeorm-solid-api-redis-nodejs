import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import CheckUserPassService from "./CheckUserPassService";
import { sign } from 'jsonwebtoken'
import authConfig from '../../../config/auth'

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user: User | undefined = await usersRepository.findByEmail(email)
    if (!user) throw new AppError('Usuário não encontrado', 401)

    const checkPass = new CheckUserPassService();
    const passChecked: boolean = await checkPass.execute({ password, userPassword: user.password });
    if (!passChecked) throw new AppError('Senha incorreta', 401)

    const token: string = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    })

    console.log(token)

    return { user, token };
  }
}
