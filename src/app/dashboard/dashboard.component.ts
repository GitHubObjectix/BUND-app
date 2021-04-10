import { Component, OnInit } from '@angular/core';

import { Nistkasten } from '../nistkasten';
import { NistkastenService } from '../nistkasten.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nistkaesten: Nistkasten[] = [];

  selectedNistkasten?: Nistkasten;

  constructor(private nistkastenService : NistkastenService) { }

  ngOnInit(): void {
    this.nistkaesten = this.nistkastenService.getNistkaesten();
  }

  onSelect(nistkasten: Nistkasten): void {
    this.selectedNistkasten = nistkasten;
  }
}
