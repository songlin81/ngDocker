import { ActionTypes } from './actions';
import { InitialState } from "./state";

export const initialState : InitialState = {
  items: [],
  cart: []
};

export function ShopReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LoadSuccess:
      console.log('LoadSuccess');
      return {
        ...state,
        items: [...action.payload]
      };

    case ActionTypes.Add:
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };

    case ActionTypes.Remove:
      return {
        ...state,
        cart: [...state.cart.filter(item => item.name !== action.payload.name)]
        //, items: [...state.items.filter(item => item.name !== action.payload.name)]
      };
    
    default:
      return state;
  }
}
