import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganisationsComponent } from './organisations/organisations.component';
import { ResolverService } from './resolver.service';
import { DaysandThemeComponent } from './daysand-theme/daysand-theme.component';
import { DayThemeResolverService } from './common/resolver/day-theme-resolver.service';


const routes: Routes = [
  { path: 'daysThemes', component: DaysandThemeComponent, resolve: { resolverData: DayThemeResolverService } },
  {
    path: 'organisations', component: OrganisationsComponent, resolve: { resolverData: ResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
