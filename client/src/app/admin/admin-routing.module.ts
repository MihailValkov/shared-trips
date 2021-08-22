import { RouterModule, Routes } from "@angular/router";
import { IsAdminGuard } from "../core/guards/is-admin.guard";
import { AdminComponent } from "./admin/admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TripsComponent } from "./trips/trips.component";
import { UserProfileEditComponent } from "./user-profile-edit/user-profile-edit.component";
import { UsersComponent } from "./users/users.component";


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'panel'
    },
    {
        path: 'panel',
        component: AdminComponent,
        canActivate: [IsAdminGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    isAdmin: true
                }
            },
            {
                path: 'users',
                component: UsersComponent,
                data: {
                    isAdmin: true
                }
            },
            {
                path: 'trips',
                component: TripsComponent,
                data: {
                    isAdmin: true
                }
            },
            {
                path: 'user/:userId',
                component: UserProfileEditComponent,
                data: {
                    isAdmin: true
                }
            }
        ]
    }
];

export const AdminRoutingModule = RouterModule.forChild(routes);