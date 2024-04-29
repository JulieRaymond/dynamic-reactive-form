import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {

  registrationForm: FormGroup = new FormGroup({});

  formSubmitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        zipCode: ['', Validators.required],
        city: ['', Validators.required]
      }),
      emergencyContacts: this.formBuilder.array([])
    }, { validators: this.passwordMatchValidator });
  }

  get emergencyContacts(): FormArray {
    return this.registrationForm.get('emergencyContacts') as FormArray;
  }

  addEmergencyContact(): void {
    const contactGroup = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });
    this.emergencyContacts.push(contactGroup);
  }

  removeEmergencyContact(index: number): void {
    this.emergencyContacts.removeAt(index);
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: any } | null {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;
  }


  onSubmit(): void {
    this.formSubmitted = true;
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    } else {
      this.markAllAsTouched(this.registrationForm);
    }
  }

  markAllAsTouched(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllAsTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }
}