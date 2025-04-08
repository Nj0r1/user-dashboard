import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-create.component.html'
})
export class UserCreateComponent {
  newUser: User = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: ''
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  };

  constructor(private userService: UserService, private router: Router) {}

  createUser(): void {
    this.userService.createUser(this.newUser).subscribe((res) => {
      alert(res.message);
      this.router.navigate(['/users']);
    });
  }
}
