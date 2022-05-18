import React from 'react';

function useLocalStorage(itemName, initialValue){
    const [sincronizedItem, setSincronizedItem] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [item, setItem] = React.useState(initialValue);
  
    React.useEffect(() => {
      setTimeout(() => {
        try{
          const localStorageItem = localStorage.getItem(itemName)
          let parsedItem; 
  
          if(localStorageItem){
            parsedItem = JSON.parse(localStorageItem)
          }else{
            localStorage.setItem(itemName, JSON.stringify(initialValue))
            parsedItem = initialValue
          }
  
          setItem(parsedItem)
          setLoading(false)
          setSincronizedItem(true)
        }catch(error){
          setError(error)
        }
      }, 1000)
    }, [sincronizedItem])
  
    const saveItem = (newItem) => {
      try{
        const stringifiedItem = JSON.stringify(newItem)
        localStorage.setItem(itemName, stringifiedItem)
        setItem(newItem)
      }catch(error){
        setError(error)
      }
    }

    const sincronizeItem = () => {
      setLoading(true)
      setSincronizedItem(false)
    }
  
    return {
      item,
      saveItem,
      loading,
      error,
      sincronizeItem
    };
}

export { useLocalStorage };