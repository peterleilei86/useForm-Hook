import React, {useState, useEffect} from 'react'
import {validate} from './validate'

export function useForm() {
  const [values, setValues] = useState({
    email: {value: '', isInitial: true},
    password: {value: '', isInitial: true}
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!values.email.isInitial) {
      setErrors(errors => ({...errors, ...validate('email', values.email.value)}))
    }

    if (!values.password.isInitial) {
      setErrors(errors => ({...errors, ...validate('password', values.password.value)}))
    }
  }, [values])

  useEffect(() => {
    if (isSubmitting && Object.values(errors).every(v => !v)) {
      //call auth api
    }
  }, [isSubmitting, errors])

  const handleSubmit = e => {
    e.preventDefault()
    setErrors(errors => ({
      ...validate('email', values.email.value),
      ...validate('password', values.password.value)
    }))
    setIsSubmitting(true)
  }

  const handleChange = e => {
    e.persist()
    setValues(values => ({...values, [e.target.name]: {value: e.target.value, isInitial: false}}))
  }

  return {
    values,
    errors,
    handleSubmit,
    handleChange
  }
}
