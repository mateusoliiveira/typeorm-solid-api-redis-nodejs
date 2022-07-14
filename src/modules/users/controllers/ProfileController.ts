import { Request, Response } from "express";
import UpdateProfileService from '../services/ProfileServices/UpdateProfileService'

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    return response.json({ user: request.user.id });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfile = new UpdateProfileService();
    return response.json(await updateProfile.execute({ id: request.user.id, ...request.body }));
  }
}
