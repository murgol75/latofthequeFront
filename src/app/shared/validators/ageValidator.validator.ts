import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";

export function ageValidator(age : number) : ValidatorFn | null {
    return (control : AbstractControl) => {
        if(control.value) {

            let todayYear : number = new Date().getFullYear();
            let targetYear : number = new Date(control.value).getFullYear();
            if(todayYear - targetYear < age) {
                return { age : true }
            }

        }
        return null;
    }
}