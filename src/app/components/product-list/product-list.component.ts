import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { Company } from 'src/app/shared/models/company.model';
import { Product } from 'src/app/shared/models/product.model';
import * as _ from 'lodash';
import { DialogAddComponent } from '../dialog/dialog-add/dialog-add.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog/dialog-confirm/dialog-confirm.component';
import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'state', 'price', 'stock', 'comment', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;
  products: Product[] = [];
  companies: Company[] = [];
  selectedCompany: string = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCompanies();
  }
  
  selectedData: { value: string; text: string } = {
    value: "",
    text: ""
  };

  selectedValue($event: MatSelectChange) {
    let filteredData;
    this.selectedData = {
      value: $event.value,
      text: $event.source.triggerValue
    };
    if(this.selectedData.value === "0"){
      filteredData = this.products;
    } else {
      filteredData = _.filter(this.products, (item: any) => {
        return item.company == $event.value
      })
    }
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllProducts(){
    this.productService.getProducts()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.products = res;
      },
      error:(err)=>{
       alert("Error while fetching the Records!");
      }
    })
  }

  getAllCompanies(){
    this.productService.getCompanies()
    .subscribe({
        next:(res)=> {
          this.companies = res;
          this.selectedCompany = "0";
      },
      error:(err) => {
       console.log(err);
      }
    })
  }
  
  editProduct(row: any){
    this.dialog.open(DialogAddComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllProducts();
        this.selectedData.text = "";
        this.selectedCompany = "0";
      }
    })
  }

 deleteProduct(id:number){
    this.openConfirmDialog()
    .afterClosed().subscribe(val => {
      if(val){
        this.productService.deleteProduct(id)
        .subscribe({
          next:(res)=>{
            this.getAllProducts();
            this.toastr.warning("Product deleted successfully",'Warning')
          },
          error:(err)=>{
            console.log(err);
           }
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(DialogAddComponent, {
        width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllProducts();
      }
    })
  }

  openConfirmDialog(){
    let dialogData = new ConfirmDialogModel();
    return this.dialog.open(DialogConfirmComponent, {
       width: '400px',
       panelClass: 'confirm-dialog-container',
       disableClose: true,
       position: { top: "10%" },
       data :{
         title : dialogData.title,
         message : "Are you sure you want to delete this?"
       }
     });
   }

}
