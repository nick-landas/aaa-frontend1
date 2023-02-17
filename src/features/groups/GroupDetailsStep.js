import React, { useState } from 'react'
import TextField from '@mui/material/TextField'

const GroupDetailsStep = ({
  name,
  description,
  handleNameChange,
  handleDescriptionChange,
}) => {
  const [nameError, setNameError] = useState(false)
  const [descError, setDescError] = useState(false)
  const [nameErrMsg, setNameErrMsg] = useState(null)
  const [descErrMsg, setDescErrMsg] = useState(null)

  const handleNameValidation = () => {
    if (name.length === 0) {
      setNameError(true)
      setNameErrMsg('Name is required')
    } else {
      setNameError(false)
      setNameError(null)
    }
  }

  const handleDescValidation = () => {
    if (description.length === 0) {
      setDescError(true)
      setDescErrMsg('Description is required')
    } else {
      setDescError(false)
      setDescError(null)
    }
  }

  return (
    <>
      <TextField
        autoComplete="false"
        error={nameError}
        helperText={nameErrMsg}
        autoFocus
        required
        id="group-name-input"
        label="Name"
        placeholder="Give your group a name"
        margin="normal"
        fullWidth
        value={name}
        onChange={(e) => {
          handleNameValidation()
          handleNameChange(e)
        }}
        onBlur={handleNameValidation}
      />
      <TextField
        autoComplete="false"
        error={descError}
        helperText={descErrMsg}
        required
        id="group-description-input"
        label="Description"
        value={description}
        placeholder="Let others know what the group is about"
        variant="filled"
        margin="normal"
        fullWidth
        multiline
        rows={4}
        onChange={(e) => {
          handleDescValidation()
          handleDescriptionChange(e)
        }}
        onBlur={handleDescValidation}
      />
    </>
  )
}

export default GroupDetailsStep