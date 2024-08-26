import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";


export function distinctKeywords() : ValidatorFn | null {
    return (control : AbstractControl) => {
        if(control.value) {

            const selectedKeywords = control.value;
            const hasDuplicates = new Set(selectedKeywords).size !== selectedKeywords.length;
            return hasDuplicates ? { nonDistinctKeywords: true } : null;
        }
        return null;
    }
}