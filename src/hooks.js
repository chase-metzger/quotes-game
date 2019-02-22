import { useState, useEffect } from 'react'

const useFetch = (url, initialData, options = {}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(initialData)

  useEffect(() => {
    setLoading(true)

    async function doFetch () {
      try {
        const response = await fetch(url, options)
        if (response.ok) {
          const json = await response.json()
          setData(json)
        } else {
          setData(null)
        }
      } catch (error) {
        setData(error)
      }
    }

    doFetch()
    setLoading(false)
  }, [url])

  return { loading, result: data }
}

const useLocalStorage = (key, initialValue) => {
  const [item, setInnerValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = value => {
    setInnerValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  return [item, setValue]
}

const useSessionStorage = (key, initialValue) => {
  const [item, setInnerValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key)
      return (item !== null && item !== undefined ? JSON.parse(item) : initialValue)
    } catch (error) {
      return error
    }
  })

  const setValue = value => {
    setInnerValue(value)
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }

  return [item, setValue]
}

export { useFetch, useLocalStorage, useSessionStorage }
