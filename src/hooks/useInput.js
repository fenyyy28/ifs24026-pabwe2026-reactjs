import { useState } from 'react'

/**
 * Custom hook untuk mengelola nilai input form.
 *
 * @param {string} initialValue - Nilai awal input
 */
export function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)

  function handleChange(event) {
    setValue(event.target.value)
  }

  function reset() {
    setValue(initialValue)
  }

  return {
    value,
    setValue,
    onChange: handleChange,
    reset,
  }
}