import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchAsync } from '../features/catalogue/slices/cataloguesSlice'

const manageProductPage: NextPage = () => {
  const dispatch = useAppDispatch()
  const catalogues = useAppSelector((state) => state.catalogues.catalogues)

  useEffect(() => {
    dispatch(fetchAsync())
  }, [catalogues])

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
            <a className="flex justify-center items-center px-5 py-2 rounded-md bg-green-400 text-white font-bold">
              Добавить
            </a>
          </Link>
          <button className="px-5 py-2 rounded-md bg-blue-400 text-white font-bold">
            Изменить
          </button>
          <button className="px-5 py-2 rounded-md bg-red-500 text-white font-bold">
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

export default manageProductPage
