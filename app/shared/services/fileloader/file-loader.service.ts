import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class FileLoaderService {
  constructor(private http: HttpClient) { }

  loadtTextFile(path: string, fileName: string, isUseAppFiles: boolean): Observable<string> {
    // https://angular.io/guide/http
    const filePath = isUseAppFiles ? 'app/files/' + path + '/' + fileName : path + '/' + fileName;
    return this.http.get(filePath, {responseType: 'text'})
      .pipe(
        shareReplay(),
        tap(data => {
            console.log(`LOAD: Content of the file ${filePath} loaded.`);
            console.log('Content ' + data);
        },
        error => console.error('File: ' + filePath + ' Error: ' + error)
      )
    );
  }
}
