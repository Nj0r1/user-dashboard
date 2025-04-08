import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '../../services/user.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  searchTerm: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  filteredUsers(): User[] {
    if (!this.searchTerm) {
      return this.users;
    }
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        // Refresh the user list
        this.users = this.users.filter((user) => user.id !== id);
      });
    }
  }

  viewDetails(id: number): void {
    this.router.navigate(['/users', id]);
  }

  goToCreate(): void {
    this.router.navigate(['/users/create']);
  }

  /**
   * Navigates to the edit page for the selected user.
   * @param user The user object to edit.
   */
  editUser(user: User): void {
    // Navigate to the edit user route with the user ID as a parameter.
    this.router.navigate(['/edit', user.id]);
  }

}
