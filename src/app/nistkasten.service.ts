import { Injectable } from '@angular/core';

import { Nistkasten } from './nistkasten'
import { Position } from './nistkasten';
import { NISTKAESTEN } from './mock-nistkaesten'
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

import * as XSLX from 'xlsx';
import { HttpClient } from '@angular/common/http';
//import { Position } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class NistkastenService {

  private url = 'https://tm9n6snoj9.execute-api.eu-central-1.amazonaws.com/dev/nextboxes';
  private nistkaesten: Nistkasten[] = [];

  constructor(private http: HttpClient)
  {
    console.log("NistkastenService ctor")
  }

  loadNistkaesten(): Promise<any> {
    const promise = this.http.get<any>(this.url)
      .toPromise()
      .then(data => {
        for (let n = 0; n < data.Count; ++n) {
          let pos: Position = {
            description: "",
            lat: data.Items[n].lat.N,
            lon: data.Items[n].lon.N,
          };
          let nistkasten: Nistkasten = {
            id: data.Items[n].id.S,
            number: data.Items[n].number.S,
            characteristic: data.Items[n].characteristic.S,
            position: pos,
            content: []
          }
          this.nistkaesten.push(nistkasten);
        }
      });

    return promise;
  }

  getNistkaesten() : Nistkasten[] {
    return this.nistkaesten;
  }

  getNistkasten(id: number) : Nistkasten {
    var nistkasten = NISTKAESTEN.find(nistkasten => nistkasten.id == id);
    if (nistkasten == undefined)
      nistkasten = NISTKAESTEN[0];
    return nistkasten;
  }
}
