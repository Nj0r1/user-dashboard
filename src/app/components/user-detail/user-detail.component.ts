import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html' 
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(id).subscribe((user) => {
      this.user = user;
    });
  }
}
