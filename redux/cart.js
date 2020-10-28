import * as ActionTypes from './ActionTypes';

export const cart = (state = { errMess: null,isLoading:true,cart:[]}, action) => {
  
  switch (action.type) {
    case ActionTypes.ADD_CART:
      return {...state,errMess: null,isLoading:false,cart: action.payload};

    case ActionTypes.CART_FAILED:
      return {...state,isLoading:false, errMess: action.payload};

    case ActionTypes.POST_CART:
        return {...state,errMess:null,isLoading:false,cart:state.cart.concat(action.payload) } 

     case ActionTypes.CART_LOADING:
          return{...state,isLoading:true,errMess:null,cart:[]}

     case ActionTypes.CART_DELETE:
          return{...state,isLoading:false,errMess:null,cart: state.cart.filter (item => {
            return item !== action.payload
        })}

        case ActionTypes.CART_EMPTY:
          return{...state,isLoading:false,errMess:null,cart: []}

    default:
      return state;
  }
};

