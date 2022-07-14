import { getCustomRepository } from "typeorm";
import AppError from "../../../../shared/errors/AppError";
import User from "../../typeorm/entities/User";
import UsersRepository from "../../typeorm/repositories/UsersRepository";

interface IRequest {
  id: string;
}

export default class ShowUserService {
  public async execute({ id }: IRequest): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);
    const product = usersRepository.findOne(id);
    if (!product) throw new AppError(`User ${id} not found`);
    return product
  }
}
