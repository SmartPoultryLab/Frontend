import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  ElementRef
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlName
} from "@angular/forms";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import {Inspection, MeasuredData, Units,Unit} from "./inspection";
import { InspectionService } from "./inspection.service";
import { map } from 'rxjs/operators';
import { NumberValidators } from "../../shared/number.validator";
import { GenericValidator } from "../../shared/generic-validator";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Farm } from '../farm';
import {tryCatch} from "rxjs/internal-compatibility";
import {NotificationsService} from "../../_services/notification.service";
import {ExaminationData} from "./components/inspection-examination/examination";

@Component({
  selector: 'product-form',
  templateUrl: "./inspection-form.component.html",
  styleUrls: ["./inspection-form-component.css"],
})
export class InspectionFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  farm_data: Farm;
  farm_inspections:Inspection[] = [];
  pageTitle: string = "Update Inspection";
  errorMessage: string;
  inspectionForm: FormGroup;
  Units = Units
  inspection: Inspection = <Inspection>{};
  inspection_id:number = 0;
  private sub: Subscription;
  showImage: boolean;
  fieldColspan = 6;
  // Use with the generic validation messageId class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } } = {
    inspection_date: {
      required: "Inspection date is required.",
    },
    current_age: {
      required: "Age is required.",
      min:
        "can't be less than 1"
    },
    dead_last_3_days: {
      required: "DL3D number is required.",
      min:
        "can't be less than 0"
    },
    feed_consumption: {
      required: "Feed consumption is required.",
      min:
        "can't be less than 1"
    },
    water_consumption: {
      required: "Water consumption is required.",
      min:
        "can't be less than 1"
    },
    average_weight: {
      required: "Average weight is required.",
      min:
        "can't be less than 1"
    },
    clinical_signs: {
      required: "Clinical signs are required.",
    },
    pm_lesions: {
      required: "Pm lesions are required.",
    },
    diagnoses: {
      required: "Diagnoses is required.",
    },
  }

  private genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inspectionService: InspectionService,
    private breakpointObserver: BreakpointObserver,
    private notify:NotificationsService,
  ) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      // console.log(result)
      this.onScreensizeChange();
    });
    if (this.router.getCurrentNavigation().extras.state){
      this.farm_inspections = this.router.getCurrentNavigation().extras.state.farm_inspections;
      this.farm_data = this.router.getCurrentNavigation().extras.state.farm
    } else {
      this.farm_data= <Farm>{id:0,farm_name:"Test",start_date:"2021/07/06"}
      this.router.navigate([`/inspections/edit/${0}`],{state:{ farm:this.farm_data,farm_inspections:[] }} );
      //this.router.navigate(['/inspections']);
    }

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.inspectionForm = this.fb.group({
      inspection_date: ["", [Validators.required]],

      current_age: ["", [Validators.required,Validators.min(1)]],
      age_unit: ["", [Validators.required]],

      dead_last_3_days: ["", [Validators.required,Validators.min(0)]],

      feed_consumption: ["", [Validators.required,Validators.min(1)]],
      feed_unit: ["", [Validators.required]],

      water_consumption: ["", [Validators.required,Validators.min(1)]],
      water_unit: ["", [Validators.required]],

      average_weight: ["", [Validators.required,Validators.min(1)]],
      weight_unit: ["", [Validators.required]],

      other_notes: ["",],
      clinical_signs: ["", ],
      pm_lesions: ["", ],
      diagnoses: ["", ],
    });

    this.sub = this.route.params.subscribe(params => {
      this.inspection_id = +params["id"];
      if (this.inspection_id==0)
        this.onInspectionRetrieved(this.inspectionService.initializeInspection(this.farm_data.id));
      else
        this.getInspection(this.inspection_id);
    });

  }
  get InspectionHistory():Inspection[]{
    return this.farm_inspections.filter(inspection=>inspection.id != this.inspection_id );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  exam_data:ExaminationData = <ExaminationData>{};
  onExamChange(data:ExaminationData){
    this.exam_data.Clinical_Signs = data.Clinical_Signs
    this.exam_data.PM_Lesions = data.PM_Lesions
    this.exam_data.Diagnoses = data.Diagnoses

  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) =>
        Observable.fromEvent(formControl.nativeElement, "blur")
    );

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.inspectionForm.valueChanges, ...controlBlurs)
      .debounceTime(800)
      .subscribe(() => {
        this.displayMessage = this.genericValidator.processMessages(
          this.inspectionForm
        );
      });
  }

  getInspection(id: number): void {
    this.inspectionService
      .getInspectionById(id)
      .subscribe(
        (inspection: Inspection) => {
          console.log(inspection)
          this.onInspectionRetrieved(inspection)
        },
        (error: any) => (this.errorMessage = <any>error)
      );
  }
  getDate(date:string):Date{
    return new Date(date);
  }
  logger(event:any){
    console.log(event)
  }

  onInspectionRetrieved(inspection: Inspection): void {
    if (this.inspectionForm) {
      this.inspectionForm.reset();
    }
    this.inspection = inspection;

    if (inspection.id === 0) {
      this.pageTitle = "Add Inspection";
    } else {
      this.pageTitle = `Update Inspection: ${inspection.id} `;
    }
      this.exam_data = {
        Clinical_Signs : this.inspection.clinical_signs,
        PM_Lesions : this.inspection.pm_lesions,
        Diagnoses : this.inspection.diagnoses,
      }
    // Update the data on the form
    this.inspectionForm.patchValue({
      inspection_date: this.inspection.inspection_date,
      dead_last_3_days: this.inspection.dead_last_3_days,

      current_age: this.inspection.current_age.value,
      age_unit:this.Units.getUnit(this.inspection.current_age.unit),

      feed_consumption: this.inspection.feed_consumption.value,
      feed_unit: this.Units.getUnit(this.inspection.feed_consumption.unit),

      water_consumption: this.inspection.water_consumption.value,
      water_unit:this.Units.getUnit(this.inspection.water_consumption.unit),

      average_weight: this.inspection.average_weight.value,
      weight_unit: this.Units.getUnit(this.inspection.average_weight.unit),

      other_notes: this.inspection.other_notes,


    });
  }

  deleteInspection(): void {
    if (this.inspection.id === 0) {
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the inspection: ${this.inspection.id}?`)) {
        this.inspectionService
          .deleteInspection(this.inspection.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => (this.errorMessage = <any>error)
          );
      }
    }
  }

  saveInspection(): void {
    if (this.inspectionForm.dirty && this.inspectionForm.valid) {
      // Copy the form values over the inspection object values
      let newInspection:Inspection = <Inspection>{};
      newInspection.id =  this.inspection_id;
      newInspection.farm_id = this.farm_data.id;
      newInspection.inspection_date = this.inspectionForm.controls['inspection_date'].value;
      newInspection.current_age = <MeasuredData>{value:this.inspectionForm.controls['current_age'].value,unit:this.inspectionForm.controls['age_unit'].value};
      newInspection.dead_last_3_days = this.inspectionForm.controls['dead_last_3_days'].value;
      newInspection.feed_consumption = <MeasuredData>{value:this.inspectionForm.controls['feed_consumption'].value,unit:this.inspectionForm.controls['feed_unit'].value};
      newInspection.water_consumption = <MeasuredData>{value:this.inspectionForm.controls['water_consumption'].value,unit:this.inspectionForm.controls['water_unit'].value};
      newInspection.average_weight = <MeasuredData>{value:this.inspectionForm.controls['average_weight'].value,unit:this.inspectionForm.controls['weight_unit'].value};
      newInspection.other_notes = this.inspectionForm.controls['other_notes'].value;
      newInspection.clinical_signs = this.exam_data.Clinical_Signs;
      newInspection.pm_lesions = this.exam_data.PM_Lesions;
      newInspection.diagnoses = this.exam_data.Diagnoses;
      this.inspectionService
        .saveInspection(newInspection)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => (this.errorMessage = <any>error)
        );
    } else if (!this.inspectionForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.notify.toast('success','Inspection Added');
    this.inspectionForm.reset();
    this.router.navigate(["/inspections"]);
  }

  onScreensizeChange() {
    const isLess600 = this.breakpointObserver.isMatched('(max-width: 599px)');
    const isLess1000 = this.breakpointObserver.isMatched('(max-width: 959px)');
    if (isLess1000) {
      if (isLess600) {
        this.fieldColspan = 12;
      }
      else {
        this.fieldColspan = 6;
      }
    }
    else {
      this.fieldColspan = 4;
    }
  }
}
