import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      task: this.formBuilder.array([])
    })

    if (this.editData) {
      this.formName = "Edit"
      this.actionBtn = "Update"
      this.projectForm.controls['projectName'].setValue(this.editData.projectName)
      this.projectForm.controls['date'].setValue(this.editData.date)
      const task = (this.formControl).controls;
      console.log(this.editData)
      if (this.editData.task) {
        for (let i = 0; i < this.editData.task.length; i++) {
          console.log(this.editData.task[i])
          task.push(this.editData.task[i])
        }
      }
      console.log(task)

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

  get formControl() {
    return this.projectForm.get('task') as FormArray
  }

  onAddForm() {
    (this.projectForm.get('task') as FormArray).push(this.formBuilder.control(''))
  }
  onRemoveForm(id: number) {
    (this.projectForm.get('task') as FormArray).removeAt(id)
  }
}
