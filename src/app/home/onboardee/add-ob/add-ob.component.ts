import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Onboardee } from 'src/app/models/onboardee';
import { OnboardeeService } from 'src/app/services/onboardee.service';
import { Router } from '@angular/router';
import { DemandService } from 'src/app/services/demand.service';

@Component({
  selector: 'app-add-ob',
  templateUrl: 'add-ob.component.html',
  styleUrls: ['add-ob.component.css'],
})

export class AddObComponent implements OnInit {

  addForm: FormGroup;

  skills= ['Java', 'C/C++', 'Angular', 'Spring', 'NodeJS', 'MySQL', 'NoSQL', 'HTML', 'CSS', 'JavaScript'];
  
  duration: number[] =  [1,2,3,4];
  newOnboardee: Onboardee = {
    id: 23,
    name: "",
    email: "",
    mno: "",
    dob: "",
    obSkills: [],
    obDate: "",
    joiningDate: "",
    joiningCity: "",
    joiningAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      pincode: -1,
    },
    mappedDemand: "",
    obStatus: "",
    eta: -1,
    bgc: "",
    graduation: "",
    obFormalities: "",
    created_at: "",
    last_modified: "",
  };
 
  demands: any[];
  relevantDmds: any[] = [];
  constructor(private _formBuilder: FormBuilder, private onboardeeService: OnboardeeService, private demandService: DemandService ,private router: Router) {}
  
  get personalDetails(): AbstractControl | null { return this.addForm.get('formArray').get([0]); }
  get joiningDetails(): AbstractControl | null { return this.addForm.get('formArray').get([1]); }
  get relevantDemands(): AbstractControl | null { return this.addForm.get('formArray').get([2]); }
  get onboardingDetails(): AbstractControl | null { return this.addForm.get('formArray').get([3]); }

  ngOnInit() {
    this.prepareForm();
    this.demandService.getAllDemands().subscribe(result => {
      this.demands = result;
    });
  }

  
  prepareForm() {
    this.addForm = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          firstName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
          lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
          dob: ['', Validators.required],
          email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
          mobNo: ['', [Validators.required,  Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(12)]],
          skills: ['', Validators.required],
        }),
        this._formBuilder.group({
          jdate: ['', Validators.required],
          line1: ['', Validators.maxLength(30)],
          line2: ['', Validators.maxLength(30)],
          city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
          state: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
          country: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
          pin: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]],
        }),
        this._formBuilder.group({
          demand: [''],
        }),
        this._formBuilder.group({
          odate: ['', Validators.required],
          status: ['', Validators.required],
          bgc: ['', Validators.required],
          grad: ['', Validators.required],
          ob: ['', Validators.required],
          duration: [''],
        })
      ])
    });
  }

  getData() {
    const personalDetails = this.addForm.value.formArray[0];
    const joiningDetails = this.addForm.value.formArray[1];
    let demand = this.addForm.value.formArray[2].demand;
    if(demand === "")  // check for empty demand value, string vs object
      demand = null;
    // if validations start working, no need for this, since field is required, and None has null value
    console.log("Demand :", demand);
    const obDetails = this.addForm.value.formArray[3];

    this.newOnboardee.name = personalDetails.firstName+" "+personalDetails.lastName;
    this.newOnboardee.dob = this.getDateString(personalDetails.dob);
    this.newOnboardee.email = personalDetails.email;
    this.newOnboardee.mno = personalDetails.mobNo;
    this.newOnboardee.obSkills = this.getSkills(personalDetails.skills);

    this.newOnboardee.joiningDate = this.getDateString(joiningDetails.jdate);
    this.newOnboardee.joiningCity = joiningDetails.city;
    this.newOnboardee.joiningAddress.line1 = joiningDetails.line1;
    this.newOnboardee.joiningAddress.line2 = joiningDetails.line2;
    this.newOnboardee.joiningAddress.city = joiningDetails.city;
    this.newOnboardee.joiningAddress.state = joiningDetails.state;
    this.newOnboardee.joiningAddress.country = joiningDetails.country;
    this.newOnboardee.joiningAddress.pincode = joiningDetails.pin;

    this.newOnboardee.mappedDemand = demand;

    this.newOnboardee.obDate = this.getDateString(obDetails.odate);
    this.newOnboardee.obStatus = obDetails.status;
    this.newOnboardee.bgc = obDetails.bgc;
    this.newOnboardee.graduation = obDetails.grad;
    this.newOnboardee.obFormalities = obDetails.ob;
    this.newOnboardee.eta = obDetails.duration;
  }

  getRelevantDemands() {
    const skills = this.addForm.value.formArray[0].skills;
    // flushing the previous values
    console.log("skills : ", this.addForm.value.formArray[0].skills);
    console.log("Get relevant demands: ", this.relevantDmds);
    this.relevantDmds = [];
    for(const i in this.demands)  {
      const dmdSkills = this.demands[i].dmdSkills;
      let skillNames = [];
      for(const j in dmdSkills )
        skillNames.push(dmdSkills[j].name);
      console.log("Skills for demand: ", this.demands[i], " : ", skillNames);
      if(skillNames.every(val => skills.includes(val)) && this.demands[i].ob == null)
        this.relevantDmds.push(this.demands[i]);
    }
  }

  submit() {
    console.log('submitted');
    console.log("Form Value: ",this.addForm.value);
    this.getData();
    console.log("New: " ,this.newOnboardee);
    this.onboardeeService.create(this.newOnboardee).subscribe(ob => {
      console.log(ob);
      this.onboardeeService.saveCreateLog(ob);
      this.router.navigate(['/home/ob']);
    });
  }

  getDateString (date): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-GB');
  }

  getSkills(skills: string[]): any[] {
    let skillList = [];
    for(const i in skills) {
      const obj: string = `{"name": "${skills[i]}"}`
      skillList.push(JSON.parse(obj));
    }
    return skillList;
  }
    
  cancel() {
    this.router.navigate(['/home/ob']);
  }
}