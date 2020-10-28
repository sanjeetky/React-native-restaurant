import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {dishes} from './dishes';
import {comments} from './comments';
import {cart} from './cart'
import {user} from './user';
import {sliderimage} from './sliderimage';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';


const config = {
    key: 'root',
    storage:AsyncStorage,
    debug: true
  }

export const ConfigureStore=()=>{
    const store = createStore(
        persistCombineReducers(config, {
            dishes,
            comments,
            user,
            cart,
            sliderimage
        }),
        applyMiddleware(thunk,logger)
    );

    const persistor = persistStore(store)
    return {store,persistor};
}