import { Injectable } from '@angular/core';

export interface PasswordFields {
  paragraph?: string;
  placeholder: string;
  type: 'password';
  formControl: string;
  hidden: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PasswordFormService {
  private passwordFields: PasswordFields[] = [
    {
      paragraph:
        'To set a new password please assign it below',
      formControl: 'newPassword',
      placeholder: 'Assign new password',
      type: 'password',
      hidden: true,
    },
    {
      paragraph:
        'Confirm new password by writing it below',
      formControl: 'confirmPassword',
      placeholder: 'Confirm password',
      type: 'password',
      hidden: true,
    },
    {
      paragraph:
        'Write your old password to confirm a change',
      formControl: 'oldPassword',
      placeholder:
        'Assign old password to save new one',
      type: 'password',
      hidden: true,
    },
  ];
  constructor() {}

  getPasswordFields() {
    return this.passwordFields;
  }
}
