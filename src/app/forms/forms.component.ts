import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShareService } from '../share.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  database: any
  myform!: FormGroup
  double = false
  store: any
  id: any


  constructor(private service: ShareService, private react: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.myform = this.react.group({
      name: [''],
      email: [''],
      role: [''],
      address: [''],
      city: ['']
    })

    this.id = <any>(this.route.snapshot.paramMap.get('id'))
    this.service.sender(this.id).subscribe((data) => {
      this.myform.patchValue(data)
    })
  }
  add() {
    if (this.double) { this.updateuser() }
    else {
      this.service.give(this.myform.value).subscribe(() => {
        this.recive()
        this.myform.reset()
        this.router.navigate(['/'])

      })
    }
  }
  recive() {
    this.service.send().subscribe((data) => {
      this.database = data as any[];
    });
  }

  edit(hi: any) {
    this.double = true
    this.store = hi.id
    this.myform.patchValue({
      name: hi.name,
      email: hi.email,
      role: hi.role,
      address: hi.address,
      city: hi.city
    })
  }

  updateuser() {
    this.service.modify(this.id, this.myform.value).subscribe(() => {
      alert("updated successfully")
      this.double = false
      this.recive()
      this.myform.reset()
      this.router.navigate(['/'])
    })
  }

  back(){
    this.router.navigate(['/'])
  }
}
