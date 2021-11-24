import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import LoadingComponent from '../../components/loading'
import {
  clearCatalogueFlag,
  fetchCatalogueAsync,
} from '../../features/catalogue/catalogueSlice'
import {
  clearProductFlag,
  fetchProductsAsync,
} from '../../features/product/productsSlice'
import { ThunkStatus } from '../../features/ThunkStatus'

const CataloguePage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const catalogue = useAppSelector((state) => state.catalogue.catalogue)
  const products = useAppSelector((state) => state.product.products)
  const { id } = router.query
  const catalogueStatus = useAppSelector((state) => state.catalogue.status)
  const productStatus = useAppSelector((state) => state.product.status)

  useEffect(() => {
    dispatch(fetchCatalogueAsync(id as string))
    dispatch(fetchProductsAsync(id as string))
  }, [id, dispatch])

  useEffect(() => {
    if (catalogueStatus === ThunkStatus.Success) {
      dispatch(clearCatalogueFlag())
    }
  }, [catalogueStatus, catalogue, dispatch])

  useEffect(() => {
    if (productStatus === ThunkStatus.Success) {
      dispatch(clearProductFlag())
    }
  }, [productStatus, products, dispatch])

  const onChangeClick = () => {}

  const onDeleteClick = () => {}

  return catalogueStatus === ThunkStatus.Loading ? (
    <div className="flex justify-center items-center h-rel-screen">
      <LoadingComponent />
    </div>
  ) : (
    <div className="grid grid-cols-6 gap-4 p-5 h-rel-screen">
      <div className="col-span-2 bg-white rounded-lg p-5 space-y-10">
        <h1 className="text-xl font-medium">Информация о каталоге</h1>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <span className="text-xl font-medium">Название каталога</span>
            <span className="text-lg p-2 rounded-md bg-gray-100 ">
              {catalogue?.name}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xl font-medium">Ссылка на каталог</span>
            <a
              target="_blank"
              className="p-2 rounded-md bg-gray-100 text-blue-600 text-lg"
              href={`https://t.me/${catalogue?.url}`}
              rel="noopener noreferrer"
            >
              @{catalogue?.url}
            </a>
          </div>
        </div>
      </div>
      <div className="col-span-2 bg-white rounded-lg p-5 space-y-10">
        <h1 className="text-xl font-medium">Список товаров в каталоге</h1>
        <div className="flex flex-col space-y-4">
          {products.length > 0 ? (
            products?.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <a className="px-3 py-2 rounded-md bg-pink-400 text-lg text-white font-medium">
                  {product.name}
                </a>
              </Link>
            ))
          ) : (
            <span className="self-center text-lg text-gray-400 font-medium">
              Нет товаров
            </span>
          )}
        </div>
      </div>
      <div className="col-span-2 bg-white rounded-lg p-5 space-y-10">
        <h1 className="text-xl font-medium">Управление каталогом</h1>
        <div className="flex flex-col space-y-5">
          <Link
            href={{
              pathname: '/product/create-product',
              query: { preCatalogueId: catalogue?.id },
            }}
          >
            <a
              className="flex justify-center item-center px-5 py-2 rounded-md bg-green-400 text-white font-bold"
              onClick={onChangeClick}
            >
              Добавить продукт
            </a>
          </Link>

          <button
            className="px-5 py-2 rounded-md bg-blue-400 text-white font-bold"
            onClick={onChangeClick}
          >
            Изменить
          </button>
          <button
            className="px-5 py-2 rounded-md bg-red-500 text-white font-bold"
            onClick={onDeleteClick}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

export default CataloguePage
