import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBottomSheetComponent } from './products-bottom-sheet.component';

describe('ProductsBottomSheetComponent', () => {
  let component: ProductsBottomSheetComponent;
  let fixture: ComponentFixture<ProductsBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsBottomSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
