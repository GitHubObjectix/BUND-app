import { Component, OnInit } from '@angular/core';

import 'ol/ol.css';
import { Map, View } from 'ol';
import Vector from 'ol/source/Vector';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Geolocation from 'ol/Geolocation';
import { Style, Icon, Text } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { Fill, Stroke } from 'ol/style';
import * as olProj from 'ol/proj'
import OSM from 'ol/source/OSM';


import { NistkastenService } from '../nistkasten.service';
import VectorSource from 'ol/source/Vector';
import { Nistkasten } from '../nistkasten';
import { LocationService } from '../location.service';
import { Coordinate } from 'ol/coordinate';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {

  public map!: Map;
  public positionFeature!: Feature;
  public geolocation!: Geolocation;

  private isTracking: boolean = false;

  public closestNistkaesten: Nistkasten[] = [];

  constructor(private nistkastenService : NistkastenService, private locationService : LocationService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log("main map after view init")
    this.initializeMap();
    this.addNistkastenLayer();
  }

  private initializeMap(): void {
    // initialize map including initial position and zoom
    // view uses default projection with units in meters
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: this.locationService.getCurrentLocation(), // center map to current location
        zoom: 14, // zoom so that Hettstadt gets visible
        rotation: 0
      })
    });

    // add a circle feature into a vector layer to display current geoposition
    this.positionFeature = new Feature();
    this.positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );
    this.positionFeature.setGeometry(new Point(this.locationService.getCurrentLocation()));

    new VectorLayer({
      map: this.map,
      source: new VectorSource({ features: [this.positionFeature] })
    });

    // let the geolocation API control the map
    this.geolocation = new Geolocation({
      trackingOptions: {
        maximumAge: 0,
        timeout: 100,
        enableHighAccuracy: false
      },
      projection: this.map.getView().getProjection()
    });

    this.updateClosestNistkaesten(this, this.locationService.getCurrentLocation());

    // listen to built-in location service to auto-update location and heading
    // on mobile phones this only works if web browser can access location
    // on some mobile phone the web site has to use HTTPs for that
    this.geolocation.on('change:position', () => { this.positionUpdate(this); });
    this.geolocation.on('change', () => { this.headingUpdate(this); });
    this.geolocation.setTracking(true);
  }

  addNistkastenLayer(): void {
    var nistkaesten = this.nistkastenService.getNistkaesten();

    var vectorSource = new Vector;

    nistkaesten.forEach(function (nistkasten) {
      //console.log(nistkasten.position.lon);
      var nkFeature = new Feature({
        geometry: new Point(olProj.fromLonLat([nistkasten.position.lon, nistkasten.position.lat]))
      });
      var iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          src: 'assets/img/nistkasten.png'
        }),
        text: new Text({
          offsetX: -10,
          offsetY: -10,
          text: nistkasten.id.toString()
        })

      });
      nkFeature.setStyle(iconStyle);
      vectorSource.addFeature(nkFeature);
    });

    var nistkastenLayer = new VectorLayer({
      source: vectorSource,
    })
    this.map.addLayer(nistkastenLayer);
  }

  private positionUpdate(comp: MainMapComponent)
  {
    console.log("position update");

    const coordinates = comp.geolocation.getPosition();
    if (coordinates) {
      comp.positionFeature.setGeometry(new Point(coordinates));

      if (comp.isTracking) {
        comp.map.getView().setCenter(coordinates);
      }

      this.updateClosestNistkaesten(comp, coordinates);
    }

    const heading = comp.geolocation.getHeading();
    if (heading && comp.isTracking)
    {
      comp.map.getView().setRotation(heading);
    }
  }

  private updateClosestNistkaesten(comp: MainMapComponent, location : Coordinate)
  {
      // TODO! check if async operation required
      comp.nistkastenService.updateDistances(location);
      // TODO! make distance for nearest check configurable
      comp.closestNistkaesten = comp.nistkastenService.getClosestNistkaesten(10.0);
  }

  private headingUpdate(comp: MainMapComponent)
  {
    var headingEl = document.getElementById('heading');
    if (headingEl)
      headingEl.innerText = comp.geolocation.getHeading() + ' [rad]';
  }

  public onTrackChange()
  {
    // called when user clicks track button
    // used to auto-update map center and rotation based on location parameters

    if (navigator && navigator.geolocation) {
      if (this.isTracking == false) {
        console.log("tracking");
        this.isTracking = true;

        const coordinates = this.geolocation.getPosition();
        if (coordinates)
          this.map.getView().setCenter(coordinates);
      }
      else {
        console.log("not tracking");
        this.isTracking = false;
      }
    }
  }
}
