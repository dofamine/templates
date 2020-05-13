import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Template } from '../models/template';
import { TemplateService } from '../services/template.service';

@Injectable({
  providedIn: 'root'
})
export class TemplatesResolverService implements Resolve<Observable<readonly Template[]>>{

  constructor(private readonly templateService: TemplateService) { }

  resolve(): Observable<readonly Template[]> {
    return this.templateService.getTemplates();
  }
}
