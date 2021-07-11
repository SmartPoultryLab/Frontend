import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {Clinical_Signs, Diagnoses, ExaminationData, PM_Lesions} from "./examination";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
@Component({
  selector: 'app-inspection-examination',
  templateUrl: './inspection-examination.component.html',
  styleUrls: ['./inspection-examination.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => InspectionExaminationComponent),
    }
  ],
})


export class InspectionExaminationComponent implements OnInit {
  readonly Clinical_Signs_Data = Clinical_Signs;
  readonly Diganoses_Data = Diagnoses;
  readonly PM_Lesions_Data = PM_Lesions;
  public exam_data:ExaminationData = <ExaminationData>{};
  @Input() ExamData:ExaminationData = <ExaminationData>{};
  @Output() onDataChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.exam_data = this.ExamData;
  }

  Clinical_Changed(data:string[]){
    this.exam_data.Clinical_Signs = data
    this.onDataChanged.emit(this.exam_data);
  }
  Diganoses_Changed(data:string[]){
    this.exam_data.Diagnoses = data
    this.onDataChanged.emit(this.exam_data);
  }
  PM_Lesions_Changed(data:string[]){
    this.exam_data.PM_Lesions = data
    this.onDataChanged.emit(this.exam_data);
  }

}
