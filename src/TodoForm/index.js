import React from 'react'
import './TodoForm.css'

function TodoForm({ addTodo, editTodo, setOpenModal, formAction, editingTodoText }){
    
    const [todoText, setTodoText] = React.useState(formAction === 'add' ? '' : editingTodoText)
    const [showErrorMessage, setShowErrorMessage] = React.useState(false)

    const onChange = (event) => {
        if(showErrorMessage){
            setShowErrorMessage(false)
        }

        setTodoText(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if(!todoText){
            setShowErrorMessage(true)
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
            {showErrorMessage && <p style={{ textAlign: 'center' }}>El texto del TODO no puede estar vacío</p>}
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