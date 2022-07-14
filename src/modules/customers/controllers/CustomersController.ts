import { Request, Response } from "express";
import ListCustomerService from '../services/CustomerServices/ListCustomerService'
import ShowCustomerService from '../services/CustomerServices/ShowCustomerService'
import CreateCustomerService from '../services/CustomerServices/CreateCustomerService'
import UpdateCustomerService from '../services/CustomerServices/UpdateCustomerService'
import DeleteCustomerService from '../services/CustomerServices/DeleteCustomerService'

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomerService();
    return response.json(await listCustomers.execute());
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showCustomers = new ShowCustomerService();
    return response.json(await showCustomers.execute({ id }));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createCustomers = new CreateCustomerService();
    return response.status(201).json(await createCustomers.execute({ ...request.body }));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const updateCustomers = new UpdateCustomerService();
    return response.status(201).json(await updateCustomers.execute({ id, ...request.body }));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCustomers = new DeleteCustomerService();
    return response.json(await deleteCustomers.execute({ id }));
  }
}
