import { Injectable } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import * as olProj from 'ol/proj'


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  // longitude in WGS-84 degree minutes
  // minutes are deviced in integral and fraction part
  lonDeg : number;
  lonMinInt : number;
  lonMinFrac :number;

  latDeg : number;
  latMinInt : number;
  latMinFrac : number;

  constructor() {
    this.lonDeg = 9;
    this.lonMinInt = 48;
    this.lonMinFrac = 0.538;

    this.latDeg = 49;
    this.latMinInt = 49;
    this.latMinFrac = 0.008;
  }

  getCurrentLocation() : Coordinate {
    var lonDecimal : number = LocationService.toDecimalDegree(this.lonDeg, LocationService.toDecimalMinute(this.lonMinInt, this.lonMinFrac));
    var latDecimal : number = LocationService.toDecimalDegree(this.latDeg, LocationService.toDecimalMinute(this.latMinInt, this.latMinFrac));
    console.log("current location is " + lonDecimal + " " + latDecimal);
    return olProj.fromLonLat([lonDecimal, latDecimal]);
  }

  setCurrentLocationDegMin(
    lonDeg : number, lonMinInt: number, lonMinFrac: number,
    latDeg : number, latMinInt: number, latMinFrac: number) {
      this.lonDeg = lonDeg;
      this.lonMinInt = lonMinInt;
      this.lonMinFrac = lonMinFrac;

      this.latDeg = latDeg;
      this.latMinInt = latMinInt;
      this.latMinFrac = latMinFrac;
  }

  static toDecimalMinute(minInt : number, minFrac : number) : number
  {
    return minInt + minFrac;
  }

  static toDecimalDegree(deg: number, min : number) : number
  {
    // convert from deg+min (e.g. 49°49.186) to decimal degree
    var decimalDeg : number = LocationService.round(deg + min / 60, 6);
    return decimalDeg;
  }

  private static round(value : number, digits : number) {
    var factor : number = Math.pow(10, digits);
    return Math.round(value * factor) / factor;
  }
}
