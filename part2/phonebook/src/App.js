import { useEffect, useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personService from './services/personService'
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  console.log(persons)

  useEffect(() => {
    personService.getAll()
      .then(persons => {
        setPersons(persons)
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
      let p = persons.find(p => p.name === person.name)
      if (window.confirm(`${p.name} is already added, replace the number?`)) {
        personService.update(p.id, person)
          .then(p => console.log(p))
      }
    } else {
      personService.create(person)
        .then(person => {
          console.log(person)
          setPersons(persons.concat(person))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    let p = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${p.name}?`)) {
      personService.dlt(id)
        .then(x => console.log("Poistettiin tietokannasta"))
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={ev => changeFilter(ev.target.value)}/>
      <h2>Add a new</h2>
      <PersonForm name={newName} number={newNumber} nameChange={ev => changeName(ev.target.value)}
        numberChange={ev => changeNumber(ev.target.value)} addPerson={ev => addPerson(ev)} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} dlt={ev => deletePerson(ev)}/>
    </div>
  )

}

export default App
