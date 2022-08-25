import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyService } from 'src/app/services/currency.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductType } from 'src/types';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [
    ProductService,
  ]
})
export class ProductListComponent implements OnInit {
  @Input() selectedCurrency!: string;
  plist: ProductType[] = [];
  
  constructor(private currencyService: CurrencyService,private productService: ProductService, private router: Router) { }
  ngOnChanges(changes: SimpleChanges) : void {
    console.log('Changes:', changes);
  }

  ngOnInit(): void {
    this.getData();
    this.getCode();
  }
  addItem(data: any) {
    console.log(data);
    this.router.navigate(['/cart']);
  }

  getCode() {
    this.currencyService.currencyObservable.subscribe((code) => {
      this.selectedCurrency = code;
    })
  }

  getData() {
    this.productService.getProduct().subscribe(
      (data) => {
        console.log('SUCCESS', data);
        this.plist = data as ProductType[];
      },
      (error) => {
        console.log('ERROR', error);
      }
    );
  }

}
