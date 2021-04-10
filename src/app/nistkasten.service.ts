import { Injectable } from '@angular/core';

import { Nistkasten } from './nistkasten'
import { NISTKAESTEN } from './mock-nistkaesten'
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Injectable({
  providedIn: 'root'
})
export class NistkastenService {

  constructor() { }

  getNistkaesten() : Nistkasten[] {
    return NISTKAESTEN;
  }

  getNistkasten(id: number) : Nistkasten {
    var nistkasten = NISTKAESTEN.find(nistkasten => nistkasten.id == id);
    if (nistkasten == undefined)
      nistkasten = NISTKAESTEN[0];
    return nistkasten;
  }
}
