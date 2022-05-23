import React from 'react';
import { useTodos } from './useTodos';
import { TodoHeader } from '../TodoHeader';
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
//import { ChangeAlertWithStorageListener } from '../ChangeAlert';
import { ChangeAlertHook } from '../ChangeAlert/ChangeAlertHook'
 
function App() {
  const { state, stateUpdaters } = useTodos()

  const {
    loading, 
    error, 
    searchedTodos,
    openModal,
    completedTodos,
    allTodos,
    searchValue,
    formAction,
    editingTodoText,
  } = state

  const {
    completeTodo, 
    deleteTodo,
    onEdit,   
    setSearchValue,
    setOpenModal,
    setFormAction,
    addTodo,
    editTodo, 
    sincronizeTodos
  } = stateUpdaters

  return (
    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter
          completedTodos={completedTodos}
          allTodos={allTodos}
        />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TodoHeader>
      
      <TodoList
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        allTodos={allTodos}
        searchText={searchValue}
        onError={() => <TodoError />}
        onLoading={() => <TodoLoadingList />}
        onEmptyTodos={() => <EmptyTodos />}
        onEmptySearchResult={searchText => <p style={{ textAlign: 'center' }}>No hay resultados para {searchText}</p>}
      // Usando el componente TodoList con una render props llamada render
      //   render={todo => (
      //     <TodoItem 
      //       key={todo.text} 
      //       text={todo.text} 
      //       completed={todo.completed}
      //       onComplete={() => completeTodo(todo.text)}
      //       onDelete={() => deleteTodo(todo.text)}
      //       onEdit={() => onEdit(todo.text)}
      //     />
      //   )}
      // />
      >
        {/* Usando el componente TodoList con una render function */}
        {todo => (
          <TodoItem 
            key={todo.text} 
            text={todo.text} 
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
            onEdit={() => onEdit(todo.text)}
          />
        )}
      </TodoList>

      {openModal && 
        <Modal>
          <TodoForm
            addTodo={addTodo}
            editTodo={editTodo}
            setOpenModal={setOpenModal}
            formAction={formAction}
            editingTodoText={editingTodoText}          
          />
        </Modal>
      } 

      <CreateTodoButton
        setOpenModal={setOpenModal}
        setFormAction={setFormAction}
      />

      {/* Usando el componente ChangeAlert como un HOC */}
      {/*<ChangeAlertWithStorageListener 
        sincronize={sincronizeTodos}
      />*/}

      {/* Usando el componente ChangeAlert con un Custom Hooks */}
      <ChangeAlertHook 
        sincronize={sincronizeTodos}
      />

    </React.Fragment>
  );
}

export default App;
