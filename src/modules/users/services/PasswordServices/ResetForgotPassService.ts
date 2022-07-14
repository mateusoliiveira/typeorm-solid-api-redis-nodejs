import { getCustomRepository } from "typeorm";
import AppError from "../../../../shared/errors/AppError";
import User from "../../typeorm/entities/User";
import UserToken from "../../typeorm/entities/UserToken";
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../../typeorm/repositories/UserTokensRepository";
import HashUserPassService from './HashUserPassService';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetForgotPassService {
  public async execute({ token, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const hashPass = new HashUserPassService();

    const recoveryToken: UserToken | undefined = await userTokensRepository.findByToken(token)
    if (!recoveryToken) throw new AppError('Token para mudança de senha não existe')

    const user = await usersRepository.findById(recoveryToken.user_id)
    if (!user) throw new AppError('Usuário não existe')

    const actualDate = new Date().getTime() - new Date(recoveryToken.created_at).getTime()
    if (actualDate > 720000) throw new AppError('Token de recuperação expirado, faça uma nova requisição.')

    user.password = await hashPass.execute(password)
    return await usersRepository.save(user)

  }
}
