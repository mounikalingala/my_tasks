import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    inputTask: '',
    inputTag: tagsList[0].optionId,
    allTasks: [],
    activeTag: 'INITIAL',
  }

  onChangeInput = event => {
    this.setState({inputTask: event.target.value})
  }

  onChangeTag = event => {
    this.setState({inputTag: event.target.value})
  }

  onSubmitTask = event => {
    event.preventDefault()
    const {inputTask, inputTag} = this.state
    const newTask = {
      id: v4(),
      task: inputTask,
      tag: inputTag,
    }

    if (inputTask.length !== 0) {
      this.setState(prevState => ({
        allTasks: [...prevState.allTasks, newTask],
        inputTask: '',
        inputTag: '',
      }))
    }
  }

  onClickActiveTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  renderTaskList = () => {
    const {allTasks, activeTag} = this.state
    const filterTask =
      activeTag === 'INITIAL'
        ? allTasks
        : allTasks.filter(each => each.tag === activeTag)
    return (
      <>
        {filterTask.map(each => (
          <li className="task-item">
            <p className="task-name">{each.task}</p>
            <p className="tag-name">{each.tag}</p>
          </li>
        ))}
      </>
    )
  }

  render() {
    const {inputTag, inputTask, activeTag, allTasks} = this.state

    return (
      <div className="bg-container">
        <form className="create-task-container" onSubmit={this.onSubmitTask}>
          <h1 className="heading">Create a task!</h1>
          <div className="input-container">
            <label className="label" htmlFor="task">
              Task
            </label>
            <input
              type="text"
              className="input"
              id="task"
              value={inputTask}
              placeholder="Enter the task here"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="tags">
              Tags
            </label>
            <select
              id="tags"
              className="input"
              value={inputTag}
              onChange={this.onChangeTag}
            >
              {tagsList.map(each => (
                <option value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>
        <div className="result-task-container">
          <h1 className="result-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(each => {
              const isActive = activeTag === each.optionId
              return (
                <li className="tags" key={each.id}>
                  <button
                    type="button"
                    value={each.optionId}
                    onClick={this.onClickActiveTag}
                    className={isActive ? 'active-btn button' : 'button'}
                  >
                    {each.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h1 className="result-heading">Tasks</h1>
          <ul className="task-list">
            {allTasks.length === 0 ? (
              <h1 className="no-result">No Tasks Added Yet</h1>
            ) : (
              this.renderTaskList()
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
