import { Request, Response } from "express";
import ResetForgotPassService from "../services/PasswordServices/ResetForgotPassService";

export default class ResetPassController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    const resetPassword = new ResetForgotPassService();
    await resetPassword.execute({ password, token });
    return response.status(204).json()
  }
}
