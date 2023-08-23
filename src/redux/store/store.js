import { createStore } from 'redux'
import { configureStore ,combineReducers } from '@reduxjs/toolkit'
import {  
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore
} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserReducers } from '../reducers/UserReducer'



const Rootreducers = combineReducers({
    users: UserReducers            
 });

const persistConfig  = {
    key: 'root',
    version: 1,
    storage : AsyncStorage
  };

  const persistedReducer = persistReducer(persistConfig, Rootreducers);

  

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })


const persistor = persistStore(store);

export { store, persistor }

