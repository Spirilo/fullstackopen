import { useEffect, useState } from "react"
import { ALL_BOOKS, ALL_GENRES } from "../queries"
import { useQuery } from "@apollo/client"

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
    variables: { genre: genre }
  })
  const genres = useQuery(ALL_GENRES)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  
  const books = result.data.allBooks
  const allGenres = genres.data.allGenres

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{genre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map(g => (
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      ))}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
