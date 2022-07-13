import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
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
    if (!userExist) throw new AppError(`User ${id} not found`);
    if (userExist.name !== name) throw new AppError('Há um produto com este nome')

    return await usersRepository.save({ id, name, price, quantity })
  }
}
