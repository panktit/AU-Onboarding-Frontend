export interface Onboardee {
    id: number;
    name: string;
    email: string;
    mno: string;
    dob: string;
    obSkills: any [];
    obDate: string;
    joiningAddress: {
        line1: string;
        line2: string;
        city: string;
        state: string;
        country: string;
        pincode: number;
    };
    joiningDate: string;
    joiningCity: string;
    obStatus: string;
    eta: number;
    bgc: string;
    graduation: string;
    obFormalities: string;
    created_at: string;
    last_modified: string;
}