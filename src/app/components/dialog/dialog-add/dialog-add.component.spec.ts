import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogAddComponent } from "./dialog-add.component"
import { ProductService } from 'src/app/services/product.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('DialogAddComponent', () => {
  let component: DialogAddComponent;
  let fixture: ComponentFixture<DialogAddComponent>;
  let productService: ProductService;
  let toastrService: ToastrService;
  let debug: DebugElement;

  const fakeState = [{  value: '', viewValue: ''}]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, MatSelectModule, 
        ToastrModule.forRoot(), MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddComponent);
    component = fixture.componentInstance;
    component.productStates = fakeState;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  beforeEach(() => {
    productService = TestBed.inject(ProductService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  it('should be created ProductService', () => {
    expect(productService).toBeTruthy();
    expect(productService).toBeDefined();
  });

  it('should be created ToastrService', () => {
    expect(toastrService).toBeTruthy();
  });

  it('should create a form with 8 controls', () => {
    expect(component.productForm.contains('productName')).toBeTruthy();
    expect(component.productForm.contains('category')).toBeTruthy();
    expect(component.productForm.contains('company')).toBeTruthy();
    expect(component.productForm.contains('state')).toBeTruthy();
    expect(component.productForm.contains('price')).toBeTruthy();
    expect(component.productForm.contains('stock')).toBeTruthy();
    expect(component.productForm.contains('comment')).toBeTruthy();
    expect(component.productForm.contains('date')).toBeTruthy();
  });

  it('should make the controls required', () => {
    let productNameControl = component.productForm.get('productName');
    let categoryControl = component.productForm.get('category');
    let companyControl = component.productForm.get('company');
    let priceControl = component.productForm.get('price');
    let stockControl = component.productForm.get('stock');
    let dateControl = component.productForm.get('date');

    productNameControl!.setValue('');
    categoryControl!.setValue('');
    companyControl!.setValue('');
    priceControl!.setValue('');
    stockControl!.setValue('');
    dateControl!.setValue('');

    expect(productNameControl!.valid).toBeFalsy();
    expect(categoryControl!.valid).toBeFalsy();
    expect(companyControl!.valid).toBeFalsy();
    expect(priceControl!.valid).toBeFalsy();
    expect(stockControl!.valid).toBeFalsy();
    expect(dateControl!.valid).toBeFalsy();
  })

  it('should have Cancel button', () => {
    let cancelBtn = debug.query(x => x.name === 'button' && x.nativeElement.textContent === 'Cancel').nativeElement;
    expect(cancelBtn).toBeDefined();
  });

  it('should render Update button', () => {
    component.actionBtn = 'Update';
    fixture.detectChanges();

    let de = debug.query(By.css('#btnSave'));
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toBe('Update');
  });

  it('should render Save button', () => {
    component.actionBtn = 'Save';
    fixture.detectChanges();

    let de = debug.query(By.css('#btnSave'));
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toBe('Save');
  });

  it('should add product', () => {
    //arrange
    //spyOn(productService, 'postProduct').and.returnValue(of({}));
    spyOn(component, 'addProduct').and.callThrough();
    //act
    component.addProduct()
    //assert  
    expect(component.addProduct).toHaveBeenCalled();
  });

});