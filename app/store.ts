import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'
import productReducer from '../features/product/slices/productsSlice'
import cataloguesReducer from '../features/catalogue/slices/cataloguesSlice'
import fetchCatalogueReducer from '../features/catalogue/slices/fetchCatalogueSlice'
import fetchProductReducer from '../features/product/slices/fetchProductSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      products: productReducer,
      product: fetchProductReducer,
      catalogues: cataloguesReducer,
      catalogue: fetchCatalogueReducer,
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
