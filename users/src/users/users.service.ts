import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  private users: User[] = [
    {id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', bio: 'I am John Doe'},
    {id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', bio: 'I am Jane Doe'},
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
    const user = {
      id: this.currentId++,
      ...createUserInput
    }
    this.users.push(user)
    return user
  }

  updateUser(id: number, updateUserInput: UpdateUserInput): User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserInput
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
