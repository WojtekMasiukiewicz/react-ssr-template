import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducer'

interface IStoreParams {
  initialState?: { [key: string]: any }
  middleware?: any[]
}

export const configureStore = ({ initialState, middleware = [] }: IStoreParams) => {
  const devtools =
    typeof window !== 'undefined' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] })

  const composeEnhancers = devtools || compose

  const store = createStore(
    rootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...[thunk].concat(...middleware)))
  )

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducer', () => store.replaceReducer(require('../reducer').default))
    }
  }

  return store
}

export default configureStore
