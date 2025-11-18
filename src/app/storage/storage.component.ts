import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
  db: any;
  constructor(private route: ActivatedRoute, private service: ShareService) { }
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const id = <any>(paramMap.get('id'));
      this.service.sender(id).subscribe(data => this.db = data)
    });
  }
}