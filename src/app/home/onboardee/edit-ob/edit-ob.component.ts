import { Component, OnInit } from '@angular/core';
import { Onboardee } from 'src/app/models/onboardee';
import { OnboardeeService } from 'src/app/services/onboardee.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormArrayName } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandService } from 'src/app/services/demand.service';

@Component({
  selector: 'app-edit-ob',
  templateUrl: './edit-ob.component.html',
  styleUrls: ['./edit-ob.component.css']
})
export class EditObComponent {

 
  constructor(private _formBuilder: FormBuilder, private onboardeeService : OnboardeeService, private demandService: DemandService, private router: Router) { }

  editForm: FormGroup;
  
  onboardee: Onboardee;

  duration: number[] = [1,2,3,4];
  skills= ['Java', 'C/C++', 'Angular', 'Spring', 'NodeJS', 'MySQL', 'NoSQL','HTML', 'CSS', 'JavaScript'];

  get formArray(): AbstractControl | null { return this.editForm.get('formArray'); }
  
  demands: any[];

  // can by default add the mapped demand
  relevantDmds: any[] = [];

  ngOnInit(): void {
    const id: number = history.state.id;
    console.log("State: ",id);
    this.onboardeeService.findOnboardeeById(id).subscribe(ob => {
      console.log(ob);
      this.prepareForm(ob);
      this.onboardee = ob;
    })
    this.demandService.getAllDemands().subscribe(result => {
      this.demands = result;
      console.log("Demands: ", this.demands);
    });
  }

  prepareForm(onboardee: Onboardee) {
    if(onboardee.mappedDemand != null) {
      this.relevantDmds.push(onboardee.mappedDemand);
      console.log("pushed: ", this.relevantDmds);
    }
      
    console.log("In prepare form: ", onboardee);
    const names: string[] = onboardee.name.split(" ");

    // get date objects
    const dob = this.getDateObj(onboardee.dob);
    const joiningDate = this.getDateObj(onboardee.joiningDate);
    const obDate = this.getDateObj(onboardee.obDate);
    const skillData = this.getSkillList(onboardee.obSkills);

    this.editForm = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          firstName: [names[0], Validators.required],
          lastName: [names[1], Validators.required],
          dob: [dob, Validators.required],
          email: [onboardee.email, Validators.email],
          mobNo: [onboardee.mno, Validators.required],
          skills: [skillData, Validators.required],
        }),
        this._formBuilder.group({
          jdate: [joiningDate, Validators.required],
          line1: [onboardee.joiningAddress.line1],
          line2: [onboardee.joiningAddress.line2],
          city: [onboardee.joiningCity, Validators.required],
          state: [onboardee.joiningAddress.state, Validators.required],
          country: [onboardee.joiningAddress.country, Validators.required],
          pin: [onboardee.joiningAddress.pincode, Validators.required],
        }),
        this._formBuilder.group({
          demand: [onboardee.mappedDemand, Validators.required],
        }),
        this._formBuilder.group({
          odate: [obDate, Validators.required],
          status: [onboardee.obStatus, Validators.required],
          bgc: [onboardee.bgc, Validators.required],
          grad: [onboardee.graduation, Validators.required],
          ob: [onboardee.obFormalities, Validators.required],
          duration: [onboardee.eta],
        })
      ])
    });
  }

  getData() {
    const personalDetails = this.editForm.value.formArray[0];
    const joiningDetails = this.editForm.value.formArray[1];
    const demand = this.editForm.value.formArray[2].demand;
    console.log("Demand :", demand);
    const obDetails = this.editForm.value.formArray[3];

    this.onboardee.name = personalDetails.firstName+" "+personalDetails.lastName;
    this.onboardee.dob = this.getDateString(personalDetails.dob);
    this.onboardee.email = personalDetails.email;
    this.onboardee.mno = personalDetails.mobNo;
    this.onboardee.obSkills = this.getSkills(personalDetails.skills);

    this.onboardee.joiningDate = this.getDateString(joiningDetails.jdate);
    this.onboardee.joiningCity = joiningDetails.city;
    this.onboardee.joiningAddress.line1 = joiningDetails.line1;
    this.onboardee.joiningAddress.line2 = joiningDetails.line2;
    this.onboardee.joiningAddress.city = joiningDetails.city;
    this.onboardee.joiningAddress.state = joiningDetails.state;
    this.onboardee.joiningAddress.country = joiningDetails.country;
    this.onboardee.joiningAddress.pincode = joiningDetails.pin;

    this.onboardee.mappedDemand = demand;

    this.onboardee.obDate = this.getDateString(obDetails.odate);
    this.onboardee.obStatus = obDetails.status;
    this.onboardee.bgc = obDetails.bgc;
    this.onboardee.graduation = obDetails.grad;
    this.onboardee.obFormalities = obDetails.ob;
    this.onboardee.eta = obDetails.duration;
  }

  getRelevantDemands() {
    const skills = this.editForm.value.formArray[0].skills;
    // flushing the previous values
    console.log("skills : ", this.editForm.value.formArray[0].skills);
    console.log("Get relevant demands: ", this.relevantDmds);
    this.relevantDmds = [];
    let skipID = -1;

    if(this.onboardee.mappedDemand != null) {
      this.relevantDmds.push(this.onboardee.mappedDemand);
      console.log("pushed: ", this.relevantDmds);
      skipID = this.onboardee.mappedDemand.id;
    }

    for(const i in this.demands)  {
      const dmdSkills = this.demands[i].dmdSkills;
      let skillNames = [];
      for(const j in dmdSkills )
        skillNames.push(dmdSkills[j].name);
      console.log("Skills for demand: ", this.demands[i], " : ", skillNames);
      if(skillNames.every(val => skills.includes(val)) && this.demands[i].ob == null && this.demands[i].id !== skipID) // null check to see if demand is not already fulfilled, skip id to skip already selected demand
        this.relevantDmds.push(this.demands[i]);
    }
  }

  submit() {
    console.log('submitted');
    console.log("Form Value: ",this.editForm.value);
    this.getData();
    console.log("Updated: " ,this.onboardee);
    console.log("id: ", this.onboardee.id);
    this.onboardeeService.updateOnboardee(this.onboardee.id, this.onboardee).subscribe(ob => {
      console.log("Update response: ",ob);
      this.onboardeeService.saveEditLog(ob);
      this.router.navigate(['/home/ob']);
    });
  }

  getDateString (date): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-GB');
  }

  getDateObj (dateString) {
    // replace / by - and swap month and date values
    const date: string[] = dateString.split("/");
    const updated = date[1]+"-"+date[0]+"-"+date[2];
    const dateObj = new Date(updated);
    return dateObj;
  }

  getSkillList(data): string[] {
    let skillStringList:string[] = [];
    for(const i in data) 
      skillStringList.push(data[i].name);
    console.log("Skill String List: ", skillStringList);
    return skillStringList;
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
