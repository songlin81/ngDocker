import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model/Product';
import { NgRedux } from '@angular-redux/store';
import { InitialState } from '../store/state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private ngRedux: NgRedux<InitialState>) {
    this.ngRedux
      .select<Array<Product>>('cart')
      .subscribe((items: Array<Product>) => {
        this.cart = items;
        console.log('cart:');
        console.log(this.cart);
      });
    this.ngRedux
      .select<Array<Product>>('items')
      .subscribe((items: Array<Product>) => {
        console.log('items:');
        console.log(items);
      });
  }
  
  cart: Array<Product>;

  ngOnInit() {}
}
