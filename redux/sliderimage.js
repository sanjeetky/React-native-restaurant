import * as ActionTypes from './ActionTypes';

export const sliderimage=(state={
    isLoading:true,
    errMess:null,
    images:[]
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_SLIDERIMAGE:
            return {isLoading:false,errMess:null,images:action.payload};
       
       case ActionTypes.SLIDERIMAGE_LOADING:
           return{...state,isLoading:true,errMess:null,images:[]}
        
       case ActionTypes.SLIDERIMAGE_FAILED:
           return{...state,isLoading:false,errMess:action.payload}
         default:
             return state;
           
    };
}