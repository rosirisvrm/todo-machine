import React from 'react'
import { TodoIcon } from ".";

function CompleteIcon({ completed, onComplete }){
    return(
        <TodoIcon 
            type='check'
            color={completed ? '#4caf50' : 'darkgray'}
            onClick={onComplete}
        />
    );
}

export { CompleteIcon };