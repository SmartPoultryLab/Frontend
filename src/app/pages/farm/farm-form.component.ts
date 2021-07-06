import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, MaxLengthValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Farm } from './farm';
import { FarmService } from './farm.service';

import { NumberValidators } from '../../shared/number.validator';
import { GenericValidator } from '../../shared/generic-validator';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {BackendService} from "../../_services";
import {FarmOptions, Owner} from '../../_models'
import {APIService} from "../../_services/api.service";

@Component({
    selector: 'customer-form',
    templateUrl: './farm-form.component.html',
    styles: [`
    .title-spacer {
        flex: 1 1 auto;
      }
    .form-field{
        width: 100%;
        margin-left: 20px;
        margin-right: 20px;
    }
    .avatar-field {
        left: 0;
        margin: 0 auto;
        position: absolute;
        margin-left: 50px;
    }
    `]
})
export class FarmFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Update Farm';
    errorMessage: string;
    farmForm: FormGroup;
    farm: Farm = <Farm>{};
    private sub: Subscription;
    showImage: boolean;
    imageWidth: number = 100;
    imageMargin: number = 2;
    fieldColspan = 3;
    farmOptions: FarmOptions = <FarmOptions>{};
    ownersList:Owner[] = [];
    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private genericValidator: GenericValidator;

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    private validationMessages: { [key: string]: { [key: string]: string } | {} } = {
        owner_id: {
            required: 'Farm Owner is Required.',
        },
        bird_id: {
            required: 'Bird Type is required.',
        },
        breed_id: {
            required: 'Breed name is required.',
        },
        housing_id: {
            required: 'Housing Type is required.'
        },
        food_id: {
          required: 'Food Type is required.'
        },
        farm_name: {
          required: 'Farm name is required.',
          minlength: 'Farm name must be 6 characters at least.'
        },
        num_of_breeds: {
          required: 'Number of birds is required.',
          min: "Number of birds can't be 0 or negative"
        },
        start_date: {
          required: 'Start Date is required.',
        },
    };

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private farmService: FarmService,
        private apiService: APIService,
        private breakpointObserver: BreakpointObserver
    ) {
        breakpointObserver.observe([
            Breakpoints.HandsetLandscape,
            Breakpoints.HandsetPortrait
        ]).subscribe(result => {
            // console.log(result)
            this.onScreensizeChange(result);
        });
        this.genericValidator = new GenericValidator(this.validationMessages);

    }

    ngOnInit(): void {
        this.farmForm = this.fb.group({
            owner_id: ['', [Validators.required]],
            bird_id: ['', [Validators.required]],
            breed_id: ['', [Validators.required]],
            housing_id: ['', [Validators.required]],
            food_id: ['', [Validators.required]],
            farm_name: ['', [Validators.required,Validators.minLength(6)]],
            num_of_breeds: ['', [Validators.required,Validators.min(0)]],
            start_date: ['', [Validators.required]],
        });
      this.getFarmOptions();
      this.getMyOwners();
        // Read the farm Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];

                if (id == 0)
                  this.onFarmRetrieved(this.farmService.initializeFarm());
                else
                  this.getFarm(id);
            }
        );

        this.sub.add(null);

    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.farmForm.valueChanges, ...controlBlurs).debounceTime(500).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.farmForm);
        });
    }

    getFarm(id: number): void {
        this.farmService.getFarmById(id)
            .subscribe(
                (farm: Farm) => this.onFarmRetrieved(farm),
                (error: any) => this.errorMessage = <any>error
            );
    }

    getFarmOptions(): void{
      this.farmService.getFarmsOptions().subscribe(
        (farmOptions:FarmOptions)=> this.farmOptions = farmOptions,
        (error:any)=> this.errorMessage = <any>error
      );
    }
    getMyOwners(): void{
      this.apiService.getOwners().subscribe(
        (owners:Owner[])=> {this.ownersList = owners; console.log(this.ownersList)},
        (error:any)=> this.errorMessage = <any>error
      );
    }

    onFarmRetrieved(farm: Farm): void {
        if (this.farmForm) {
            this.farmForm.reset();
        }
        this.farm = farm;

        if (this.farm.id === 0) {
            this.pageTitle = 'New Farm';
        } else {
            this.pageTitle = `Farm: ${this.farm.farm_name}`;
        }

        // Update the data on the form
        this.farmForm.patchValue({
            id: this.farm.id,
            owner_id: this.farm.owner_id,
            bird_id: this.farm.bird_id,
            breed_id: this.farm.breed_id,
            housing_id: this.farm.housing_id,
            food_id: this.farm.food_id,
            farm_name: this.farm.farm_name,
            num_of_breeds: this.farm.num_of_breeds,
            start_date: this.farm.start_date
        });
    }




    saveFarm(): void {
        if (this.farmForm.dirty && this.farmForm.valid) {
            // Copy the form values over the farm object values
            const farm = Object.assign({}, this.farm, this.farmForm.value);

            this.farmService.saveFarm(farm)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.farmForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.farmForm.reset();
        this.router.navigate(['/farms']);
    }

    onScreensizeChange(result: any) {
        // debugger
        const isLess600 = this.breakpointObserver.isMatched('(max-width: 599px)');
        const isLess1000 = this.breakpointObserver.isMatched('(max-width: 959px)');
        console.log(
            ` isLess600  ${isLess600}
            isLess1000 ${isLess1000}  `
        )
        if (isLess1000) {
            if (isLess600) {
                this.fieldColspan = 12;
            }
            else {
                this.fieldColspan = 6;
            }
        }
        else {
            this.fieldColspan = 3;
        }
    }
}
