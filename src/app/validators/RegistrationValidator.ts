import { FormGroup } from '@angular/forms';

export class RegistrationValidator {

  /**
   * Validate if passwordKey is equals to passwordConfirmation.
   * @param passwordKey Correct password.
   * @param passwordConfirmationKey Confirmation password.
   */
  static validatePasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }
}
