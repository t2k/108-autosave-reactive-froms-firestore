import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss']
})
export class FormDemoComponent implements OnInit {
  myForm: FormGroup;
  myDoc;
  state: string;
  startDate: Date = new Date(new Date().toDateString());

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      openingbalance: [
        '',
        [Validators.required, Validators.pattern('^[0-9.:]*$')]
      ],
      startdate: ['', Validators.required]
    });

    const path = `openposition/${this.startDate}`;
    this.myDoc = this.afs.doc(path).valueChanges();
  }

  changeHandler(e) {
    console.log(e);
    this.state = e;
  }
}
