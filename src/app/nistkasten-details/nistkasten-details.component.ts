import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Nistkasten } from '../nistkasten';
import { NistkastenService } from '../nistkasten.service';

@Component({
  selector: 'app-nistkasten-details',
  templateUrl: './nistkasten-details.component.html',
  styleUrls: ['./nistkasten-details.component.css']
})
export class NistkastenDetailsComponent implements OnInit {

  public filter : number = 0; 
  public filteredNistkaesten: Nistkasten[] = [];
  public selectedItem : number = 0;
  public selectedNistkasten! : Nistkasten;

  constructor(private route: ActivatedRoute, private router: Router, private nistkastenService : NistkastenService, private location: Location) { }

  ngOnInit(): void {
    this.filter = Number(this.route.snapshot.paramMap.get('filter'));
    this.selectedItem = Number(this.route.snapshot.paramMap.get('item'));
    console.log("filter: " + this.filter + " item: " + this.selectedItem);

    this.filteredNistkaesten = (this.filter == 0 ? this.nistkastenService.getNistkaesten() : this.nistkastenService.getClosestNistkaesten(10.0));
    this.selectedNistkasten = this.filteredNistkaesten[this.selectedItem];
  }

  onCommentsClicked() {
    // Attention! nistkasten id used as uri part implies format of it
    this.router.navigate(["comments/" + this.selectedNistkasten.id]);
  }

  onSelectionChanged() {
    var selectElem = document.getElementById("selection") as HTMLSelectElement;
    console.log("selection changed: " + selectElem!.selectedIndex);
    this.selectedNistkasten = this.filteredNistkaesten[this.selectedItem];
    // TODO! navigate to same page using different query params
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['details', {filter: this.filter, item: selectElem.selectedIndex}]);
  }

  goBack() {
    this.location.back();
  }
}
