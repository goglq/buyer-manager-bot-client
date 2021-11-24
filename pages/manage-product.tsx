import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearProductFlag,
  fetchProductsAsync,
} from '../features/product/productsSlice'
import { ThunkStatus } from '../features/ThunkStatus'

const ManageCataloguePage: NextPage = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.product.products)
  const status = useAppSelector((state) => state.product.status)

  useEffect(() => {
    dispatch(fetchProductsAsync())
  }, [dispatch])

  useEffect(() => {
    if (status === ThunkStatus.Success) {
      dispatch(clearProductFlag())
    }
  }, [status, products, dispatch])

  return (
    <div className="grid grid-cols-4 gap-4 p-5 h-rel-screen">
      <div className="col-span-3 rounded-lg bg-white px-6 py-4 space-y-8">
        <h1 className="text-2xl font-medium">Список товаров</h1>
        <ul className="flex flex-col space-y-3">
          {products.map((product) => (
            <li key={product.id} className="flex">
              <Link href={`/product/${product.id}`}>
                <a className="w-full py-2 rounded-md bg-pink-100 text-lg font-medium px-5">
                  {product.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-4 rounded-lg bg-white space-y-8">
        <h1 className="text-2xl font-medium">Управление каталогами</h1>
        <div className="flex flex-col space-y-3">
          <Link href="/product/create-product">
            <a className="flex justify-center items-center px-5 py-2 rounded-md bg-green-400 text-white font-bold hover:bg-green-500 transition-colors duration-200 ease-in-out">
              Добавить
            </a>
          </Link>
          <div className="flex flex-col space-y-3">
            <div className="bg-blue-100 px-5 py-2 rounded-md">
              <p>
                Чтобы изменить продукт нажмите на него и затем нажмите на кнопку
                изменить
              </p>
            </div>
            <div className="bg-red-100 px-5 py-2 rounded-md">
              <p>
                Для удаления продукта нажмите на него и затем нажмите на кнопку
                удалить
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageCataloguePage
