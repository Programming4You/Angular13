import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ProductService]
    });
  });

  beforeEach(() => {
    productService = TestBed.inject(ProductService);
  });


  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should have getProducts method', () => {
    expect(productService.getProducts()).toBeTruthy();
  });

});
