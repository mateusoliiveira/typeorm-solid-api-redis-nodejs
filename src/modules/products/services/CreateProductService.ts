import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product | Error> {
    const productsRepository = getCustomRepository(ProductRepository);
    const verifyIfExist = await productsRepository.findByName(name)
    if (verifyIfExist) throw new Error('Há um produto com este nome')
    return await productsRepository.save({ name, price, quantity })
  }
}
