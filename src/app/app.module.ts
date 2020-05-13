import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { TemplateDetailsComponent } from './components/template-details/template-details.component';
import { EditableModalComponent } from './components/editable-modal/editable-modal.component';
import { TemplateEditableDirective } from './directives/template-editable.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TemplateListComponent,
    TemplateDetailsComponent,
    TemplateEditableDirective,
    EditableModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
