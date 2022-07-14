import { Request, Response } from "express";
import UpdateAvatarUserService from '../services/UserServices/UpdateAvatarUserService'

export default class MediaController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateAvatarUserService();
    return response.status(201).json(await updateAvatar.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename
    }));
  }
}
