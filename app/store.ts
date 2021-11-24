import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'
import productReducer from '../features/product/productsSlice'
import catalogueReducer from '../features/catalogue/catalogueSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      product: productReducer,
      catalogue: catalogueReducer,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
