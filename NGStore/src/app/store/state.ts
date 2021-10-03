import { Product } from '../model/Product';

export interface InitialState {
    items: Array<Product>;
    cart: Array<Product>;
}
  