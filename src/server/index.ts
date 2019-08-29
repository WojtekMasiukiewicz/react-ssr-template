import chalk from 'chalk'
import cors from 'cors'
import * as express from 'express'
import manifestHelpers from 'express-manifest-helpers'
import path from 'path'

import paths from '../../config/paths'
import configureStore from '../shared/redux/store'
import errorHandler from './middleware/errorHandler'
import serverSideRender from './middleware/serverSideRender'

const app = express.default()

if (process.env.NODE_ENV === 'development') {
  console.log(path.join(paths.clientBuild, paths.publicPath))
  app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)))
}

app.use(cors())

const addStore = (req: express.Request, res: express.Response, next: express.NextFunction | undefined): void => {
  res.locals.store = configureStore({})
  if (typeof next !== 'function') {
    throw new Error('Next handler is missing')
  }
  next()
}

app.use(addStore)

const manifestPath = path.join(paths.clientBuild, paths.publicPath)

app.use(
  manifestHelpers({
    manifestPath: `${manifestPath}/manifest.json`
  })
)

app.use(serverSideRender)

app.use(errorHandler)
console.log('PORT', process.env.PORT)
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(`App is running: http://localhost:${process.env.PORT || 3000}`)
  )
})

export default app
