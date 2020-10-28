import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import * as SecureStore from 'expo-secure-store';
import { Alert,ToastAndroid } from 'react-native';

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + '/comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
export const postComments = (comments)  => (dispatch) => {


    return fetch(baseUrl+'/comments',{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(comments)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(data =>{
        if(data.success==true)
        {
            dispatch(Favorite(comments));
        }
        else
        console.log(data.status)
    })
    .catch(error => console.log(error));
};


export const Favorite = (comments) => ({
    type: ActionTypes.POST_COMMENTS,
    payload: comments
});






export const fetchCart = (user) => (dispatch) => {
    dispatch(cartLoading());
    return fetch(baseUrl+'/cart/load',{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(user)
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(item => dispatch(addCart(item)))
    .catch(error => dispatch(cartFailed(error.message)));
};

export const cartFailed = (errmess) => ({
    type: ActionTypes.CART_FAILED,
    payload: errmess
});

export const addCart = (item) => ({
    type: ActionTypes.ADD_CART,
    payload: item
});
export const postcart = (item)  => (dispatch) => {


    return fetch(baseUrl+'/cart',{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(item)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(data =>{
        if(data.success==true)
        {
            
            dispatch(addkaro(item));
        }
        else
        console.log(data.status)
    })
    .catch(error => console.log(error));
};


export const addkaro = (item) => ({
    type: ActionTypes.POST_CART,
    payload: item
});

export const cartLoading = () => ({
    type: ActionTypes.CART_LOADING
});

export const deletecartitem = (item)  => (dispatch) => {


    return fetch(baseUrl+'/cart',{
        method:"DELETE",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(item)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(data =>{
        if(data.success==true)
        {
            dispatch(deletekaro(item));
            console.log("hello")
        }
        else
        console.log(data.status)
    })
    .catch(error => console.log(error));
};


export const deletekaro = (item) => ({
    type: ActionTypes.CART_DELETE,
    payload: item
});



export const emptycart = (item)  => (dispatch) => {


    return fetch(baseUrl+'/cart/empty',{
        method:"DELETE",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(item)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(data =>{
        if(data.success==true)
        {
            dispatch(emptykaro(item));
            console.log("hello")
        }
        else
        console.log(data.status)
    })
    .catch(error => console.log(error));
};


export const emptykaro = (item) => ({
    type: ActionTypes.CART_EMPTY,
    payload: item
});





















export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());

    return fetch(baseUrl + '/items')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});




//sliderimage


export const fetchSliderimage  = () => (dispatch) => {
   // Alert.alert("hello");
    dispatch(sliderimageLoading());
     
    return fetch(baseUrl + '/image')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addsliderimage(dishes)))
    .catch(error => dispatch(sliderimageFailed(error.message)));
};

export const sliderimageLoading = () => ({
    type: ActionTypes.SLIDERIMAGE_LOADING
});

export const sliderimageFailed = (errmess) => ({
    type: ActionTypes.SLIDERIMAGE_FAILED,
    payload: errmess
});

export const addsliderimage = (dishes) => ({
    type: ActionTypes.ADD_SLIDERIMAGE,
    payload: dishes
});












//Register

export const registerUser = (user) => (dispatch) => {

    return fetch(baseUrl+'/users/signup',{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(user)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(data =>{
        if(data.success==true)
        {
            ToastAndroid.show("Successfully Registered!!",ToastAndroid.SHORT)
              dispatch(addUser(user))
        }
        else
        ToastAndroid.show(data.status,ToastAndroid.SHORT)
         
    })
    .catch(error => dispatch(registerFailed(error.message)));
};

export const registerFailed = (errmess) => ({
    type: ActionTypes.REGISTER_FAILED,
    payload: errmess
});

export const addUser = (data) => ({
    type: ActionTypes.REGISTER_DONE,
    payload: data
});

export const registerLoading = () => ({
    type: ActionTypes.REGISTER_LOADING
});

//login




export const loginUser = (user) => (dispatch) => {
    
    return fetch( baseUrl+'/users/login',{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(user)
      
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(data =>{
        if(data.success==true)
        {
            ToastAndroid.show("Login Done!!",ToastAndroid.SHORT)
           dispatch(loginuser(user))
        }
        else
        ToastAndroid.show("Invalid Credentials!!",ToastAndroid.SHORT)
    })
    .catch(error => dispatch(loginFailed(error.message)));
};

export const loginFailed = (errmess) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errmess
});

export const loginuser = (data) => ({
    type: ActionTypes.LOGIN_DONE,
    payload: data
});

export const loginLoading = () => ({
    type: ActionTypes.LOGIN_LOADING
});

export const logoutUser=()=>({
    type: ActionTypes.LOGOUT_DONE,
    payload: {username:null,password:null}
})