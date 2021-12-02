import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

import { Nistkasten } from './nistkasten'
import { Position } from './nistkasten';

import { HttpClient } from '@angular/common/http';

import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import * as olProj from 'ol/proj'
import { Coordinate } from 'ol/coordinate';

@Injectable({
  providedIn: 'root'
})
export class NistkastenService {

  private nistkaesten: Nistkasten[] = [];

  constructor(private http: HttpClient)
  {
  }

  loadNistkaesten(): Promise<any> {
    const url = environment.apiUrl + '/nestboxes';
    const promise = this.http.get<any>(url)
      .toPromise()
      .then(data => {
        console.log(data);
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
    var nistkasten = this.nistkaesten.find(nistkasten => nistkasten.id == id);
    if (nistkasten == undefined)
      nistkasten = this.nistkaesten[0];
    return nistkasten;
  }

  updateDistances(geoposition: Coordinate)
  {    
    this.nistkaesten.forEach ((nistkasten) => {
      var line = new LineString([geoposition, olProj.fromLonLat([nistkasten.position.lon, nistkasten.position.lat])]);
      var length = line.getLength()
    });
  }
}
