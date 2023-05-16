import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UsersComponent } from '../../users/users.component';
// import { TypographyComponent } from '../../typography/typography.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AuthGuardService } from './../../service/auth-guard.service';
import { UserAdminComponent } from 'app/user-admin/user-admin.component';
import { UserAdminEditComponent } from 'app/user-admin-edit/user-admin-edit.component';

export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users-admin', component: UserAdminComponent },
    { path: 'users-admin-edit', component: UserAdminEditComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
];
