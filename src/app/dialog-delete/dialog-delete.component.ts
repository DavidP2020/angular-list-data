import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {

  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any,
    private dialogRef: MatDialogRef<DialogComponent>) {

  }
  ngOnInit(): void {
    console.log(this.deleteData)
    console.log(this.deleteData)
  }
  deleteProject(deleteData: number) {
    this.api.deleteProject(deleteData).subscribe({
      next: (res) => {
        alert("Project Deleted Successfully")
        this.dialogRef.close('delete');
      },
      error: (err) => {
        alert(err)
      }
    })
  }
}

