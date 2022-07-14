import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

export default class SendEmailForgotPassService {
  public async execute(email: string): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user: User | undefined = await usersRepository.findByEmail(email)
    if (!user) throw new AppError('Usuário não existe')

    const token = await userTokensRepository.generate(user.id)
    console.log(token)
  }
}
