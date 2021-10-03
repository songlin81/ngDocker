import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './model/Product';
import { NgRedux } from '@angular-redux/store';
import { InitialState } from './store/state';
import { LoadItems } from './store/actions';

@Injectable({
  providedIn: 'root'
})
export class FruitsService {
  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<InitialState>
  ) {}

  getAll() {
    this.http
      .get('http://localhost:4000/fruits')
      .subscribe((products: Array<Product>) => {
        this.ngRedux.dispatch(LoadItems(products));
      });
  }
}
