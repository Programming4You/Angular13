import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/shared/models/company.model';
import { ToastrService } from 'ngx-toastr';
import { State } from 'src/app/shared/models/state.model';


@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {

  productStates: State[] = [];
  productForm !: FormGroup;
  actionBtn : string = "Save";
  companies: Company[] = [];
  categories: any[] = [];
  disableBtn = false;
  date:any;
  

  constructor(private formBuilder : FormBuilder, private productService: ProductService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData : any, private dialogRef: MatDialogRef<DialogAddComponent>) { }

  ngOnInit(): void {
    this.getAllCompanies();
    this.getAllCategories();
    this.getAllProductStates();
    this.generateForm();
    this.disableSubmitBtn();
  }

  generateForm(){
    this.productForm = this.formBuilder.group({
      productName : ['', Validators.required],
      category : ['', Validators.required],
      company : ['', Validators.required],
      state : [''],
      price : ['', Validators.required],
      stock : ['', Validators.required],
      comment : [''],
      date : ['', Validators.required]
    });
    
    if(this.editData){
      this.actionBtn = "Update";
      this.disableBtn = true;
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['company'].setValue(this.editData.company);
      this.productForm.controls['state'].setValue(this.editData.state);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['stock'].setValue(this.editData.stock);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }else{
      this.productForm.controls['state'].setValue('Brand New');
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.productService.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            this.productForm.reset();
            this.dialogRef.close('save');
            this.toastr.success('Added successfully', 'Success');
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
    }else{
      this.updateProduct();
    }
  }

  updateProduct(){
    if(this.productForm.valid){
      this.productService.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
          this.productForm.reset();
          this.dialogRef.close('update');
          this.toastr.success('Product updated successfully', 'Success'); 
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

  getAllCompanies(){
    this.productService.getCompanies()
    .subscribe({
        next:(res)=> {
          this.companies = res;
      },
      error:(err) => {
       console.log(err);
      }
    })
  }

  getAllCategories(){
    this.productService.getCategories()
    .subscribe({
        next:(res)=> {
          this.categories = res;
      },
      error:(err) => {
       console.log(err);
      }
    })
  }

  getAllProductStates(){
    this.productService.getProductStates()
    .subscribe({
        next:(res)=> {
          this.productStates = res;
      },
      error:(err) => {
       console.log(err);
      }
    })
  }
  
  disableSubmitBtn(){
      this.productForm.valueChanges 
      .subscribe((changedObj: any) => {
          this.disableBtn = this.productForm.valid;
      });
  }

}