import { getCustomRepository } from "typeorm";
import AppError from "../../../../shared/errors/AppError";
import Customer from "../../typeorm/entities/Customer";
import CustomersRepository from "../../typeorm/repositories/CustomersRepository";

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer | Error> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const verifyIfExist = await customersRepository.findByEmail(email)
    if (verifyIfExist) throw new AppError('Há um cliente com este email')
    return await customersRepository.save({ name, email })
  }
}
