import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";


export function intValidator() : ValidatorFn | null {
    return (control : AbstractControl) => {
        if(control.value) {
            if(control.value == null || control.value === '')
            {
                return null;
            }
            return Number.isInteger(Number(control.value)) ? null : {notAnInteger:true}
        }
        return null;
    }
}