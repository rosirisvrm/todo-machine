import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from "../Modal";
import { TodoForm } from '../TodoForm';
import { TodoError } from '../TodoError';
import { TodoLoadingList } from '../TodoLoading/TodoLoadingList';
import { EmptyTodos } from '../EmptyTodos';
import { TodoContext } from '../TodoContext';
import './AppUI.css';


function AppUI(){

    const { 
        loading, 
        error, 
        searchedTodos, 
        completeTodo, 
        deleteTodo,
        onEdit,
        openModal
    } = React.useContext(TodoContext)

    return(
        <React.Fragment>
            <TodoCounter />
            <TodoSearch />
            
            <TodoList>
                {loading && <TodoLoadingList />}
                {error && <TodoError />}
                {(!loading && !searchedTodos.length) && <EmptyTodos />}
                {searchedTodos.map((todo, index) => (
                    <TodoItem 
                        key={index} 
                        text={todo.text} 
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo.text)}
                        onDelete={() => deleteTodo(todo.text)}
                        onEdit={() => onEdit(todo.text)}
                    />
                ))}
            </TodoList>

            {openModal && 
                <Modal>
                    <TodoForm />
                </Modal>
            } 

            <CreateTodoButton />
        </React.Fragment>
    );
}

export { AppUI };