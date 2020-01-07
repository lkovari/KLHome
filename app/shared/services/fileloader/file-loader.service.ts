import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { tap } from 'rxjs/operators';

@Injectable()
export class FileLoaderService {
  constructor(private http: HttpClient) { }

  loadtTextFile(path: string, fileName: string, isUseAppFiles: boolean): Observable<string> {
    // https://angular.io/guide/http
    const filePath = isUseAppFiles ? 'app/files/' + path + '/' + fileName : path + '/' + fileName;
    return this.http.get(filePath, {responseType: 'text'})
      .pipe(
        tap(data => {
            console.log(`Content of the CSV file ${filePath} loaded`);
        },
        error => console.error('File: ' + filePath + ' Error: ' + error)
      )
    );
  }
}
