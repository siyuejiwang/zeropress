import { Switch } from './Switch'
import { LOGO_MAP } from './consts'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useDark, useWindowScroll } from 'runtime/default-theme/hooks'
import { NavItem, ThemeConfig } from 'shared/types'

export function Nav({ nav }: { nav: ThemeConfig['nav'] }) {
  const { y: isScrolled } = useWindowScroll()
  const [pathname, setPathname] = useState<string>()

  const left = nav?.filter((item) => item.position === 'left')

  const right = nav?.filter(
    (item) => item.position === 'right' || item.position === undefined,
  )

  const getItem = (item: NavItem) => {
    const { text, img, logo, dark } = item

    if (text) {
      return <TextItem item={item} pathname={pathname}></TextItem>
    } else if (logo) {
      return <LogoItem item={item}></LogoItem>
    } else if (img) {
      return <ImgItem item={item}></ImgItem>
    } else if (dark) {
      return <DarkItem></DarkItem>
    } else {
      return <></>
    }
  }

  // 获取pathname
  useEffect(() => {
    setPathname(location.pathname)
  }, [])

  return (
    <header className="fixed left-0 top-0 z-10 w-full">
      <div
        className={classNames(
          isScrolled
            ? 'border-divider bg-bg-soft'
            : 'border-transparent bg-transparent',
          'h-nav border-b px-[12px] pt-px transition-colors duration-300',
        )}
      >
        <div className="flex h-full items-center justify-between">
          <div className="flex justify-start">
            {left?.map((item, index) => {
              return <div key={`${item.link}${index}`}>{getItem(item)}</div>
            })}
          </div>

          <div className="flex justify-end">
            {right?.map((item, index) => {
              return <div key={`${item.link}${index}`}>{getItem(item)}</div>
            })}
          </div>
        </div>
      </div>
    </header>
  )
}

function TextItem({ item, pathname }: { item: NavItem; pathname?: string }) {
  const { text, link } = item
  const active = link && pathname?.includes(link)

  if (!text) {
    return <></>
  }

  return (
    <nav className="mx-[12px] h-full justify-end">
      <a href={link} className="flex h-full items-center">
        <span
          className={classNames(
            active ? 'text-text-1' : 'text-text-2',
            'font-500 text-hover whitespace-nowrap text-[14px]',
          )}
        >
          {text}
        </span>
      </a>
    </nav>
  )
}

function LogoItem({ item }: { item: NavItem }) {
  const { logo, link } = item

  if (!logo) {
    return <></>
  }

  return (
    <nav className="mx-[12px] h-full">
      <a href={link} className="flex h-full items-center">
        <span
          className={classNames(
            LOGO_MAP[logo],
            'text-text-2 text-hover h-[24px] w-[24px]',
          )}
        ></span>
      </a>
    </nav>
  )
}

function ImgItem({ item }: { item: NavItem }) {
  const { img, link } = item

  if (!img) {
    return <></>
  }

  return (
    <nav className="mx-[12px] h-full">
      <a href={link} className="flex h-full items-center">
        <img src={img} className="h-[24px] w-[24px]"></img>
      </a>
    </nav>
  )
}

function DarkItem() {
  const { toggle } = useDark()

  return (
    <nav className="mx-[4px] flex h-full items-center">
      <Switch onClick={toggle}></Switch>
    </nav>
  )
}
