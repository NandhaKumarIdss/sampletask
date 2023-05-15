import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

interface Employee {
  id: string;
  employeename: string;
  salary: number;
  department: string;
  hiredate: string;
}

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit {
  COLUMN_SELECTIONS = ['ID', 'EMPLOYEENAME', 'SALARY', 'DEPARTMENT', 'HIREDATE'];
  selectedColumns: string[] | null = [];
  cols = new FormControl(this.COLUMN_SELECTIONS);
  description!: string;
  complete!: string;
  @ViewChild('addModal') addModal!: TemplateRef<any>;
  dataSource!: MatTableDataSource<Employee>;
  model = {
    id: '',
    employeename: '',
    salary: 0,
    department: '',
    hiredate: ''
  }
  dialogRef: any;

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {

  }
  ngOnInit(): void {
    const todos: Employee[] = [
      { id: "1", employeename: "John Doe", salary: 50000, department: "IT", hiredate: "2022-01-01" },
      { id: "2", employeename: "Jane Smith", salary: 60000, department: "HR", hiredate: "2022-02-01" },
      { id: "3", employeename: "Michael Johnson", salary: 70000, department: "Finance", hiredate: "2022-03-01" },
      { id: "4", employeename: "Emily Davis", salary: 55000, department: "Marketing", hiredate: "2022-04-01" },
      { id: "5", employeename: "David Wilson", salary: 65000, department: "Operations", hiredate: "2022-05-01" },
    ];
    this.dataSource = new MatTableDataSource(todos);
    this.selectedColumns = ['id', 'employeename', 'salary', 'department', 'hiredate'];
  }

  updateSelectedColumns() {
    const selected = this.cols?.value as unknown as string[] | undefined;
    this.selectedColumns = selected !== undefined ? selected : [];
  }

  openAddItemDialog() {
    this.dialogRef = this.dialog.open(this.addModal);
  }

  save() {
    const hasValues = Object.values(this.model).some(value => value);
    if (hasValues) {
      const lastItemId = this.dataSource.data.length > 0 ? parseInt(this.dataSource.data[this.dataSource.data.length - 1].id) : 0;
      this.model.id = (lastItemId + 1).toString();
      const newItem = { ...this.model };
      this.dataSource.data.push(newItem);
      this.dataSource.data = [...this.dataSource.data];
    }
    console.log(this.dataSource);
    this.cdr.detectChanges();
    this.cancel();
  }

  cancel() {
    this.dialog.closeAll();
    this.model = {
      id: '',
      employeename: '',
      salary: 0,
      department: '',
      hiredate: ''
    }
  }



}
