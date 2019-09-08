import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { tap } from 'rxjs/operators';

@Injectable()
export class FileLoaderService {
  constructor(private http: HttpClient) { }

  // #docregion getTextFile
  loadtTextFile(path: string, filename: string, isUseAppFiles: boolean): Observable<string> {
    // https://angular.io/guide/http
    const filePath = isUseAppFiles ? 'app/files/' + path + '/' + filename : path + '/' + filename;
    return this.http.get(filePath, {responseType: 'text'})
      .pipe(
        tap(
          /*
          data => {
            console.log(JSON.stringify(data));
          },
          */
          error => console.log('Error: ' + error)
        )
      );
  }
  // #enddocregion getTextFile
}
