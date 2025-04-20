import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async seedInitialData(): Promise<void> {
    const count = await this.usersRepository.count();
    
    if (count === 0) {
      // Only seed if no users exist
      const users = [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'janedoe@example.com',
        },
      ];
      
      await this.usersRepository.save(users);
    }
  }
}