import { InternalSignUp } from './../../models/intternal-sign-up-dto';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

    constructor(private auth: AuthenticationService,private formBuilder:FormBuilder, private router: Router) {}



    validatePasswordMatch = (control: AbstractControl): {[key: string]: any} | null => {
      const password = this.profileForm?.get('password')?.value as string;
      const passwordConfirm = control.value as string;

      if (password !== passwordConfirm) {
        return {passwordMatch: true};
      }

      return null;
    };

    profileForm = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      username:new FormControl('',Validators.required),
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('',Validators.required),
      password:new FormControl('',[Validators.required,]),
      confirmPassword:new FormControl('',[Validators.required,this.validatePasswordMatch])
    })


    signUp(){
      let newUser:InternalSignUp={
        email:this.profileForm.get('email')?.value!,
        username:this.profileForm.get('username')?.value!,
        password:this.profileForm.get('firstName')?.value!,
        firstName:this.profileForm.get('lastName')?.value!,
        lastName:this.profileForm.get('password')?.value!,
      }
      if(newUser!=null)
      {
         this.auth.internalSignUp(newUser).subscribe();
         this.router.navigateByUrl('login');
      }


    }



}
