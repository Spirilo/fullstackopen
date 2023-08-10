import { Box, Button, TextField } from "@mui/material";

import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { EntryWithoutId, Type } from "../../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
}


const EntryForm = ({ onSubmit }: Props ) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState([]);

  const { id } = useParams();


  

  return (
    <Box sx={{ border: 1 }} component='form' >
      <h3>New HealthCheck entry</h3>
      <TextField
        fullWidth 
        label='Description'
        value={description} 
        onChange={({ target }) => setDescription(target.value) } />
      <TextField 
        fullWidth 
        label='Date' 
        value={date} 
        onChange={({ target }) => setDate(target.value) } />
      <TextField 
        fullWidth 
        label='Specialist'
        value={specialist} 
        onChange={({ target }) => setSpecialist(target.value) } />
      <TextField
        fullWidth 
        label='Healthcheck rating'
        value={healthCheckRating} 
        onChange={({ target }) => setHealthCheckRating(target.value) } />
      <TextField 
        fullWidth 
        label='Diagnosis codes'
        value={diagnosisCodes} 
        onChange={({ target }) => setDiagnosisCodes([]) } />
      <Button type="submit" variant="outlined" color="success">Add</Button>
      <Button variant="outlined" color="error">Cancel</Button>
    </Box>
  )
};

export default EntryForm;