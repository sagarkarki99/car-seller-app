import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRoles } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string, type?: string) {
    const role = getUserRole(type);
    const user = this.repo.create({ email, password, role });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async find(email: string) {
    const users = await this.repo.findBy({ email });

    return users;
  }

  async update(id: number, attr: Partial<User>) {
    const user = await this.getUser(id);
    Object.assign(user, attr);
    return this.repo.save(user);
  }

  async delete(id: number) {
    const user = await this.getUser(id);

    return this.repo.remove(user);
  }

  private async getUser(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      //Bad approach because this exception is specific to framework.
      throw new NotFoundException('User not found!');
    }
    return user;
  }
}
function getUserRole(type?: string): UserRoles {
  if (type === 'admin') {
    return UserRoles.admin;
  }
  return UserRoles.normal;
}
