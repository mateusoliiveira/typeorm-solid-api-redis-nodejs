import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
  public async findById(id: string): Promise<User | undefined> {
    return await this.findOne({
      where: { id }
    })
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({
      where: { email }
    })
  }
  public async findByName(name: string): Promise<User | undefined> {
    return await this.findOne({
      where: { name }
    })
  }

}
