import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TEMPLATES } from './templates.mock';
import { Template } from '../models/template';
import { delay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private _templates: readonly Template[] = [];
  private readonly templatesStore$: BehaviorSubject<readonly Template[]> =
    new BehaviorSubject<readonly Template[]>(this._templates);

  get templates$(): Observable<readonly Template[]> {
    return this.templatesStore$.asObservable();
  }

  private set _templates$(templates: readonly Template[]) {
    this._templates = templates;
    this.templatesStore$.next(this._templates);
  }

  getTemplates(): Observable<readonly Template[]> {
    return of(TEMPLATES).pipe(tap((data => this._templates$ = data)));
  }

  getTemplateById(id: number): Observable<Template> {
    return this.templates$.pipe(map(templates => templates.find(({ id: tId }) => tId === id)));
  }

  updateTemplateById(id: number, template: string): Observable<boolean> {
    const templateToUpdate = this._templates.find(({ id: tId }) => tId === id);
    Object.assign(templateToUpdate, { template, modified: Date.now() });
    this._templates$ = this._templates;

    return of(true).pipe(delay(1000));
  }
}
