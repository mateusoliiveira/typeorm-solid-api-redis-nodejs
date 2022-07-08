import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const productExist = await productsRepository.findOne(id);
    if (!productExist) throw new Error(`Product ${id} not found`);
    if (productExist.name !== name) throw new Error('Há um produto com este nome')

    return await productsRepository.save({ id, name, price, quantity })
  }
}
