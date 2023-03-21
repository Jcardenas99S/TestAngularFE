import { Component, OnInit, Inject, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import{MatSnackBar} from '@angular/material/snack-bar';
import{MAT_DATE_FORMATS} from '@angular/material/core';
import * as moment from 'moment';

import { Customer } from 'src/app/Interface/customer';
import { CustomerType } from 'src/app/Interface/customer-type';
import { CustomerService } from 'src/app/Services/customer-.service';
import { CustomertypeService } from 'src/app/Services/customer-type-.service';



export const MY_DATE_FORMATS = {
  parse:{
    dateInput:'DD/MM/YYYY'
  },
  display:{
    dateInput:'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY',
    dateA11yLabel:'LL',
    monthYearA11yLbel:'MMMM YYYY'
  }
}

@Component({
  selector: 'app-modal-view',
  templateUrl:'./modal-view.component.html',
  styleUrls: ['./modal-view.component.css'],
  providers: [{provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}]
})

export class ModalViewComponent implements OnInit{

  formCustomer: FormGroup;
  tituloAccion: string = "Add Customer";
  botonSave: string = "Guardar";
  ListaCustType: CustomerType[] = [];
  
  constructor(
    private dialogoRef: MatDialogRef<ModalViewComponent>,
    private fb: FormBuilder,
    private _snackBar:MatSnackBar,
    private _customerType: CustomertypeService,
    private _customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public dataCustomer: Customer
  ){
    this.formCustomer = this.fb.group({
      customerName: ['',Validators.required],
      customerPhone: ['',Validators.required],
      CustomerTypeId: ['',Validators.required],
      customerEmail: ['',Validators.required],
      customerNationalId: ['',Validators.required]
    })

    this._customerType.getList().subscribe({
      next:(dataList) => {       
        this.ListaCustType = dataList;
      },error:(e)=>{}
    })
  }

  mostrarAlerta(message: string, action: string) {
    this._snackBar.open(message, action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }

  addEditCustomer(){

    console.log(this.formCustomer.value)

    const model: Customer = {
      id:0,
      customerName:this.formCustomer.value.customerName,
      customerPhone:this.formCustomer.value.customerPhone,
      CustomerTypeId:this.formCustomer.value.CustomerTypeId,
      customerEmail:this.formCustomer.value.customerEmail,
      customerNationalId:this.formCustomer.value.customerNationalId,
      isActive:true
    }

    if(this.dataCustomer==null)
    {
      this._customerService.add(model).subscribe({
        next:(data)=>{
          this.mostrarAlerta("Customer added succesfully","Listo");
          this.dialogoRef.close("creado");
        },error:(e)=>{this.mostrarAlerta("Could not add the new customer","Error");}
      })
    }else{
      this._customerService.update(this.dataCustomer.id,model).subscribe({
        next:(data)=>{
          this.mostrarAlerta("Customer edited succesfully","Ready");
          this.dialogoRef.close("editado");
        },error:(e)=>{this.mostrarAlerta("Could not edit the new customer","Error");}
      })
    }

    
  }



  ngOnInit():void{

    if(this.dataCustomer){
      console.log(this.dataCustomer)
      this.formCustomer.patchValue({
        Id:this.dataCustomer.id,
        customerName:this.dataCustomer.customerName,
        customerPhone:this.dataCustomer.customerPhone,
        CustomerTypeId:this.dataCustomer.CustomerTypeId,
        customerEmail:this.dataCustomer.customerEmail,
        customerNationalId:this.dataCustomer.customerNationalId,
      })

      this.tituloAccion = "Edit Customer";
      this.botonSave = "Edit";
      
    }

  }

}
