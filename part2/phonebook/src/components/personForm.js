const PersonForm = ({name, number, nameChange, numberChange, addPerson}) => {
  return (
    <form>
      <div>name: <input value={name} onChange={nameChange} /></div>
      <div>number: <input value={number} onChange={numberChange} /></div>
      <div><button type="submit" onClick={addPerson} >add</button></div>
    </form>
  )
}

export default PersonForm