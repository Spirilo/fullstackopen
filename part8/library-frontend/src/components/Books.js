import { useEffect } from "react"
import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"

const Books = (props) => {
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  console.log(result)  
  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

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
    </div>
  )
}

export default Books
