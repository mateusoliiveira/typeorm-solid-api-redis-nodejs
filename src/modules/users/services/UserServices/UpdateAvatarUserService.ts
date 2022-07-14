import path from "path";
import { getCustomRepository } from "typeorm";
import AppError from "../../../../shared/errors/AppError";
import User from "../../typeorm/entities/User";
import UsersRepository from "../../typeorm/repositories/UsersRepository";
import uploadConfig from "../../../../config/upload"
import fs from 'fs'

interface IRequest {
  userId: string;
  avatarFileName: string;
}

export default class UpdateAvatarUserService {
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(userId);
    if (!user) throw new AppError('Usuário não encontrado', 401);

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName
    return await usersRepository.save(user)
  }
}
