import { Component, OnInit } from '@angular/core';

import 'ol/ol.css';
import { Map, View } from 'ol';
import Vector from 'ol/source/Vector';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Geolocation from 'ol/Geolocation';
import { Style, Icon } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { Fill, Stroke } from 'ol/style';
import * as olProj from 'ol/proj'
import OSM from 'ol/source/OSM';


import { NistkastenService } from '../nistkasten.service';
import VectorSource from 'ol/source/Vector';
import { Nistkasten } from '../nistkasten';

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

  constructor(private nistkastenService : NistkastenService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log("main map after view init")
    this.initializeMap();
    this.addNistkastenLayer();
  }

  private initializeMap(): void {
    const defaultLocation = olProj.fromLonLat([9.810, 49.819]);
    //const defaultLocation = olProj.fromLonLat([9.818517, 49.819717])

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
        center: defaultLocation,   // Karte auf Tännig zentrieren
        zoom: 14,                  // reinzoomen auf Hettstadt
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
    this.positionFeature.setGeometry(new Point(defaultLocation));

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

    var geoposition = this.geolocation.getPosition();
    if (geoposition)
    {
      console.log("initial position update");
      this.positionUpdate(this);
      this.headingUpdate(this);
    }

    this.geolocation.on('change:position', () => { this.positionUpdate(this); });
    this.geolocation.on('change', () => { this.headingUpdate(this); });
    this.geolocation.setTracking(true);
  }

  addNistkastenLayer(): void {
    var nistkaesten = this.nistkastenService.getNistkaesten();

    var vectorSource = new Vector;

    nistkaesten.forEach(function (nistkasten) {
      console.log(nistkasten.position.lon);
      var iconFeature = new Feature({
        geometry: new Point(olProj.fromLonLat([nistkasten.position.lon, nistkasten.position.lat]))
      });
      var iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          src: 'assets/img/nistkasten.png'
        })
      });
      iconFeature.setStyle(iconStyle);
      vectorSource.addFeature(iconFeature);
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

      // TODO! check if async operation required
      comp.nistkastenService.updateDistances(coordinates);
      comp.closestNistkaesten = comp.nistkastenService.getClosestNistkaesten(10.0);
    }
  }

  private headingUpdate(comp: MainMapComponent)
  {
    var headingEl = document.getElementById('heading');
    if (headingEl)
      headingEl.innerText = comp.geolocation.getHeading() + ' [rad]';
  }

  public onTrackChange()
  {
    if (navigator && navigator.geolocation) {
      if (this.isTracking == false) {
        console.log("tracking");
        this.isTracking = true;

        this.map.getView().setCenter(this.geolocation.getPosition());
      }
      else {
        console.log("not tracking");
        this.isTracking = false;
      }
    }
  }
}
