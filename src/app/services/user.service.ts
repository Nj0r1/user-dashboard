import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Interface representing a user.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/**
 * UserService provides methods for managing users using mock data.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // In-memory mock data for users
  private users: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      phone: '1-770-736-8031 x56442',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874'
      },
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
      }
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      phone: '010-692-6593 x09125',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771'
      },
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains'
      }
    }
    // ... add more users as needed
  ];

  /**
   * Returns all users.
   */
  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  /**
   * Retrieves a user by ID.
   * @param id The user's ID.
   */
  getUserById(id: number): Observable<User | undefined> {
    return of(this.users.find(user => user.id === id));
  }

  /**
   * Creates a new user.
   * @param user The user object to create.
   */
  createUser(user: User): Observable<{ message: string }> {
    // For simplicity, assign a new ID based on the max current ID + 1.
    user.id = Math.max(...this.users.map(u => u.id)) + 1;
    this.users.push(user);
    return of({ message: 'User created successfully.' });
  }

  /**
   * Deletes a user by ID.
   * @param id The user's ID.
   */
  deleteUser(id: number): Observable<boolean> {
    this.users = this.users.filter(user => user.id !== id);
    return of(true);
  }

  /**
   * Updates an existing user.
   * @param updatedUser The updated user object.
   * @returns An observable with a response message.
   */
  updateUser(updatedUser: User): Observable<{ message: string }> {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      return of({ message: 'User updated successfully.' });
    }
    return of({ message: 'User not found.' });
  }
}

