import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Template } from '../../models/template';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TemplateService } from '../../services/template.service';
import { ROUTES } from '../../config';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateListComponent implements OnInit {
  templates$: Observable<readonly Template[]>;

  constructor(private readonly templateService: TemplateService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.templates$ = this.templateService.templates$;
  }

  async redirectToTemplateDetails(id: number): Promise<void> {
    await this.router.navigate([ROUTES.templates, id]);
  }

  templateTrackBy(i: number, template: Template): number {
    return template.id;
  }
}
