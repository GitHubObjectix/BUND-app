import { Component, OnInit } from '@angular/core';

import 'ol/ol.css';
import { Map, View } from 'ol';
import Vector from 'ol/source/Vector';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import * as olProj from 'ol/proj'
import OSM from 'ol/source/OSM';


import { Nistkasten } from '../nistkasten';
import { NistkastenService } from '../nistkasten.service';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {

  public map!: Map;
  nistkaesten: Nistkasten[] = [];

  constructor(private nistkastenService : NistkastenService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeMap();
    this.addNistkastenLayer();
  }

  private initializeMap(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([9.810, 49.819]),   // Karte auf Tännig zentrieren
        zoom: 16                                      // reinzoomen auf Hettstadt
      })
    });
  }

  addNistkastenLayer(): void {
    this.nistkaesten = this.nistkastenService.getNistkaesten();

    var vectorSource = new Vector;

    this.nistkaesten.forEach(function (nistkasten) {
      console.log(nistkasten.position.lon);
      var iconFeature = new Feature({
        geometry: new Point(olProj.fromLonLat([nistkasten.position.lon, nistkasten.position.lat]))
        //geometry: new Point([nistkasten.position.lon, nistkasten.position.lat])
      });
      var iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          //opacity: 0.75,
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
}
