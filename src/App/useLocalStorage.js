import React from 'react';

function useLocalStorage(itemName, initialValue){
    const [state, dispatch] = React.useReducer(reducer, initialState({ initialValue }))

    const { loading, error, item, sincronizedItem } = state

    // ACTIONS CREATORS

    const onError = (error) => dispatch({ type: actionsTypes.error, payload: error })

    const onSuccess = (item) => dispatch({ type: actionsTypes.success, payload: item })

    const onSave = (item) => dispatch({ type: actionsTypes.save, payload: item })

    const onSincronize = () => dispatch({ type: actionsTypes.sincronize })
  
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

          onSuccess(parsedItem)
        }catch(error){
          onError(error)
        }
      }, 1000)
    }, [sincronizedItem])
  
    const saveItem = (newItem) => {
      try{
        const stringifiedItem = JSON.stringify(newItem)
        localStorage.setItem(itemName, stringifiedItem)
        onSave(newItem)
      }catch(error){
        onError(error)
      }
    }

    const sincronizeItem = () => {
      onSincronize()
    }
  
    return {
      item,
      saveItem,
      loading,
      error,
      sincronizeItem
    };
}

const actionsTypes = ({
  error: 'ERROR',
  success: 'SUCCESS',
  save: 'SAVE',
  sincronize: 'SINCRONIZE'
})

const initialState = ({ initialValue }) => ({
  sincronizedItem: true,
  loading: true,
  error: false,
  item: initialValue,
})

const reducerObject = (state, payload) => ({
  [actionsTypes.error]: {
    ...state,
    error: true,
  },
  [actionsTypes.success]: {
    ...state,
    error: false,
    loading: false,
    sincronizedItem: true,
    item: payload,
  },
  [actionsTypes.save]: {
    ...state,
    item: payload, 
  },
  [actionsTypes.sincronize]: {
    ...state,
    loading: true,
    sincronizedItem: false,
  }
})

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
}

export { useLocalStorage };