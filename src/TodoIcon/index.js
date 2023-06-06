import React from 'react'
import { ReactComponent as CheckIcon } from './check.svg'
import { ReactComponent as DeleteIcon } from './delete.svg'
import { ReactComponent as EditIcon } from './edit.svg'
import './TodoIcon.css';

function TodoIcon({ type = 'check', color = 'darkgray', onClick }){

    const iconTypes = {
        'check': (color) => <CheckIcon className='Icon-svg Icon-svg--check' fill={color} />,
        'delete': (color) => <DeleteIcon className='Icon-svg Icon-svg--delete' fill={color} />,
        'edit': (color) => <EditIcon className='Icon-svg Icon-svg--edit' fill={color} />
    }

    return(
        <span 
            className={`Icon-container Icon-container--${type}`}
            onClick={onClick}
        >
            {iconTypes[type](color)}
        </span>
    );
}

export { TodoIcon };