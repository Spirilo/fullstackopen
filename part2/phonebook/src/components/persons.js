const Persons = ({persons, filter}) => {
  
  let show = filter ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
  .map(s => <p>{s.name} {s.number}</p>) : persons.map(p => <p key={p.name} >{p.name} {p.number}</p>)

  return(
    <>
      {show}
    </>
  )
}

export default Persons