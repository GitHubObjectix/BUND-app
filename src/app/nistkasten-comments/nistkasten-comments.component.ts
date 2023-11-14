import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Comment } from '../nistkasten';
import { NistkastenService } from '../nistkasten.service';


@Component({
  selector: 'app-nistkasten-comments',
  templateUrl: './nistkasten-comments.component.html',
  styleUrls: ['./nistkasten-comments.component.css']
})
export class NistkastenCommentsComponent implements OnInit {

  public nistkastenId?: string;
  public comments: Comment[] = [];
  private sub: any;

  constructor(private route: ActivatedRoute, private nistkastenService : NistkastenService, private location: Location) {
    this.nistkastenId = undefined;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.nistkastenId = params['id']; // (+) converts string 'id' to a number

      this.comments = this.nistkastenService.getNistkastenComments(this.nistkastenId!);
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
