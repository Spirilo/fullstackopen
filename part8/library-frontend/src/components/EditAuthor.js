import { useMutation } from "@apollo/client"
import { EDIT_AUTHOR } from "../queries"
import { useState } from "react"

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: born }})

    setName('')
    setBorn('')
  }

  return(
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map(a => (
              <option 
                key={a.id}
                value={a.name}>
                {a.name}
              </option>
            ))} 
          </select>
        </div>
        <div>
          born
          <input
          type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  )
}

export default EditAuthor