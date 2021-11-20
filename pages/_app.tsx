import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../app/store'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const isActive = (
    route: string,
    defaultClassName: string,
    activeClassName: string
  ) => {
    return router.route === route ? activeClassName : defaultClassName
  }

  const defaultClass =
    'px-10 py-3 text-lg font-medium transition-all duration-500 ease-in-out'
  const activeClass =
    'rounded-full px-10 py-2 text-lg font-medium text-white bg-black transition-all duration-500 ease-in-out'

  return (
    <Provider store={store}>
      <Head>
        <title>Панель управления BuyerBot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-center items-center h-20">
        <nav className="rounded-full bg-white px-10 py-4">
          <ul className="flex space-x-10">
            <li>
              <Link href="/">
                <a className={isActive('/', defaultClass, activeClass)}>
                  Главная
                </a>
              </Link>
            </li>
            <li>
              <Link href="/manage-catalogue">
                <a
                  className={isActive(
                    '/manage-catalogue',
                    defaultClass,
                    activeClass
                  )}
                >
                  Управление каталогом
                </a>
              </Link>
            </li>
            <li>
              <Link href="/manage-product">
                <a
                  className={isActive(
                    '/manage-product',
                    defaultClass,
                    activeClass
                  )}
                >
                  Управление товарами
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
