import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TemplateService } from '../../services/template.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Template } from '../../models/template';
import { Observable } from 'rxjs';
import { finalize, first, map } from 'rxjs/operators';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateDetailsComponent implements OnInit {
  template$: Observable<Template>;
  safeTemplate$: Observable<SafeHtml>;
  activeTemplateId: number;
  isSaving: boolean = false;

  constructor(private readonly templateService: TemplateService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly sanitizer: DomSanitizer,
              private readonly cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.activeTemplateId = Number(this.activatedRoute.snapshot.params.id);
    this.initTemplateData();
  }

  onChanged(newTemplate: string) {
    this.isSaving = true;
    this.templateService.updateTemplateById(this.activeTemplateId, newTemplate).pipe(
      first(),
      finalize(() => {
        this.isSaving = false;
        this.cdRef.detectChanges();
      })
    ).subscribe();
  }

  private initTemplateData() {
    this.template$ = this.templateService.getTemplateById(this.activeTemplateId);
    this.safeTemplate$ = this.template$.pipe(
      map(({ template }) => this.sanitizer.bypassSecurityTrustHtml(template)));
  }
}
