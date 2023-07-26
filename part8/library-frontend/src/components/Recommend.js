import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS } from "../queries"

const Recommend = (props) => {
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    if(props.user) {
      setGenre(props.user.favoriteGenre)
    }
  }, [])

  const books = useQuery(ALL_BOOKS, {
    variables: { genre: genre},
  })

  const recommended = books.data.allBooks

  if(!props.show) return null

  return(
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite category <b>{genre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommended.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend