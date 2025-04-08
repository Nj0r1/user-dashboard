import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { CounterService } from './counter.service';

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
 * It now integrates with CounterService so that user creation increments
 * the counter and user deletion decrements it.
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
    // Add more users as needed
  ];

  constructor(private counterService: CounterService) {
    // Optionally, initialize the counter with the current number of users
    // For example, you can set the counter's initial value to the length of the users array.
    // Note: If using a BehaviorSubject in CounterService, the initial value is set there.
  }

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
   * Creates a new user and increments the counter.
   * @param user The user object to create.
   */
  createUser(user: User): Observable<{ message: string }> {
    // Assign a new ID based on the maximum current ID + 1.
    // (If the users array is empty, default to ID 1.)
    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    user.id = newId;
    this.users.push(user);
    // Increment the counter as a new user is added.
    this.counterService.increment();
    return of({ message: 'User created successfully.' });
  }

  /**
   * Deletes a user by ID and decrements the counter.
   * @param id The user's ID.
   */
  deleteUser(id: number): Observable<boolean> {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      // Decrement the counter since a user is deleted.
      this.counterService.decrement();
      return of(true);
    }
    return of(false);
  }

  /**
   * Updates an existing user.
   * @param updatedUser The updated user object.
   */
  updateUser(updatedUser: User): Observable<{ message: string }> {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      return of({ message: 'User updated successfully.' });
    }
    return of({ message: 'User not found.' });
  }

  /**
   * Optionally, other CRUD functions can be implemented here.
   */
}


