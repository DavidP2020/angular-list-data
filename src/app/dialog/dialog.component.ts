import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  projectForm !: FormGroup
  actionBtn: string = "Save"
  formName: string = "Add"
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) {

  }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      date: ['', Validators.required],
    })

    if (this.editData) {
      this.formName = "Edit"
      this.actionBtn = "Update"
      this.projectForm.controls['projectName'].setValue(this.editData.projectName)
      this.projectForm.controls['date'].setValue(this.editData.date)
    }
  }

  addProject() {
    if (!this.editData) {
      if (this.projectForm.valid) {
        this.api.postProject(this.projectForm.value).subscribe({
          next: (res) => {
            alert("Project Added Successfully")
            this.projectForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert(err)
          }
        })
      }
    }
    else {
      console.log(this.editData)
      this.updateProject();
    }
  }
  updateProject() {
    this.api.putProject(this.projectForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert("Project Updated Successfully")
        this.projectForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert(err)
      }
    })
  }

}
