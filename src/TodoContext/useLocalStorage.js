import React from 'react';

function useLocalStorage(itemName, initialValue){
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
        }catch(error){
          setError(error)
        }
      }, 2000)
    })
  
    const saveItem = (newItem) => {
      try{
        const stringifiedItem = JSON.stringify(newItem)
        localStorage.setItem(itemName, stringifiedItem)
        setItem(newItem)
      }catch(error){
        setError(error)
      }
    }
  
    return {
      item,
      saveItem,
      loading,
      error
    };
}

export { useLocalStorage };