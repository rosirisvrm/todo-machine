import React from 'react';
import { useLocalStorage } from './useLocalStorage'

function useTodos(props){

    const {
        item: todos, 
        saveItem: saveTodos,
        loading,
        error,
        sincronizeItem: sincronizeTodos,
    } = useLocalStorage('TODOS_V1', []);

    const [searchValue, setSearchValue] = React.useState('')
    const [openModal, setOpenModal] = React.useState(false)
    const [formAction, setFormAction] = React.useState('add')
    const [editingTodoText, setEditingTodoText] = React.useState('')

    const completedTodos = todos.filter(todo => todo.completed).length
    const allTodos = todos.length

    const searchedTodos = searchValue.length >= 1 ? todos.filter(todo => todo.text.toLowerCase().includes(searchValue.toLowerCase())) : todos;

    const addTodo = (text) => {
        let newTodos = [...todos]

        newTodos.push({
            text,
            completed: false,
        })

        saveTodos(newTodos)
    }

    const onEdit = (text) => {
        setOpenModal(preState => !preState)
        setFormAction('edit')
        setEditingTodoText(text)
    }

    const editTodo = (newText) => {
        const todoIndex = todos.findIndex(todo => todo.text === editingTodoText)

        let newTodos = [...todos]
        newTodos[todoIndex].text = newText;

        saveTodos(newTodos)
        setEditingTodoText('')
    }

    const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text)

        let newTodos = [...todos]
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;

        saveTodos(newTodos)
    }

    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text)

        let newTodos = [...todos]
        newTodos.splice(todoIndex, 1)

        saveTodos(newTodos)
    }

    return({
        loading,
        error,
        completedTodos,
        allTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        addTodo,
        onEdit,
        editTodo,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        formAction,
        setFormAction,
        editingTodoText,
        sincronizeTodos
    });
}

export { useTodos };