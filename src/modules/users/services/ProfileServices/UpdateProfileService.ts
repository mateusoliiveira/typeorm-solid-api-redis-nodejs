import { getCustomRepository } from "typeorm";
import AppError from "../../../../shared/errors/AppError";
import User from "../../typeorm/entities/User";
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import CheckUserPassService from "../PasswordServices/CheckUserPassService";
import HashUserPassService from "../PasswordServices/HashUserPassService";


interface IRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export default class CreateUserService {
  public async execute({ id, name, email, password, old_password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const hashPass = new HashUserPassService();
    const checkPass = new CheckUserPassService();

    const user = await usersRepository.findById(id);
    if (!user) throw new AppError(`User ${id} not found`);
    const userExistEmail = await usersRepository.findByEmail(email);
    if (userExistEmail && userExistEmail.id !== id) throw new AppError(`Já existe um usuário com este email`);
    if (password && !old_password) throw new AppError(`A senha atual e a nova senha são requeridas.`);
    if (password && old_password) {
      const passChecked: boolean = await checkPass.execute({ password: old_password, userPassword: user.password });
      if (!passChecked) throw new AppError('Senha antiga incorreta')
      user.password = await hashPass.execute(password)
    }
    user.name = name
    user.email = email

    return await usersRepository.save(user)
  }
}
