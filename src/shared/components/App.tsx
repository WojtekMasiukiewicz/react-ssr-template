import { CssBaseline } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import Menu from './Menu/Menu'
import TopBar from './Menu/TopBar'

class App extends React.Component<any, any> {
  render() {
    return (
      <>
        <CssBaseline />
        <Header />
        <Container>
          <TopBar />
          <Menu />
        </Container>
      </>
    )
  }
}

const Container = styled.main`
  margin: 0;
  padding: 0;
  display: flex;
`

export default App
