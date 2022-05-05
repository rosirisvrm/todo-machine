import React from "react";
import { TodoContext } from "../TodoContext";
import './CreateTodoButton.css'

function CreateTodoButton(){

    const { setOpenModal, setFormAction } = React.useContext(TodoContext)

    const onClickButton = () => {
        setOpenModal(preState => !preState)
        setFormAction('add')
    }

    return(
        <button 
            className="CreateTodoButton"
            onClick={onClickButton}
        >
            +
        </button>
    );
}

export { CreateTodoButton };