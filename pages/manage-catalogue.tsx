import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearCatalogueFlag,
  fetchCataloguesAsync,
} from '../features/catalogue/catalogueSlice'
import { ThunkStatus } from '../features/ThunkStatus'

const ManageProductPage: NextPage = () => {
  const dispatch = useAppDispatch()
  const catalogues = useAppSelector((state) => state.catalogue.catalogues)
  const status = useAppSelector((state) => state.catalogue.status)

  useEffect(() => {
    dispatch(fetchCataloguesAsync())
  }, [dispatch])

  useEffect(() => {
    if (status === ThunkStatus.Success) {
      dispatch(clearCatalogueFlag())
    }
  }, [status, catalogues, dispatch])

  return (
    <div className="grid grid-cols-4 gap-4 p-5 h-rel-screen">
      <div className="col-span-3 rounded-lg bg-white px-6 py-4 space-y-8">
        <h1 className="text-2xl font-medium">Список каталогов</h1>
        <ul className="flex flex-col space-y-3">
          {catalogues.map((catalogue) => (
            <li key={catalogue.id} className="flex">
              <Link href={`/catalogue/${catalogue.id}`}>
                <a className="w-full py-2 rounded-md bg-yellow-100 text-lg font-medium px-5">
                  {catalogue.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-4 rounded-lg bg-white space-y-8">
        <h1 className="text-2xl font-medium">Управление каталогами</h1>
        <div className="flex flex-col space-y-3">
          <Link href="/catalogue/create-catalogue">
            <a className="flex justify-center items-center px-5 py-2 rounded-md bg-green-400 text-white font-bold hover:bg-green-500 transition-colors duration-200 ease-in-out">
              Добавить
            </a>
          </Link>
          <div className="flex flex-col space-y-3">
            <div className="bg-blue-100 px-5 py-2 rounded-md">
              <p>
                Чтобы изменить каталог нажмите на него и затем нажмите на кнопку
                изменить
              </p>
            </div>
            <div className="bg-red-100 px-5 py-2 rounded-md">
              <p>
                Для удаления каталога нажмите на него и затем нажмите на кнопку
                удалить
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageProductPage
