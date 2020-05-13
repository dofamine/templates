import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-editable-modal',
  templateUrl: './editable-modal.component.html',
  styleUrls: ['./editable-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableModalComponent {
  @Input() text: string;
  @Input() fontSize: number;
  @Input() onComplete: (text: string, fontSize: number) => void;
}
