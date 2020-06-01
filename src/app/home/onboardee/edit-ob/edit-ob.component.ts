import { Component, OnInit } from '@angular/core';
import { Onboardee } from 'src/app/models/onboardee';
import { OnboardeeService } from 'src/app/services/onboardee.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormArrayName } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-ob',
  templateUrl: './edit-ob.component.html',
  styleUrls: ['./edit-ob.component.css']
})
export class EditObComponent {

 
  constructor(private _formBuilder: FormBuilder, private onboardeeService : OnboardeeService, private router: Router) { }

  editForm: FormGroup;
  
  onboardee: Onboardee;

  duration: number[] = [1,2,3,4];

  get formArray(): AbstractControl | null { return this.editForm.get('formArray'); }
  

  ngOnInit(): void {
    const id: number = history.state.id;
    console.log("State: ",id);
    this.onboardeeService.findOnboardeeById(id).subscribe(ob => {
      console.log(ob);
      this.prepareForm(ob);
      this.onboardee = ob;
    })
  }

  prepareForm(onboardee: Onboardee) {
    console.log("In prepare form: ", onboardee);
    const names: string[] = onboardee.name.split(" ");
    console.log("split: " ,names);
    this.editForm = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          firstName: [names[0], Validators.required],
          lastName: [names[1], Validators.required],
          dob: ['', Validators.required],
          email: [onboardee.email, Validators.email],
          mobNo: [onboardee.mno, Validators.required],
        }),
        this._formBuilder.group({
          jdate: ['', Validators.required],
          line1: [''],
          line2: [''],
          city: [onboardee.joiningCity, Validators.required],
          state: ['', Validators.required],
          country: ['', Validators.required],
        }),
        this._formBuilder.group({
          odate: ['', Validators.required],
          status: [onboardee.obStatus, Validators.required],
          bgc: [onboardee.bgcComplete, Validators.required],
          grad: [onboardee.graduationComplete, Validators.required],
          ob: [onboardee.obFormalitiesComplete, Validators.required],
          duration: [onboardee.eta, Validators.required],
        })
      ])
    });
  }

  getData() {
    const personalDetails = this.editForm.value.formArray[0];
    const joiningDetails = this.editForm.value.formArray[1];
    const obDetails = this.editForm.value.formArray[2];
    this.onboardee.name = personalDetails.firstName+" "+personalDetails.lastName;
    this.onboardee.email = personalDetails.email;
    this.onboardee.mno = personalDetails.mobNo;

    this.onboardee.joiningCity = joiningDetails.city;

    this.onboardee.obStatus = obDetails.status;
    this.onboardee.bgcComplete = obDetails.bgc;
    this.onboardee.graduationComplete = obDetails.grad;
    this.onboardee.obFormalitiesComplete = obDetails.ob;
    this.onboardee.eta = obDetails.duration;
  }

  submit() {
    console.log('submitted');
    console.log("Form Value: ",this.editForm.value);
    this.getData();
    console.log("Updated: " ,this.onboardee);
    console.log("id: ", this.onboardee.id);
    this.onboardeeService.updateOnboardee(this.onboardee.id, this.onboardee).subscribe(ob => {
      console.log("Update response: ",ob);
      this.router.navigate(['/home/ob']);
    });
  }

  cancel() {
    this.router.navigate(['/home/ob']);
  }

}
