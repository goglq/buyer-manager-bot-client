import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import LoadingComponent from '../../components/loading'
import {
  clearData,
  deleteAsync,
} from '../../features/product/slices/deleteProductSlice'
import { fetchOneAsync } from '../../features/product/slices/productsSlice'
import { ThunkStatus } from '../../features/ThunkStatus'

const productPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const product = useAppSelector((state) => state.product.product)
  const deleteStatus = useAppSelector((state) => state.deleteProduct.status)

  const { id } = router.query

  const status = useAppSelector((state) => state.product.status)

  useEffect(() => {
    dispatch(fetchOneAsync(router.query.id as string))
  }, [id])

  useEffect(() => {
    if (deleteStatus === ThunkStatus.Success) {
      router.back()
      dispatch(clearData())
    }
  }, [deleteStatus])

  const onDeleteButtonClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(deleteAsync(id as string))
  }

  return status === ThunkStatus.Loading ? (
    <div className="flex justify-center items-center h-rel-screen">
      <LoadingComponent />
    </div>
  ) : (
    <div className="grid grid-cols-6 gap-4 p-5 h-rel-screen">
      <div className="col-span-2 bg-white rounded-lg p-5 space-y-10">
        <h1 className="text-xl font-medium">Информация о товаре</h1>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <span className="text-xl font-medium">ID</span>
            <p className="p-2 rounded-md bg-gray-100  text-lg">{product?.id}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xl font-medium">Название</span>
            <span className="p-2 rounded-md bg-gray-100  text-lg">
              {product?.name}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xl font-medium">Описание</span>
            <p className="p-2 rounded-md bg-gray-100 text-lg">
              {product?.description}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xl font-medium">ID каталога</span>
            <p className="p-2 rounded-md bg-gray-100 text-lg">
              {product?.catalogueId}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xl font-medium">
              ID Сообщения в телеграмме
            </span>
            <p className="p-2 rounded-md bg-gray-100 text-lg">
              {product?.messageId}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-2 bg-white rounded-lg p-5 space-y-10 overflow-y-scroll scroll">
        <h1 className="text-xl font-medium">Картинки</h1>
        <div className="flex flex-col space-y-4 ">
          <img
            className="rounded-md w-full"
            src="https://ru.reactjs.org/logo-og.png"
            alt=""
          />
          <img
            className="rounded-md w-full"
            src="https://ru.reactjs.org/logo-og.png"
            alt=""
          />
          <img
            className="rounded-md w-full"
            src="https://ru.reactjs.org/logo-og.png"
            alt=""
          />
          <img
            className="rounded-md w-full"
            src="https://ru.reactjs.org/logo-og.png"
            alt=""
          />
        </div>
      </div>
      <div className="col-span-2 bg-white rounded-lg p-5 space-y-10">
        <h1 className="text-xl font-medium">Управление товаром</h1>
        <div className="flex flex-col space-y-5">
          <button className="px-5 py-2 rounded-md bg-blue-400 text-white font-bold">
            Изменить
          </button>
          <button
            className="px-5 py-2 rounded-md bg-red-500 text-white font-bold"
            onClick={onDeleteButtonClick}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

export default productPage
