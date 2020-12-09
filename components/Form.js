import React from 'react'

const defaultFormValues = { name: '' }

export default function Form({
  onSubmit,
  initialValues = defaultFormValues,
  submitText,
  clearOnSubmit,
  itemId,
}) {
  const [values, setValues] = React.useState(initialValues)
  const setValue = (field, value) => setValues((old) => ({ ...old, [field]: value }))

  const handleSubmit = (e) => {
    if (clearOnSubmit) {
      setValues(defaultFormValues)
    }
    e.preventDefault()
    onSubmit(values)
  }

  React.useEffect(() => {
    setValues(initialValues)
    if (itemId) {
      setValue('id', itemId)
    }
  }, [initialValues])

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={values.name}
        placeholder="Item Name"
        onChange={(e) => setValue('name', e.target.value)}
      />
      <button type="submit">{submitText}</button>
    </form>
  )
}