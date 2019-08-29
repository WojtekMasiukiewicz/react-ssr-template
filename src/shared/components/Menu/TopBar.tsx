import React from 'react'

import { AppBar, Toolbar, Typography } from '@material-ui/core'

const TopBar = () => {
  return (
    <AppBar position='fixed' style={{ zIndex: 10000 }}>
      <Toolbar>
        <Typography variant='h6' noWrap>
          Template SSR App
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
