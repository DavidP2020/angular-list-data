import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'listDataCRUD';
  UserDetail: any;
  displayedColumns: string[] = ['projectName', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private dialog: MatDialog, private api: ApiService) {

  }
  ngOnInit(): void {
    this.getAllProject();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if (val === "save") {
        this.getAllProject();
      }
    });
  }

  getAllProject() {
    this.api.getProject().subscribe({
      next: (res) => {
        this.UserDetail = res
        this.dataSource = new MatTableDataSource<any>(this.UserDetail);
        console.log(this.dataSource)
        this.dataSource.paginator = this.paginator
      },
      error: (err) => {
        alert(err)
      }
    })
  }

  editProduct(element: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(val => {
      if (val === "update") {
        this.getAllProject();
      }
    });
  }
  deletedProject(element: number) {
    this.dialog.open(DialogDeleteComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(val => {
      this.getAllProject();
    });
  }


}
