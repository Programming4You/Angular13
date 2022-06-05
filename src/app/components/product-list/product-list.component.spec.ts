import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { ProductListComponent } from './product-list.component';
import { EMPTY, from, Observable, of } from 'rxjs';
import { DialogConfirmComponent } from '../dialog/dialog-confirm/dialog-confirm.component';
import { DebugElement } from '@angular/core';


describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let dialog: MatDialog;
  let productService: ProductService;
  let toastrService: ToastrService;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [ProductService, 
        { provide: MatDialog, useValue: { open: () => of({id: 1}) }  }, { provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });
 
  beforeEach(() => {
    dialog = TestBed.inject(MatDialog);
    productService =  TestBed.inject(ProductService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  it('should have Add button', () => {
    let addBtn = debug.query(x => x.name === 'button' && x.nativeElement.textContent === 'Add').nativeElement;
    expect(addBtn).toBeDefined();
  });

  it('should set product properties with the items returned from api', () => {
    let fakeProducts = [1,2,3];
    spyOn(productService, 'getProducts').and.returnValue(from([fakeProducts]));

    component.ngOnInit();

    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should call the api to delete product if user confirms in dialog', () => {
    //arrange
    spyOn(dialog, 'open').and.returnValue({afterClosed: () => of({id: 1})} as MatDialogRef<typeof DialogConfirmComponent>);
    let spy = spyOn(productService, 'deleteProduct').and.returnValue(EMPTY);
    //act
    component.deleteProduct(1);
    //assert
    expect(dialog.open).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

});
