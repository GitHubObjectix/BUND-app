import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nistkasten-comments',
  templateUrl: './nistkasten-comments.component.html',
  styleUrls: ['./nistkasten-comments.component.css']
})
export class NistkastenCommentsComponent implements OnInit {

  public nistkastenId?: string;
  private sub: any;

  constructor(private route: ActivatedRoute, private location: Location) {
    this.nistkastenId = undefined;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.nistkastenId = params['id']; // (+) converts string 'id' to a number

      // TODO! dispatch action to load the comments of referenced nistkasten here.
    });

    console.log("NistkastenCommentsComponent init " + this.nistkastenId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack() {
    this.location.back();
  }
}
