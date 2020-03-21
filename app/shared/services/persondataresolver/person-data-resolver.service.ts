import { Injectable } from '@angular/core';
import { Person } from '../../../shared/models/person.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ExamplePersonDataService } from '../examplepersondata/example-person-data.service';

@Injectable({
  providedIn: 'root'
})
export class PersonDataResolver implements Resolve<Array<Person>> {

  constructor(private examplePersonDataService: ExamplePersonDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Person>> {
    console.log(`RESOLVE BEGIN route: ${route} state: ${state}`);
    console.log('RESOLVER: PersonDataResolver.resolve started.');
    return this.examplePersonDataService.loadtExamplePersonData()
    .pipe(
      tap(data => {
        if (data && data instanceof Array) {
          console.log(`RESOLVE: PersonDataResolver.resolve : #${data.length} Person rows loaded.`);
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
