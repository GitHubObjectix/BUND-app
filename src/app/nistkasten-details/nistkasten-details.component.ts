import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
  selector: 'app-nistkasten-details',
  templateUrl: './nistkasten-details.component.html',
  styleUrls: ['./nistkasten-details.component.css']
})
export class NistkastenDetailsComponent implements OnInit {

  public map!: Map;
  nistkastenLayer!: VectorLayer;
  public nistkasten!: Nistkasten;

  constructor(private route: ActivatedRoute, private nistkastenService : NistkastenService, private location: Location) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != undefined)
    {
      var parsed = parseInt(id, 10);
      if (!isNaN(parsed))
      {
        this.nistkasten = this.nistkastenService.getNistkasten(parsed);

        this.initializeMap(this.nistkasten.position.lon, this.nistkasten.position.lat);
        this.addNistkastenLayer(this.nistkasten);
      }
    }

    console.log(id);
  }

  private initializeMap(lon : number, lat : number): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([lon, lat]),   // Karte auf Tännig zentrieren
        zoom: 16                                      // reinzoomen auf Hettstadt
      })
    });
  }

  addNistkastenLayer(nistkasten: Nistkasten): void {
    var vectorSource = new Vector;

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

    this.nistkastenLayer = new VectorLayer({
      source: vectorSource,
    })
    this.map.addLayer(this.nistkastenLayer);
  }
}
