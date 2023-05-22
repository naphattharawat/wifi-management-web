import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UsersComponent } from '../../users/users.component';
// import { TypographyComponent } from '../../typography/typography.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AuthGuardService } from './../../service/auth-guard.service';
import { UserAdminComponent } from 'app/user-admin/user-admin.component';
import { UserAdminEditComponent } from 'app/user-admin-edit/user-admin-edit.component';
import { Component } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout.component';

export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
    {
        path: '', component: AdminLayoutComponent, children: [
            { path: 'admin-dashboard', canActivate: [AuthGuardService], component: DashboardComponent },
            { path: 'admin-user-profile', canActivate: [AuthGuardService], component: UserProfileComponent },
            { path: 'admin-users', canActivate: [AuthGuardService], component: UsersComponent },
            { path: 'admin-users-admin', canActivate: [AuthGuardService], component: UserAdminComponent },
            { path: 'admin-users-admin-edit', canActivate: [AuthGuardService], component: UserAdminEditComponent },
            // { path: 'typography',    canActivate:[AuthGuardService], component: TypographyComponent },
            // { path: 'icons',         canActivate:[AuthGuardService], component: IconsComponent },
            // { path: 'maps',          canActivate:[AuthGuardService], component: MapsComponent },
            { path: 'admin-notifications', canActivate: [AuthGuardService], component: NotificationsComponent },
        ]
    }


];
