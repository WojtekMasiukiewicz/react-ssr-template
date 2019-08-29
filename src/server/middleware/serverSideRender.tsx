import { ServerStyleSheets } from '@material-ui/styles'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { Store } from 'redux'

import App from '../../shared/components/App'
import Html from '../Html'

const serverSideRender: any = (req: express.Request & { store: Store }, res: express.Response) => {
  const sheet = new ServerStyleSheets()

  const content = renderToString(
    sheet.collect(
      <Provider store={res.locals.store}>
        <StaticRouter location={req.url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    )
  )

  const state = JSON.stringify(res.locals.store.getState())
  const styles = sheet.getStyleElement()

  return res.send(
    '<!doctype html>' +
      renderToString(
        <Html
          css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
          styles={styles}
          scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
          state={state}
        >
          {content}
        </Html>
      )
  )
}

export default serverSideRender
