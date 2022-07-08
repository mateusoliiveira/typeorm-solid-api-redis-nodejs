import { Request, Response } from "express";
import ListUserService from '../services/ListUserService'
import ShowUserService from '../services/ShowUserService'
import CreateUserService from '../services/CreateUserService'
import UpdateUserService from '../services/UpdateUserService'
import DeleteUserService from '../services/ShowUserService'

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();
    return response.json(await listUsers.execute());
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showUsers = new ShowUserService();
    return response.json(await showUsers.execute({ id }));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createUsers = new CreateUserService();
    return response.status(201).json(await createUsers.execute({ ...request.body }));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const updateUsers = new UpdateUserService();
    return response.status(201).json(await updateUsers.execute({ id, ...request.body }));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUsers = new DeleteUserService();
    return response.json(await deleteUsers.execute({ id }));
  }
}
