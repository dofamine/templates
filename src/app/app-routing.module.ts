import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { TemplateDetailsComponent } from './components/template-details/template-details.component';
import { TemplatesResolverService } from './resolvers/templates.resolver.service';
import { ROUTES } from './config';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTES.templates
  },
  {
    path: ROUTES.templates,
    component: TemplateListComponent,
    resolve: { templates: TemplatesResolverService }
  },
  {
    path: `${ROUTES.templates}/:id`,
    component: TemplateDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
