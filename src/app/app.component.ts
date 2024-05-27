import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchMovieComponent } from './search-movie/search-movie.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchMovieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularReactiveForm';
}
