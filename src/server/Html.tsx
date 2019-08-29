import React, { ReactNode } from 'react'
import Helmet from 'react-helmet'

interface IProps {
  children: any
  scripts: string[]
  css: string[]
  state: string
  styles: ReactNode
}

class Html extends React.Component<IProps> {
  render() {
    const { children, scripts = [], css = [], state = '{}', styles } = this.props
    const helmet = Helmet.renderStatic()

    return (
      <html>
        <head>
          <meta charSet='UTF-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />

          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}

          {css.filter(Boolean).map((href) => (
            <link key={href} rel='stylesheet' href={href} />
          ))}
          {styles}
          <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${state}` }} />
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{ __html: children }} />

          {scripts.filter(Boolean).map((src) => (
            <script key={src} src={src} />
          ))}
        </body>
      </html>
    )
  }
}

export default Html
