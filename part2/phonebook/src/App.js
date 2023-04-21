import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const changeFilter = ev => {
    setFilter(ev)
  }

  const changeName = ev => {
    setNewName(ev)
  }

  const changeNumber = ev => {
    setNewNumber(ev)
  }

  const addPerson = ev => {
    ev.preventDefault()
    let person = {name: newName, number: newNumber}
    if (persons.find(p => p.name === person.name)) {
      alert(`${person.name} is already in the phonebook!`)
    } else {
      setPersons(persons.concat(person))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={ev => changeFilter(ev.target.value)}/>
      <h2>Add a new</h2>
      <PersonForm name={newName} number={newNumber} nameChange={ev => changeName(ev.target.value)}
        numberChange={ev => changeNumber(ev.target.value)} addPerson={ev => addPerson(ev)} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )

}

export default App
