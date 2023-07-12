import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(setUser(null))
    window.localStorage.clear()
  }

  if(!user) return null

  return(
    <h4>
      logged in as {user.username}{' '}
      <button onClick={handleLogout}>logout</button>{' '}
    </h4>
  )
}

export default Header