import { Doc } from './components/Doc/Doc'
import { Home } from './components/Home'
import { Nav } from './components/Nav'
import { NotFound } from './components/NotFound'
import './styles/base.css'
import './styles/doc.css'
import { Content, usePageData } from 'runtime'

/**
 * 主题入口
 */
export function Layout() {
  const { pageData } = usePageData()
  console.log('页面数据：', pageData)

  const getPage = () => {
    const pageType = pageData?.pageType

    if (pageType === 'home') {
      return (
        <Home
          title={pageData?.userConfig.title}
          description={pageData?.userConfig.description}
        ></Home>
      )
    } else if (pageType === 'doc') {
      return <Doc content={<Content></Content>} toc={pageData?.toc}></Doc>
    } else if (pageType === '404') {
      return <NotFound></NotFound>
    } else {
      return <></>
    }
  }

  return (
    <>
      <Nav></Nav>
      {getPage()}
    </>
  )
}
