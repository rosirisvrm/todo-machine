import React from "react";
import './CreateTodoButton.css'

function CreateTodoButton({ setOpenModal, setFormAction }){

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