import React from 'react'
import './TodoCounter.css';

function TodoCounter({ completedTodos, allTodos, loading }){
    return(
        <h2 className={`TodoCounter ${loading && 'TodoCounter--loading'}`}>
            Has completado {completedTodos} de {allTodos} TODOs
        </h2>
    );
}

export { TodoCounter }; 