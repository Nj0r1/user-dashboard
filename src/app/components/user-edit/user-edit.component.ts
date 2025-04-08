import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../../services/user.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.html']
})
export class UserEditComponent implements OnInit {
  // The user being edited
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,  // To retrieve route parameters (e.g., user id)
    private router: Router,         // To navigate after updating
    private userService: UserService // Service to handle user data operations
  ) {}

  ngOnInit(): void {
    // Get the user id from the route parameters
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Retrieve the user by id using the UserService
    this.userService.getUserById(id).subscribe((user) => {
      if (user) {
        // Clone the user data (to avoid modifying the original object immediately)
        this.user = { ...user };
      } else {
        alert('User not found.');
        this.router.navigate(['/']);
      }
    });
  }

  /**
   * Submits the updated user data.
   */
  updateUser(): void {
    if (this.user) {
      this.userService.updateUser(this.user).subscribe((res) => {
        alert(res.message);
        // After updating, navigate back to the main dashboard (or user list)
        this.router.navigate(['/']);
      });
    }
  }
}
