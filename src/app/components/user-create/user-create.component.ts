import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  // Define the reactive form
  newUserForm!: FormGroup;

  // Variable to hold a success message upon form submission.
  successMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    // Initialize the reactive form with form controls and validators.
    // Name and Email are required; Email must be in a valid email format.
    // Phone is required and must be at least 10 digits.
    // Address and Company details are optional.
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      address: this.fb.group({
        street: [''],
        suite: [''],
        city: [''],
        zipcode: ['']
      }),
      company: this.fb.group({
        name: [''],
        catchPhrase: [''],
        bs: ['']
      })
    });
  }

  ngOnInit(): void {
    // Additional initialization logic can go here if needed.
  }

  /**
   * Handles the form submission.
   * If the form is valid, log the form data to the console,
   * call the createUser() method in UserService, and display a success message.
   * Otherwise, mark all controls as touched to show validation errors.
   */
  createUser(): void {
    if (this.newUserForm.valid) {
      console.log("New User Data:", this.newUserForm.value);
      this.userService.createUser(this.newUserForm.value).subscribe({
        next: (res: { message: string }) => {
          this.successMessage = res.message;
          // Optionally, navigate to the users listing page
          // this.router.navigate(['/users']);
          // Reset the form after submission
          this.newUserForm.reset();
        },
        error: (err) => {
          console.error("Error creating user:", err);
        }
      });
    } else {
      // Mark all controls as touched to trigger validation messages
      this.newUserForm.markAllAsTouched();
    }
  }
}
