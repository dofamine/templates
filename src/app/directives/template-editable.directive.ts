import {
  ComponentFactoryResolver, ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { EditableModalComponent } from '../components/editable-modal/editable-modal.component';
import { ALLOW_EDIT_CLASS_NAME } from '../config';

@Directive({
  selector: '[appTemplateEditable]'
})
export class TemplateEditableDirective {
  @Output() onChanged: EventEmitter<string> = new EventEmitter<string>();
  private selectedElement: HTMLElement = null;

  constructor(private readonly elementRef: ElementRef,
              private readonly renderer2: Renderer2,
              private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly containerRef: ViewContainerRef) {
  }

  @HostListener('click', ['$event']) onSelect({ target }: Event) {
    if (!(<HTMLElement> target).classList.contains(ALLOW_EDIT_CLASS_NAME)) return;

    this.selectedElement = (<HTMLElement> target);
    const modal = this.createModal();
    this.initModalComponentData(modal);
  }

  private createModal(): ComponentRef<EditableModalComponent> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(EditableModalComponent);
    this.containerRef.clear();
    return this.containerRef.createComponent(componentFactory);
  }

  private initModalComponentData(componentRef: ComponentRef<EditableModalComponent>) {
    if (!this.selectedElement) return;

    const text = this.selectedElement.innerText;
    const fontSize = parseFloat(getComputedStyle(this.selectedElement).fontSize);

    componentRef.instance.text = text;
    componentRef.instance.fontSize = fontSize;
    componentRef.instance.onComplete = this.setStyles.bind(this);
  }

  private setStyles(text: string, fs: number) {
    this.renderer2.setStyle(this.selectedElement, 'font-size', fs + 'px');
    this.renderer2.setProperty(this.selectedElement, 'innerText', text);
    this.clearData();
    this.emitUpdatedTemplate();
  }

  private clearData() {
    this.containerRef.clear();
    this.selectedElement = null;
  }

  private emitUpdatedTemplate() {
    this.onChanged.emit(this.elementRef.nativeElement.innerHTML);
  }
}
