import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormEditor } from '@bpmn-io/form-js-editor';
import { RangeRendererExtension } from './render/range.renderer';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterContentInit, OnInit {
  private formEditor: FormEditor = new FormEditor({
    additionalModules: [RangeRendererExtension]
  });
  schema = {
    "components": [
      {
        "text": "# Task E100",
        "label": "Text view",
        "type": "text",
        "layout": {
          "row": "Row_1bzdjs3",
          "columns": null
        },
        "id": "Field_00k6rke"
      },
      {
        "label": "Checkbox 1",
        "type": "checkbox",
        "layout": {
          "row": "Row_1bqq65m",
          "columns": null
        },
        "id": "Field_16qflnd",
        "key": "checkbox_rk4n6"
      },
      {
        "label": "Checkbox 2",
        "type": "checkbox",
        "layout": {
          "row": "Row_0km76tj",
          "columns": null
        },
        "id": "Field_0evjn73",
        "key": "checkbox_e51bhs"
      },
      {
        "label": "Checkbox 3",
        "type": "checkbox",
        "layout": {
          "row": "Row_0g3c652",
          "columns": null
        },
        "id": "Field_1xdu2pt",
        "key": "checkbox_8tth9b"
      },
    ],
    "type": "default",
    "id": "Form_1t58cgp",
    "exporter": {
      "name": "form-js (https://demo.bpmn.io)",
      "version": "1.8.3"
    },
    "schemaVersion": 16
  }
  

  @ViewChild('editor', { static: true }) private formEditorRef!: ElementRef;

  ngOnInit(): void {
    this.formEditor.importSchema(this.schema).then(warnings => {
      console.log(warnings)
    })
  }

  ngAfterContentInit(): void {
    this.formEditor.attachTo(this.formEditorRef.nativeElement);
  }
}
