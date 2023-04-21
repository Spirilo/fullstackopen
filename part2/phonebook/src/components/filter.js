const Filter = ({filter, handleChange}) => {
  return (
    <p>filter shown with <input value={filter} onChange={handleChange} /></p>
  )
}

export default Filter