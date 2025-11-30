import { Injectable, ConflictException } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  private users: User[] = [
    {id: 1, uuid: '32d82afa-9609-4691-b268-4c42f07dec8f', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', bio: 'I am John Doe', createdAt: new Date(), updatedAt: new Date()},
    {id: 2, uuid: '7dab3516-e964-43d3-a8fb-fbcee20d1ac4', firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', bio: 'I am Jane Doe', createdAt: new Date(), updatedAt: new Date()},
  ]
  
  private currentId = 3;

  findAll(): User[] {
    return this.users
  }

  findOne(id: number): User {
    const user = this.users.find(user => user.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  findByEmail(email: string): User {
    const user = this.users.find(user => user.email === email)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  createUser(createUserInput: CreateUserInput): User {
    const existingUser = this.users.find(user => user.email === createUserInput.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    const user = {
      id: this.currentId++,
      ...createUserInput,
      uuid: randomUUID() as UUID,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.users.push(user)
    return user
  }

  updateUser(id: number, updateUserInput: UpdateUserInput): User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    if (updateUserInput.email) {
      const existingUser = this.users.find(user => user.email === updateUserInput.email && user.id !== id);
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }
    }
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserInput,
      updatedAt: new Date(),
    }
    return this.users[userIndex]
  }

  deleteUser(id: number): User {
    const user = this.findOne(id)
    if (!user) {
      throw new Error('User not found')
    }
    this.users = this.users.filter(user => user.id !== id)
    return user
  }
}


