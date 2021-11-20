import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import LoadingComponent from '../../components/loading'
import { fetchOneAsync } from '../../features/catalogue/slices/cataloguesSlice'
import { ThunkStatus } from '../../features/ThunkStatus'

const cataloguePage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const catalogue = useAppSelector((state) => state.catalogue.catalogue)
  const { id } = router.query
  const status = useAppSelector((state) => state.catalogue.status)

  useEffect(() => {
    dispatch(fetchOneAsync(router.query.id as string))
  }, [id])

  const onChangeClick = () => {}

  const onDeleteClick = () => {}

  return status === ThunkStatus.Loading ? (
    <div className="flex justify-center items-center h-rel-screen">
      <LoadingComponent />
    </div>
  ) : (
    <div className="grid grid-cols-6 gap-4 p-5 h-rel-screen">
      <div className="col-span-2 bg-white rounded-lg p-5 space-y-10">
        <h1 className="text-xl font-medium">Информация о каталоге</h1>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <span className="text-xl font-medium">Название</span>
            <span className="text-lg">{catalogue?.name}</span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xl font-medium">Ссылка на каталог</span>
            <a
              className="text-blue-600 text-lg"
              href={`https://t.me/${catalogue?.url}`}
            >
              @{catalogue?.url}
            </a>
          </div>
        </div>
      </div>
      <div className="col-span-2 bg-white rounded-lg p-5 space-y-10">
        <h1 className="text-xl font-medium">Список товаров в каталоге</h1>
        <div className="flex flex-col space-y-4">
          <Link href="/product/3">
            <a className="px-5 py-2 rounded-md bg-blue-100">
              <span className="font-medium">Product name</span>
            </a>
          </Link>

          <Link href="/product/3">
            <a className="px-5 py-2 rounded-md bg-blue-100">
              <span className="font-medium">Product name</span>
            </a>
          </Link>
        </div>
      </div>
      <div className="col-span-2 bg-white rounded-lg p-5 space-y-10">
        <h1 className="text-xl font-medium">Управление каталогом</h1>
        <div className="flex flex-col space-y-5">
          <button
            className="px-5 py-2 rounded-md bg-green-400 text-white font-bold"
            onClick={onChangeClick}
          >
            Добавить продукт
          </button>
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

export default cataloguePage
