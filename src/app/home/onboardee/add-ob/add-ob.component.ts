import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Onboardee } from 'src/app/models/onboardee';
import { OnboardeeService } from 'src/app/services/onboardee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ob',
  templateUrl: 'add-ob.component.html',
  styleUrls: ['add-ob.component.css'],
})

export class AddObComponent implements OnInit {

  addForm: FormGroup;
  
  duration: number[] =  [1,2,3,4];
  newOnboardee: Onboardee = {
    id: 23,
    name: "",
    email: "",
    mno: "",
    joiningCity: "",
    obStatus: "",
    eta: -1,
    bgcComplete: "",
    graduationComplete: "",
    obFormalitiesComplete: "",
    created_at: "",
    last_modified: "",
  };

  constructor(private _formBuilder: FormBuilder, private onboardeeService: OnboardeeService, private router: Router) {}

  get formArray(): AbstractControl | null { return this.addForm.get('formArray'); }

  ngOnInit() {
    this.prepareForm();
  }

  prepareForm() {
    this.addForm = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          dob: ['', Validators.required],
          email: ['', Validators.email],
          mobNo: ['', Validators.required],
        }),
        this._formBuilder.group({
          jdate: ['', Validators.required],
          line1: [''],
          line2: [''],
          city: ['', Validators.required],
          state: ['', Validators.required],
          country: ['', Validators.required],
        }),
        this._formBuilder.group({
          odate: ['', Validators.required],
          status: ['', Validators.required],
          bgc: ['', Validators.required],
          grad: ['', Validators.required],
          ob: ['', Validators.required],
          duration: ['', Validators.required],
        })
      ])
    });
  }

  getData() {
    const personalDetails = this.addForm.value.formArray[0];
    const joiningDetails = this.addForm.value.formArray[1];
    const obDetails = this.addForm.value.formArray[2];
    this.newOnboardee.name = personalDetails.firstName+" "+personalDetails.lastName;
    this.newOnboardee.email = personalDetails.email;
    this.newOnboardee.mno = personalDetails.mobNo;

    this.newOnboardee.joiningCity = joiningDetails.city;

    this.newOnboardee.obStatus = obDetails.status;
    this.newOnboardee.bgcComplete = obDetails.bgc;
    this.newOnboardee.graduationComplete = obDetails.grad;
    this.newOnboardee.obFormalitiesComplete = obDetails.ob;
    this.newOnboardee.eta = obDetails.duration;
  }

  submit() {
    console.log('submitted');
    console.log("Form Value: ",this.addForm.value);
    this.getData();
    console.log("New: " ,this.newOnboardee);
    this.onboardeeService.create(this.newOnboardee).subscribe(ob => {
      console.log(ob);
      this.router.navigate(['/home/ob']);
    });
  }
}