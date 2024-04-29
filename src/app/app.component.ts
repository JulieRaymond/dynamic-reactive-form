import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationFormComponent } from "./registration-form/registration-form.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, RegistrationFormComponent]
})
export class AppComponent {
  title = 'atelier-dynamic-reactive-form';
}
