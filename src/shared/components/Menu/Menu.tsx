import React from 'react'

import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'

const Menu = () => {
  return (
    <>
      <Drawer variant='permanent'>
        <List style={{ marginTop: 64 }}>
          <ListItem />
          <ListItem button>
            <ListItemIcon>
              <LibraryAddIcon />
            </ListItemIcon>
            <ListItemText primary='List Item' />
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default Menu
