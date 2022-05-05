import React from 'react'
import { TodoIcon } from ".";

function EditIcon({ onEdit }){

    return(
        <TodoIcon 
            type='edit'
            color='darkgray'
            onClick={onEdit}
        />
    );
}

export { EditIcon };