import { Layout } from 'default-theme/Layout'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { PageDataProvider } from 'runtime/PageDataProvider'
import { getPageData } from 'runtime/usePageData'
import routes from 'virtual:routes'

/**
 * 渲染无请求的html
 * @description 不同的location拿到不同路由的的html，多html实现mpa路由
 */
export async function render(location: string) {
  const pageData = await getPageData(location)

  // https://reactrouter.com/en/main/guides/ssr#without-a-data-router
  const html = renderToString(
    <PageDataProvider value={{ pageData }}>
      <StaticRouter location={location}>
        <Layout></Layout>
      </StaticRouter>
    </PageDataProvider>,
  )

  return html
}

// 导出虚拟模块的路由给build完成mpa渲染html
export { routes }
