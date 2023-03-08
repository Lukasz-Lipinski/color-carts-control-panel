import { Injectable } from '@angular/core';

export interface UpdateUserFormProps {
  type: 'text' | 'email';
  name: string;
  placeholder: string;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateUserDataService {
  private updateUserFields: UpdateUserFormProps[] =
    [
      {
        name: 'name',
        type: 'text',
        placeholder: 'Please provide name',
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Please provide email',
      },
    ];
  constructor() {}

  getUpdateUserFields(): UpdateUserFormProps[] {
    return this.updateUserFields;
  }
}
