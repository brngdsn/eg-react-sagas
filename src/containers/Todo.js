import React, { Component } from 'react'
import { connect } from 'react-redux'
import RemoveTodosActions from '../redux/RemoveTodosRedux'
import ToggleTodosActions from '../redux/ToggleTodosRedux'
import styled from 'styled-components'

const StyledTodoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > div:nth-child(2) {
    flex-grow: 2;
  }
`

class Todo extends Component {

  onClickTodoRemove = () => {
    this.props.removeTodosRequest(this.props.todo)
  }

  onClickTodoToggle = () => {
    this.props.toggleTodosRequest({ id: this.props.todo.id, done: !this.props.todo.done })
  }

  render () {
    const { onClickTodoRemove, onClickTodoToggle } = this
    const { busy, title, done } = this.props.todo
    return (
      <StyledTodoContainer className={`StyledTodoContainer`}>
        <div>
          <button onClick={onClickTodoRemove} disabled={busy}>
            {busy && <div>busy</div>}
            {!busy && <div>trash</div>}
          </button>
        </div>
        <div>
          {title}
        </div>
        <div>
          {busy && <div>busy</div>}
          {!busy && <div onClick={onClickTodoToggle}>
            {done && <div>done</div>}
            {!done && <div>!done</div>}
          </div>}
        </div>
      </StyledTodoContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    toggleTodos: state.toggleTodos,
    removeTodos: state.removeTodos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTodosRequest: (todo) => dispatch(ToggleTodosActions.toggleTodosRequest(todo)),
    removeTodosRequest: (todo) => dispatch(RemoveTodosActions.removeTodosRequest(todo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)