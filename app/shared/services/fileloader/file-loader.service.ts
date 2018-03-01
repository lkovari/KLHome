import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { tap } from 'rxjs/operators';

@Injectable()
export class FileLoaderService {
  constructor(private http: HttpClient) { }

  // #docregion getTextFile
  loadtTextFile(filename: string): Observable<string> {
    // https://angular.io/guide/http
    return this.http.get('app/files/masm/' + filename, {responseType: 'text'})
      .pipe(
        tap(
          data => {
            // console.log(JSON.stringify(data));
          },
          error => console.log('Error: ' + error)
        )
      );
  }
  // #enddocregion getTextFile
}
