import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

interface SearchForm {
  idTitleGroup: {
    identifiant: string;
    titre: string;
  };
  type: string;
  anneeSortie: number;
  fiche: string;
}

@Component({
  selector: 'search-movie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-movie.component.html',
})
export class SearchMovieComponent {
  searchForm: FormGroup;
  startRangeDateValidator = 1900;
  currentYear = new Date().getFullYear();

  constructor(private fb: FormBuilder) {

    this.searchForm = this.fb.group({
      idTitleGroup: this.fb.group({
        identifiant: [''],
        titre: [''],
      }, { validators: this.isRequiredValidator('identifiant', 'titre') }),
      type: ['série', Validators.required],
      anneeSortie: ['', [Validators.required, this.rangeDateValidator(this.startRangeDateValidator, this.currentYear)]],
      fiche: [{ value: 'courte', disabled: true }, Validators.required],
    });

    this.searchForm.patchValue({
      type: 'série',
      fiche: 'courte'
    });


    this.searchForm.get('idTitleGroup.identifiant')?.valueChanges.subscribe(value => {
      console.log('Identifiant:', value);
    });

    this.searchForm.get('idTitleGroup.titre')?.valueChanges.subscribe(value => {
      console.log('Titre:', value);
    });

    this.searchForm.valueChanges.subscribe(value => {
      console.log('Form Value:', value);
    });

    this.searchForm.get('idTitleGroup.identifiant')?.valueChanges.subscribe(value => {
      const ficheControl = this.searchForm.get('fiche');
      if (value && ficheControl) {
        ficheControl.enable();
      } else if (ficheControl) {
        ficheControl.disable();
      }
    });
  }

  isRequiredValidator(identifiantKey: string, titreKey: string) {
    return (group: FormGroup): { [key: string]: any } | null => {
      const identifiant = group.get(identifiantKey)?.value;
      const titre = group.get(titreKey)?.value;

      if (!identifiant && !titre) {
        return { isRequired: true };
      }
      return null;
    };
  }

  rangeDateValidator(minYear: number, maxYear: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && (value < minYear || value > maxYear)) {
        return { min: { min: minYear, max: maxYear } };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.searchForm.valid) {
      console.log('form valid');
    } else console.log('Form not valid')
  }
}
