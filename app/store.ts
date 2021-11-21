import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'
import productReducer from '../features/product/slices/productsSlice'
import cataloguesReducer from '../features/catalogue/slices/cataloguesSlice'
import fetchCatalogueReducer from '../features/catalogue/slices/fetchCatalogueSlice'
import fetchProductReducer from '../features/product/slices/fetchProductSlice'
import addProductReducer from '../features/product/slices/addProductSlice'
import deleteProductReducer from '../features/product/slices/deleteProductSlice'
import addCatalogueReducer from '../features/catalogue/slices/addCatalogueSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      products: productReducer,
      product: fetchProductReducer,
      addProduct: addProductReducer,
      deleteProduct: deleteProductReducer,
      catalogues: cataloguesReducer,
      catalogue: fetchCatalogueReducer,
      addCatalogue: addCatalogueReducer,
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
