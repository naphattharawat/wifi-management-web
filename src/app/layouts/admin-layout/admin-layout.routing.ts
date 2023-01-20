import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UsersComponent } from '../../users/users.component';
// import { TypographyComponent } from '../../typography/typography.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AuthGuardService } from './../../service/auth-guard.service';

export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', canActivate: [AuthGuardService], component: DashboardComponent },
    { path: 'user-profile', canActivate: [AuthGuardService], component: UserProfileComponent },
    { path: 'users', canActivate: [AuthGuardService], component: UsersComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
];
