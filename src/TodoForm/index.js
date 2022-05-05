import React from 'react'
import { TodoContext } from '../TodoContext'
import './TodoForm.css'

function TodoForm(){

    const { addTodo, editTodo, setOpenModal, formAction, editingTodoText } = React.useContext(TodoContext)

    const [todoText, setTodoText] = React.useState(formAction === 'add' ? '' : editingTodoText)
    const [showMessage, setShowMessage] = React.useState(false)

    const onChange = (event) => {
        if(showMessage){
            setShowMessage(false)
        }

        setTodoText(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if(!todoText){
            setShowMessage(true)
            return;
        }   

        if(formAction === 'add'){
            addTodo(todoText)
        }else{
            editTodo(todoText)
        }

        setOpenModal(preState => !preState)
    }

    const onCancel = () => {
        setOpenModal(prev => !prev)
    }

    return(
        <form onSubmit={onSubmit}>
            <label>{formAction === 'add' ? 'Escribe un nuevo TODO' : 'Edita el TODO'}</label>
            <textarea 
                placeholder='Ej: Bañar al perro'
                value={todoText}
                onChange={onChange}
            />
            {showMessage && <p style={{ textAlign: 'center' }}>El texto del TODO no puede estar vacío</p>}
            <div className="TodoForm-buttonContainer">
                <button 
                    type="button"
                    className="TodoForm-button TodoForm-button-cancel"
                    onClick={onCancel}
                >
                    Cancelar
                </button>
                <button 
                    className="TodoForm-button TodoForm-button-add"
                    type="submit"
                >
                    {formAction === 'add' ? 'Añadir' : 'Actualizar'}
                </button>
            </div>
        </form>
    );
}

export { TodoForm };