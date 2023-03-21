import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { ModalViewComponent } from './Views/modal-view/modal-view.component';
//Implementar la interfaz
import { Customer } from './Interface/customer';
import { CustomerService } from './Services/customer-.service';
import{MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['Id', 'name', 'phone', 'customerType', 'customerEmail', 'customerNationalID', 'Acciones'];
  dataSource = new MatTableDataSource<Customer>();

  constructor(private _customer: CustomerService,
              public dialog: MatDialog,
              private _snackBar:MatSnackBar,
              ){}



  ngOnInit(): void {
    this.showCustomers()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarAlerta(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }

  showCustomers(){
    this._customer.getList().subscribe(
    {
      next:(dataResponse)=>{
        console.log(dataResponse)
        this.dataSource.data = dataResponse;
      },error:(e)=>{}
    })
  }

  addCustomer(){
    this.dialog.open(ModalViewComponent,{
      disableClose:true,
      width:"350px",
    }).afterClosed().subscribe(res => {
      if(res=="creado"){
        this.showCustomers();
      }
  })
  }

  editCustomer(dataCustomer: Customer){
    console.log("test edit") 
    this.dialog.open(ModalViewComponent,{
      disableClose:true,
      width:"350px",
      data:dataCustomer
    }).afterClosed().subscribe(res => {
      if(res=="editado"){
        this.showCustomers();
      }
  })
  }

  deleteCustomer(dataCustomer: Customer){
    console.log("test delete") 
    console.log(dataCustomer) 

    this._customer.delete(dataCustomer.id,dataCustomer).subscribe({
      next:(data)=>{
        this.mostrarAlerta("Customer deleted succesfully","Listo");
        this.showCustomers();
      },error:(e)=>{this.mostrarAlerta("Could not add the new customer","Error");}
    })


    
    
  }

 



}
