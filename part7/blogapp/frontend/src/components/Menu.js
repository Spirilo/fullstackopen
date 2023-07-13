import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Box, createTheme, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(setUser(null))
    window.localStorage.clear()
  }

  if(!user) {
    return(
      <AppBar color='primary' position='static'>
        <Toolbar>
          <Typography>
            BlogApp
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }

  return(
    <AppBar color='primary' position='static'>
      <Toolbar>
        <Box display='flex' flexGrow={1}>
          <Button color='inherit' component={Link} to='/'>Blogs</Button>
          <Button color='inherit' component={Link} to='/users'>Users</Button>
        </Box>
        <Box>
          <Typography>Logged in as {user.name}</Typography>
        </Box>
        <Button color='inherit' onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Menu