import React from "react";
import './TodoList.css'

function TodoList(props){
    const renderFunc = props.children || props.render
    return(
        <section>
            {props.loading && props.onLoading()}
            {props.error && props.onError()}
            {(!props.loading && !props.allTodos) && props.onEmptyTodos()}
            {(!!props.allTodos && !props?.searchedTodos.length) && props.onEmptySearchResult(props.searchText)}
            {(!props.loading && !props.error) && (
                <ul>
                    {props.searchedTodos.map(todo => renderFunc(todo))}
                </ul>
            )}
        </section>
    );
}

export { TodoList };