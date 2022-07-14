import { getCustomRepository } from "typeorm";
import EtherealMail from "../../../../config/mail/EtherealMail";
import AppError from "../../../../shared/errors/AppError";
import User from "../../typeorm/entities/User";
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../../typeorm/repositories/UserTokensRepository";

export default class SendEmailForgotPassService {
  public async execute(email: string): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    console.log(email)

    const user: User | undefined = await usersRepository.findByEmail(email)
    if (!user) throw new AppError('Usuário não existe')

    const token = await userTokensRepository.generate(user.id)

    await EtherealMail.sendMail({
      to: email,
      body: `<a href='http://localhost:3333/password/reset/${token?.token}'>esqueceu sua senha? clique aqui para trocar sua senha</a>`
    })
  }
}
