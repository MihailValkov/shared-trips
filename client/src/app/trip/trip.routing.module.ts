import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { IsOwnerGuard } from "../core/guards/is-owner.guard";
import { CreateComponent } from "./create/create.component";
import { DetailComponent } from "./detail/detail.component";
import { EditComponent } from "./edit/edit.component";
import { SharedTripsComponent } from "./shared-trips/shared-trips.component";

const routes: Routes = [
    {
        path: 'list',
        component: SharedTripsComponent,
    },
    {
        path: 'detail/:tripId',
        component: DetailComponent,
    },
    {
        path: 'create',
        component: CreateComponent,
        data: { isLogged: true }
    },
    {
        path: 'edit/:tripId',
        component: EditComponent,
        canActivate: [IsOwnerGuard],
        data: { isLogged: true }
    },
];

export const TripRoutingModule = RouterModule.forChild(routes);