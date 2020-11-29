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
    } else{
      const formValue = this.testForm.getRawValue();
      this._users.push(new User(formValue.name, formValue.family, formValue.itemNum, formValue.birthday));
    }
  }

  get users(): User[] {
    return this._users;
  }

  delete(index: number) {
    this._users.splice(index, 1);
  }

  open(content, mode, data) {
    console.log(data);
    this.modalService.open(content, {centered: true, backdrop: 'static'}).result.then((mode) => {
      this.message =  `${mode === 'edit' ? 'Edited' : 'Added'} successfully`;
    }, (reason) => {
      this.message = `Cancelled`;
    });
  }

  setEditUser(index: number): void {
    this.editingIndex = index;
    this.name = this._users[index].name;
    this.family = this._users[index].family;
  }

  edit(): void {
    this._users[this.editingIndex] = new User(this.name, this.family);
    this.editingIndex = undefined;
    this.name = "";
    this.family = "";
  }

  add(): void {
    this._users.push(new User(this.name, this.family));

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
