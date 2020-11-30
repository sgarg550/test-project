import { Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  private _users: User[];
  public testForm: FormGroup;
  submitted = false;
  showAdd = true;
  message: string;
  name: string;
  family: string;
  editingIndex: number;

  constructor(private fb: FormBuilder,
              private modalService: NgbModal)
  {
      this._users = [
        new User('Ali', 'Delshad', 1, {day: 31, month: 1, year: 1987}),
        new User('Hamid', 'Sadeghi', 2, {day: 31, month: 1, year: 1987}),
        new User('Amir', 'Olfat', 3, {day: 31, month: 1, year: 1987}),
        new User('Keyvan', 'Nasr', 4, {day: 31, month: 1, year: 1987})
      ];
      this.testForm = this.fb.group({
        name: [null, Validators.compose([Validators.required])],
        family: [null, Validators.compose([Validators.required])],
        birthday: [null, Validators.compose([Validators.required])],
        itemNum: [null, Validators.compose([Validators.required])],
        mode: [null],
        editIndex: [null]
      });
  }

  ngOnInit(): void {
  }

  get f(): any { return this.testForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.testForm.invalid) {
      return;
    } else {
      const formValue = this.testForm.getRawValue();
      if (formValue.mode === 'add') {
        this.users.push(new User(formValue.name, formValue.family, formValue.itemNum, formValue.birthday));
      } else {
        this.users.splice(formValue.editIndex, 1, new User(formValue.name, formValue.family, formValue.itemNum, formValue.birthday));
      }
      this.modalService.dismissAll();
      this.testForm.reset();
      this.submitted = false;
    }
  }

  open(content, mode, index): any {
    this.testForm.patchValue({mode: mode});
    this.showAdd = (mode === 'edit' ? false : true);
    this.modalService.open(content, {centered: true, backdrop: 'static'});
    if (mode === 'edit') {
      const data = this.users[index];
      const date: string[] = data.birthday.split('-');
      const birthDate: LocalDate = {day: +date[2], month: +date[1], year: +date[0]};
      this.testForm.patchValue({
        name: data.name,
        family: data.family,
        itemNum: data.itemNum,
        birthday: birthDate,
        editIndex: index
      });
    }

  }

  get users(): User[] {
    return this._users;
  }

  delete(index: number): any {
    this.users.splice(index, 1);
  }
}

export class User {
  private _name: string;
  private _family: string;
  private _itemNum: number;
  private _birthday: LocalDate;

  constructor(name: string, family: string, itemNum?: number, birthday?: LocalDate) {
    this._name = name;
    this._family = family;
    this._itemNum = itemNum;
    this._birthday = birthday;
  }

  get name(): string {
    return this._name;
  }

  get family(): string {
    return this._family;
  }

  get itemNum(): number {
    return this._itemNum;
  }

  get birthday(): string {
    return [this._birthday.year, this._birthday.month, this._birthday.day].join('-');
  }
}

export interface LocalDate {
  day: number;
  month: number;
  year: number;
}
