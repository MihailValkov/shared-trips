import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { LoginComponent } from "./login/login.component";
import { EditProfileComponent } from "./profile/edit-profile/edit-profile.component";
import { MyTripsComponent } from "./profile/my-trips/my-trips.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            isLogged: false
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            isLogged: false
        }
    },
    {
        path: 'profile',
        component: ProfileComponent,
        data: {
            isLogged: true
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'my-trips',
            },
            {
                path: 'my-trips',
                component: MyTripsComponent
            },
            {
                path: 'edit-profile',
                component: EditProfileComponent
            },
        ]
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);