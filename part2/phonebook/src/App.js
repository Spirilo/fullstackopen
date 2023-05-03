import { useEffect, useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personService from './services/personService'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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
          .then(p => {
            setErrorMessage(`${p.name} was updated!`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${p.name} was already deleted!`)
            setTimeout(() => {
              setErrorMessage(null)
              window.location.reload()
            }, 5000);
          })
        }
    } else {
      personService
        .create(person)
        .then(person => {
          setPersons(persons.concat(person))
          setErrorMessage(`${person.name} was added!`)
          setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
      setErrorMessage(`${p.name} was deleted!`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
