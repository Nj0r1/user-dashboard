import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component'; 
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/create', component: UserCreateComponent },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    data: {
      getPrerenderParams: () => {
        return [
          { id: '1' },
          { id: '2' },
          { id: '3' },
          { id: '4' },
          { id: '5' }
        ];
      }
    }
  },
  { path: 'edit/:id', component: UserEditComponent },
  { path: '**', redirectTo: 'users' }
];