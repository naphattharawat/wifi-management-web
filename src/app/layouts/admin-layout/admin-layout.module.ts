import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './../../service/auth-guard.service';
import { AlertService } from './../../service/alert.service';
import { MemberService } from './../../service/member.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UsersComponent } from '../../users/users.component';
// import { TypographyComponent } from '../../typography/typography.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { LoginService } from 'app/service/login.service';
import { DashboardService } from 'app/service/dashboard.service';
import { DateThPipe } from 'app/date-th.pipe';
import { UserAdminComponent } from 'app/user-admin/user-admin.component';
import { UserService } from 'app/service/users.service';
import { UserAdminEditComponent } from 'app/user-admin-edit/user-admin-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    UserAdminEditComponent,
    UsersComponent,
    // TypographyComponent,
    NotificationsComponent,
    DateThPipe,
    UserAdminComponent
  ],
  providers: [
    MemberService,
    AlertService,
    DashboardService,
    UserService
  ]
})

export class AdminLayoutModule { }
