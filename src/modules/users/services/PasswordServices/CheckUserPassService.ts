import { compare } from "bcrypt";

interface IRequest {
  password: string;
  userPassword: string;
}

export default class CheckUserPassService {
  public async execute(payload: IRequest): Promise<boolean> {
    return await compare(payload.password, payload.userPassword)
  }
}
