import { Request, Response } from "express";
import ListProductService from '../services/ListProductService'
import ShowProductService from '../services/ShowProductService'
import CreateProductService from '../services/CreateProductService'
import UpdateProductService from '../services/UpdateProductService'
import DeleteProductService from '../services/ShowProductService'

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService();
    return response.json(await listProducts.execute());
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listProducts = new ShowProductService();
    return response.json(await listProducts.execute({ id }));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const listProducts = new CreateProductService();
    return response.status(201).json(await listProducts.execute({ ...request.body }));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listProducts = new UpdateProductService();
    return response.status(201).json(await listProducts.execute({ id, ...request.body }));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listProducts = new DeleteProductService();
    return response.json(await listProducts.execute({ id }));
  }
}
