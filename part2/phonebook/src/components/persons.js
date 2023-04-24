const Persons = ({persons, filter, dlt}) => {

  let show = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .map(s => <p>{s.name} {s.number}<button onClick={() => dlt(s.id)} >delete</button></p>  )

  return(
    <>
      {show}
    </>
  )
}

export default Persons