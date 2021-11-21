import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { addProduct } from '../productAPI'
import { ProductDto } from '../productDtos'
import { ThunkStatus } from '../../ThunkStatus'
import { fetchCatalogues } from '../../catalogue/catalogueAPI'
import { CatalogueDto } from '../../catalogue/catalogueDtos'

export interface ProductState {
  catalogues: CatalogueDto[]
  product?: ProductDto
  status: ThunkStatus
  catalogueStatus: ThunkStatus
  error?: string
}

const initialState: ProductState = {
  catalogues: [],
  catalogueStatus: ThunkStatus.Idle,
  status: ThunkStatus.Idle,
}

export const createAsync = createAsyncThunk(
  'product/add',
  async (data: {
    name: string
    description: string
    catalogueId: string
    photoUrls: string[]
  }) => {
    const response = await addProduct({
      name: data.name,
      description: data.description,
      catalogueId: data.catalogueId,
      photoUrls: data.photoUrls,
    })
    // The value we return becomes the `fulfilled` action payload
    return response
  }
)

export const fetchCataloguesAsync = createAsyncThunk(
  'product/add/fetchCatalogues',
  async () => {
    const response = await fetchCatalogues()
    // The value we return becomes the `fulfilled` action payload
    return response
  }
)

export const addProductSlice = createSlice({
  name: 'addProduct',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearData: (state) => {
      state.product = undefined
      state.status = ThunkStatus.Idle
      state.catalogueStatus = ThunkStatus.Idle
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(createAsync.pending, (state) => {
        state.status = ThunkStatus.Loading
      })
      .addCase(createAsync.fulfilled, (state, action) => {
        state.status = ThunkStatus.Success
        state.product = action.payload
      })
      .addCase(createAsync.rejected, (state, action) => {
        state.status = ThunkStatus.Failed
        state.error = action.error.message
      })
      .addCase(fetchCataloguesAsync.pending, (state) => {
        state.catalogueStatus = ThunkStatus.Loading
      })
      .addCase(fetchCataloguesAsync.fulfilled, (state, action) => {
        state.catalogueStatus = ThunkStatus.Success
        state.catalogues = action.payload
      })
      .addCase(fetchCataloguesAsync.rejected, (state, action) => {
        state.catalogueStatus = ThunkStatus.Failed
        state.error = action.error.message
      })
  },
})

export const { clearData } = addProductSlice.actions

export default addProductSlice.reducer