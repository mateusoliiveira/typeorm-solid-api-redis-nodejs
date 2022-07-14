import { Request, Response } from "express";
import SendEmailForgotPassService from '../services/PasswordServices/SendEmailForgotPassService'

export default class ForgotPassController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPassEmail = new SendEmailForgotPassService();
    await sendForgotPassEmail.execute(email)
    return response.status(204).json()
  }
}
