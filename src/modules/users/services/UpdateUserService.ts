import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class CreateUserService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExist = await usersRepository.findOne(id);
    if (!userExist) throw new Error(`User ${id} not found`);
    if (userExist.name !== name) throw new Error('Há um produto com este nome')

    return await usersRepository.save({ id, name, price, quantity })
  }
}
