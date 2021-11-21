import router from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  clearData,
  createAsync,
} from '../../features/catalogue/slices/addCatalogueSlice'
import { ThunkStatus } from '../../features/ThunkStatus'

const createCataloguePage = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.addCatalogue.status)

  const [errors, setErrors] = useState<string[]>([])
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (status === ThunkStatus.Success) {
      router.push('/manage-catalogue')
      dispatch(clearData())
    }
  }, [status])

  const onCreateButtonClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const tmpErrors = []

    if (name.length <= 0) {
      tmpErrors.push('Введите имя канала/каталога')
    }
    if (url.length <= 0) {
      tmpErrors.push('Введите адрес канала/каталога')
    }

    setErrors(tmpErrors)

    if (tmpErrors.length > 0) {
      return
    }

    dispatch(createAsync({ name, url }))
  }

  return (
    <div className="flex flex-col justify-center items-center h-rel-screen">
      <form className="w-96 flex flex-col p-5 bg-white rounded-lg space-y-4">
        <div className="flex px-3 py-1 rounded-md bg-blue-400 text-white font-medium">
          <span className="flex justify-center text-center text-4xl">!</span>
          <p className="ml-3">
            Введите название и адрес канала, где{' '}
            <a
              target="_blank"
              className="px-2 rounded-full bg-gray-200 text-black"
              href="https://t.me/buyermanager_bot"
            >
              @buyermanager_bot
            </a>{' '}
            является администратором
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium" htmlFor="">
            Название канала <span className="text-red-500">*</span>
          </label>
          <input
            className="px-3 py-2 border-2 border-grey-500 rounded-md outline-none"
            type="text"
            placeholder="Одежда"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium" htmlFor="">
            Адрес канала <span className="text-red-500">*</span>
          </label>
          <input
            className="px-3 py-2 border-2 border-grey-500 rounded-md outline-none"
            type="text"
            placeholder="luckybuyer888_clothes"
            value={url}
            onChange={(e) => setUrl(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col mt-2">
          {errors.map((error) => (
            <span className="px-1 py-1 rounded-md bg-red-500 text-white text-center font-medium mb-1 mr-1">
              {error}
            </span>
          ))}
        </div>
        <button
          className="py-2 rounded-md bg-green-500 text-lg text-white font-medium"
          onClick={onCreateButtonClick}
        >
          Создать
        </button>
      </form>
    </div>
  )
}

export default createCataloguePage
