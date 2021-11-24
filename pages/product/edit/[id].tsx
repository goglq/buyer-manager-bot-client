import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import LoadingComponent from '../../../components/loading'
import {
  clearCatalogueFlag,
  fetchCataloguesAsync,
} from '../../../features/catalogue/catalogueSlice'
import {
  clearProductFlag,
  editProductAsync,
  fetchProductAsync,
} from '../../../features/product/productsSlice'
import { ThunkStatus } from '../../../features/ThunkStatus'

interface Props {
  id: string
}

const EditProductPage = (props: Props) => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const catalogues = useAppSelector((state) => state.catalogue.catalogues)
  const product = useAppSelector((state) => state.product.product)

  const catalogueStatus = useAppSelector((state) => state.catalogue.status)
  const productStatus = useAppSelector((state) => state.product.status)

  const [errors, setErrors] = useState<{ id: number; error: string }[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [catalogueId, setCatalogueId] = useState<number>(-1)

  const [pictureInputCount, setPictureInputCount] = useState(1)
  const [pictureUrls, setPictureUrls] = useState<{ id: number; url: string }[]>(
    []
  )

  const id = router.query.id as string

  useEffect(() => {
    dispatch(fetchCataloguesAsync())
    dispatch(fetchProductAsync({ id: id, includePictures: true }))
  }, [id, dispatch])

  useEffect(() => {
    if (catalogueStatus === ThunkStatus.Success) {
      dispatch(clearCatalogueFlag())
    }
  }, [catalogueStatus, catalogues, dispatch])

  useEffect(() => {
    if (productStatus === ThunkStatus.Success) {
      setName(product!.name)
      setDescription(product!.description)
      setPictureUrls(
        product!.pictureLinks.map((picture) => ({
          id: picture.id,
          url: picture.url,
        }))
      )
      dispatch(clearProductFlag())
    }
  }, [productStatus, product, dispatch])

  useEffect(() => {
    if (productStatus === ThunkStatus.Success) {
      setCatalogueId(product!.catalogueId)
    }
  }, [product, catalogues, productStatus, catalogueStatus])

  const onAddClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setPictureInputCount(pictureInputCount + 1)
    pictureUrls.push({ id: pictureUrls.length + 1, url: '' })
  }

  const onUrlInputChange = (id: number, value: string) => {
    pictureUrls[id - 1].url = value
    setPictureUrls(pictureUrls)
  }

  const onEditButtonClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const tmpErrors: string[] = []

    if (name.length <= 0) {
      tmpErrors.push('Название товара не может быть пустым')
    }

    if (catalogueId === -1) {
      tmpErrors.push('Выберите каталог')
    }

    if (pictureUrls.length < 1) {
      tmpErrors.push('Введите хотя бы 1 адрес картинки')
    }
    setErrors(
      tmpErrors.map((tmpError) => {
        let i = 0
        return {
          id: i++,
          error: tmpError,
        }
      })
    )

    if (tmpErrors.length > 0) {
      return
    }

    //TODO: Проверить были ли изменения. Если были то продолжить выполнение функции, если нет - уведомить пользователя и закончить выполнение функции

    dispatch(
      editProductAsync({
        id: id,
        edited_product: {
          name: name,
          description: description,
          catalogueId: catalogueId,
          photoUrls: pictureUrls.map((pictureUrl) => pictureUrl.url),
        },
      })
    )
  }

  return productStatus === ThunkStatus.Loading ? (
    <div className="flex justify-center items-center h-rel-screen">
      <LoadingComponent />
    </div>
  ) : (
    <form className="grid grid-cols-6 grid-rows-6 gap-5 w-full h-rel-screen px-10 py-5">
      <div className="col-span-2 row-span-5 rounded-lg bg-white p-10 space-y-5">
        {errors.length > 0 && (
          <div className="flex flex-col space-y-2">
            <label className="text-xl font-medium" htmlFor="">
              Исправльте ошибки
            </label>
            <div className="flex flex-wrap">
              {errors.map((error) => (
                <div
                  key={error.id}
                  className="px-3 py-2 rounded-md bg-red-500 text-white font-medium mb-1 mr-1"
                >
                  {error}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col space-y-2">
          <label className="text-xl font-medium" htmlFor="">
            Название товара <span className="text-red-600">*</span>
          </label>
          <input
            className="px-3 py-2 border-2 rounded border-grey-200"
            type="text"
            placeholder="Куртка Весенняя"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-xl font-medium" htmlFor="">
            Описание товара
          </label>
          <textarea
            className="h-48 px-3 py-2 border-2 rounded border-grey-200 outline-none"
            value={description}
            placeholder="В описание товара могут входить его характеристики, например: его материал, сезон одежды, аксессуары и т.д."
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-xl font-medium" htmlFor="">
            Каталог <span className="text-red-600">*</span>
          </label>
          <select
            className="px-3 py-2 border-2 rounded border-grey-200 outline-none"
            defaultValue={catalogueId}
            onChange={(e) => {
              setCatalogueId(parseInt(e.target.value))
            }}
          >
            <option value={-1}>Выберите каталог</option>
            {catalogues.map((catalogue) => (
              <option key={catalogue.id} value={catalogue.id}>
                {catalogue.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-span-2 row-span-5 flex flex-col rounded-lg bg-white p-10 space-y-5 overflow-y-scroll scroll">
        <label className="text-xl font-medium" htmlFor="">
          Ссылки на картинки <span className="text-red-600">*</span>{' '}
          <span className="text-gray-200">минимум 1 картинка</span>
        </label>
        {pictureUrls.map((pictureUrl) => (
          <input
            key={pictureUrl.id}
            className={
              pictureUrl.url.length > 0
                ? 'px-3 py-2 border-2 rounded border-green-400 outline-none'
                : 'px-3 py-2 border-2 rounded border-grey-200 outline-none'
            }
            type="text"
            placeholder="http://example.picture.resource/album/2/picture/5"
            defaultValue={pictureUrl.url}
            onChange={(e) =>
              onUrlInputChange(pictureUrl.id, e.currentTarget.value)
            }
          />
        ))}
        <button
          className="rounded-md bg-blue-400 py-2 text-white font-medium"
          onClick={onAddClick}
        >
          Добавить картнику
        </button>
      </div>
      <div className="col-span-2 row-span-5 flex flex-col rounded-lg bg-white p-10 space-y-5 overflow-y-scroll scroll">
        <label className="text-xl font-medium" htmlFor="">
          Превью картинок
        </label>
        {pictureUrls.map((pictureUrl) =>
          pictureUrl.url.length > 0 ? (
            <img key={pictureUrl.id} src={pictureUrl.url} alt="preview" />
          ) : (
            <span key={pictureUrl.id} className="self-center text-bold">
              . . .
            </span>
          )
        )}
      </div>
      <button
        className="col-span-3 rounded-lg bg-blue-400 text-2xl text-white font-medium hover:bg-blue-500 transition-colors duration-200 ease-in-out"
        onClick={onEditButtonClick}
      >
        Изменить
      </button>
      <button className="col-span-3 rounded-lg bg-red-500 text-2xl text-white font-medium">
        Отменить
      </button>
    </form>
  )
}
export default EditProductPage
