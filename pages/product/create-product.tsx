import { randomInt } from 'crypto'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  clearCatalogueFlag,
  fetchCataloguesAsync,
} from '../../features/catalogue/catalogueSlice'
import {
  clearProductFlag,
  createProductAsync,
} from '../../features/product/productsSlice'
import { ThunkStatus } from '../../features/ThunkStatus'

interface Props {
  preCatalogueId: number
}

const CreateProductPage = ({ preCatalogueId }: Props) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const product = useAppSelector((state) => state.product.product)
  const catalogues = useAppSelector((state) => state.catalogue.catalogues)

  const productStatus = useAppSelector((state) => state.product.status)
  const catalogueStatus = useAppSelector((state) => state.catalogue.status)

  const [errors, setErrors] = useState<{ id: number; error: string }[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [catalogueId, setCatalogueId] = useState<number>(preCatalogueId)

  const [pictureInputKey, setPictureInputKey] = useState(0)
  const [pictureUrls, setPictureUrls] = useState<
    { id: number; url: string; isCommited: boolean }[]
  >([])

  useEffect(() => {
    dispatch(fetchCataloguesAsync())
  }, [dispatch])

  useEffect(() => {
    if (catalogueStatus === ThunkStatus.Success) {
      dispatch(clearCatalogueFlag())
    }
  }, [catalogueStatus, catalogues, dispatch])

  useEffect(() => {
    if (productStatus === ThunkStatus.Success) {
      dispatch(clearProductFlag())
      router.push('/manage-product')
    }
  }, [productStatus, product, dispatch, router])

  const onCreateButtonClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    //setErrors([])
    const tmpErrors = []

    setPictureUrls([
      ...pictureUrls.filter((pictureUrl) => pictureUrl.url.length > 0),
    ])

    console.log(
      pictureUrls
        .filter((pictureUrl) => pictureUrl.url.length > 0)
        .map((pictureUrl) => pictureUrl.url)
    )

    if (name.length <= 0) {
      tmpErrors.push('Название товара не указано!')
    }
    if (pictureUrls.length <= 0) {
      tmpErrors.push('У товара должна быть хотя бы одна картинка!')
    }
    if (catalogueId === -1) {
      tmpErrors.push('Выберите каталог, где будет размещен товар!')
    }

    let i = 0
    setErrors(
      tmpErrors.map((tmpError) => {
        return {
          id: i++,
          error: tmpError,
        }
      })
    )

    if (tmpErrors.length > 0) {
      return
    }

    dispatch(
      createProductAsync({
        name: name,
        description: description,
        catalogueId: catalogueId.toString(),
        photoUrls: pictureUrls
          .filter((pictureUrl) => pictureUrl.url.length > 0)
          .map((pictureUrl) => pictureUrl.url),
      })
    )
  }

  const onAddClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    pictureUrls.push({ id: pictureInputKey, url: '', isCommited: false })
    setPictureInputKey(pictureInputKey + 1)
    setPictureUrls([...pictureUrls])

    console.log(pictureUrls)
  }

  const onEnterPress = (
    id: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const pictureUrl = pictureUrls.find((pictureUrl) => pictureUrl.id === id)
    if (e.key === 'Enter') {
      e.preventDefault()
      pictureUrl!.url = e.currentTarget.value
      pictureUrl!.isCommited = pictureUrl!.url.length > 0
      setPictureUrls([...pictureUrls])
      console.log('onEnter', pictureUrls)
    } else {
      pictureUrl!.isCommited = false
      setPictureUrls([...pictureUrls])
    }
  }

  const onDeletePress = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    setPictureUrls([
      ...pictureUrls.filter((pictureUrl) => pictureUrl.id !== id),
    ])
    console.log('on delete', pictureUrls)
  }

  return (
    <div className="flex h-rel-screen px-10 py-5">
      <form className="grid grid-cols-3 grid-rows-6 gap-5 w-full h-full">
        <div className="row-span-5 rounded-lg bg-white p-10 space-y-5">
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
                    {error.error}
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
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-xl font-medium" htmlFor="">
              Описание товара
            </label>
            <textarea
              className="h-48 px-3 py-2 border-2 rounded border-grey-200 outline-none"
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
              placeholder="Куртка Весенняя"
              defaultValue={preCatalogueId}
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
        <div className="row-span-5 flex flex-col rounded-lg bg-white p-10 space-y-5 overflow-y-scroll scroll">
          <label className="text-xl font-medium" htmlFor="">
            Ссылки на картинки <span className="text-red-600">*</span>{' '}
            <span className="text-gray-200">минимум 1 картинка</span>
          </label>
          {pictureUrls.map((pictureUrl) => (
            <div key={pictureUrl.id} className="flex w-full">
              <input
                className={
                  pictureUrl.isCommited
                    ? 'flex-grow px-3 py-2 border-2 rounded-md rounded-tr-none rounded-br-none bg-green-100 border-green-200 outline-none'
                    : 'flex-grow px-3 py-2 border-2 rounded-md rounded-tr-none rounded-br-none border-grey-200 outline-none'
                }
                type="text"
                placeholder="http://example.picture.resource/album/2/picture/5"
                onKeyPress={(e) => onEnterPress(pictureUrl.id, e)}
              />
              <button
                className="flex-none bg-red-400 rounded-md rounded-tl-none rounded-bl-none px-2 text-white font-medium transition-colors hover:bg-red-500"
                onClick={(e) => onDeletePress(pictureUrl.id, e)}
              >
                Отменить
              </button>
            </div>
          ))}
          <button
            className="rounded-md bg-blue-400 py-2 text-white font-medium hover:bg-blue-500 transition-colors duration-200 ease-in-out"
            onClick={onAddClick}
          >
            Добавить картнику
          </button>
        </div>
        <div className="row-span-5 flex flex-col rounded-lg bg-white p-10 space-y-5 overflow-y-scroll scroll">
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
          className="col-span-3 rounded-lg bg-green-400 text-2xl text-white font-medium hover:bg-green-500 transition-colors duration-200 ease-in-out"
          onClick={onCreateButtonClick}
        >
          Создать
        </button>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query)
  // returns { id: episode.itunes.episode, title: episode.title}

  //you can make DB queries using the data in context.query
  if (context.query.preCatalogueId !== undefined) {
    return {
      props: {
        preCatalogueId: context.query.preCatalogueId as string, //pass it to the page props
      },
    }
  }

  return {
    props: {
      preCatalogueId: -1,
    },
  }
}

export default CreateProductPage
