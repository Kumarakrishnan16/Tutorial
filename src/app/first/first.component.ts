import { Component } from '@angular/core';
import { ShareService } from '../share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent {
  database: any[] = [];
  gather: any;
  differ = false;
  editId: number | null = null;
  editUserData: any | null = null;
  searchname: string = '';

  constructor(private service: ShareService, private router: Router) {
    this.recive();
  }
  recive() {
    this.service.send().subscribe((data) => {
      this.database = data as any[];
    });
  }
  editer(db: any) {
    this.router.navigate(['/form', db])
  }
  del(data: any) {
    this.service.remove(data.id).subscribe(() => {
      this.recive();
    })
  }
  add() {
    this.router.navigate(['/form'])
  }

  filterCondition(item: any): boolean {
    return item.name.toLowerCase().includes(this.searchname.toLowerCase());
  }}