import { useMutation } from "@apollo/client"
import { EDIT_AUTHOR } from "../queries"
import { useState } from "react"

const EditAuthor = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  console.log(typeof(born))

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
          name
          <input 
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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