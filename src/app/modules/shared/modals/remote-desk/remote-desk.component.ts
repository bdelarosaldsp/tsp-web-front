import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AgencyModalComponent } from '../agency-modal/agency-modal.component';

@Component({
  selector: 'app-remote-desk',
  templateUrl: './remote-desk.component.html',
  styleUrls: ['./remote-desk.component.scss']
})
export class RemoteDeskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AgencyModalComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
    //this.close();
  }
}
