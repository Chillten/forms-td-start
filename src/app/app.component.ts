import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  forbiddenUsernames = ['admin', 'god'];


  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      email: new FormControl(null, [Validators.email, Validators.required], this.forbiddenEmail),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  addHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): { [NameIsForbbiden: string]: boolean } {
    return this.forbiddenUsernames.includes(control.value) ? { NameIsForbidden: true } : null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>(((resolve, reject) =>
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            resolve({ emailIsForbidden: true })
          } else {
            resolve(null);
          }
        },         1500)
      )
    );
  }
}
