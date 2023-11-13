import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-set-position',
  templateUrl: './set-position.component.html',
  styleUrls: ['./set-position.component.css']
})
export class SetPositionComponent implements OnInit {

  lonDeg : number;
  lonMinInt : number;
  lonMinFrac : string;

  latDeg : number;
  latMinInt : number;
  latMinFrac : string;

  constructor(private route: ActivatedRoute, private locationService : LocationService, private location: Location) {
    this.lonDeg = locationService.lonDeg;
    this.lonMinInt = locationService.lonMinInt;
    this.lonMinFrac = SetPositionComponent.fracToString(locationService.lonMinFrac);

    this.latDeg = locationService.latDeg;
    this.latMinInt = locationService.latMinInt;
    this.latMinFrac = SetPositionComponent.fracToString(locationService.latMinFrac);
  }

  ngOnInit(): void {
    console.log("SetPositionComponent ngOnInit()")
  }

  onSetPositionClicked() {
    //console.log("Position gesetzt");
    this.locationService.setCurrentLocationDegMin(
      this.lonDeg, this.lonMinInt, SetPositionComponent.fracFromString(this.lonMinFrac),
      this.latDeg, this.latMinInt, SetPositionComponent.fracFromString(this.latMinFrac));
    this.location.back();
  }

  private static fracToString(frac : number) : string {
    var str = String(frac).substring(2);
    console.log("fracToString: " + frac + " " + str);
    return str;
  }

  private static fracFromString(frac : string) : number {
    var str = "0." + frac;
    var fracNum : number = Number(str);
    console.log("fracFromString " + frac + " " + fracNum);
    return fracNum;
  }
}
