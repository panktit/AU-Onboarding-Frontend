import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-ob',
  templateUrl: 'add-ob.component.html',
  styleUrls: ['add-ob.component.css'],
})

export class AddObComponent implements OnInit {

  addForm: FormGroup;
  
  duration: number[] =  [1,2,3,4];

  constructor(private _formBuilder: FormBuilder) {}

  get formArray(): AbstractControl | null { return this.addForm.get('formArray'); }

  ngOnInit() {

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
          date: ['', Validators.required],
          line1: [''],
          line2: [''],
          city: ['', Validators.required],
          state: ['', Validators.required],
          country: ['', Validators.required],
        }),
        this._formBuilder.group({
          status: ['', Validators.required],
          bgc: ['', Validators.required],
          grad: ['', Validators.required],
          ob: ['', Validators.required],
          duration: ['', Validators.required],
        })
      ])
    });
  }

  submit() {
    console.log('submitted');
    console.log(this.addForm.value);
  }
}