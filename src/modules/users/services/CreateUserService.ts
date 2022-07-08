import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User | Error> {
    const usersRepository = getCustomRepository(UsersRepository);
    const verifyIfExist = await usersRepository.findByEmail(email)
    if (verifyIfExist) throw new Error('Há um usuário com este email')
    return await usersRepository.save({ name, email, password })
  }
}
