import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return(
    <div>
      <Link to='/' style={padding}>Blogs</Link>
      <Link to='/users' style={padding}>Users</Link>
    </div>
  )
}

export default Menu