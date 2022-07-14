import { getCustomRepository } from "typeorm";
import AppError from "../../../../shared/errors/AppError";
import Customer from "../../typeorm/entities/Customer";
import CustomersRepository from "../../typeorm/repositories/CustomersRepository";


interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);
    if (!customer) throw new AppError(`Cliente ${id} não encontrado`);
    const customerExistEmail = await customersRepository.findByEmail(email);
    if (customerExistEmail && customerExistEmail.id !== id) throw new AppError(`Já existe um cliente com este email`);
    customer.name = name
    customer.email = email

    return await customersRepository.save(customer)
  }
}
