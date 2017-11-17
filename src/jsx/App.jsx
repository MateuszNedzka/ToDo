import React from 'react';
import ReactDOM from 'react-dom';

class ToDo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tasks: [],
        }
    }

    addTask = () =>{
        let taskVal = this.input.value;
        let newTasks = this.state.tasks;

        if (taskVal != ""){
            newTasks.push(taskVal);
        }

        this.setState({
            tasks: newTasks
        });
        this.input.value = ""
    };

    removeTask = (e) =>{
        let id = e.target.parentElement.id;
        // console.log(id);
        // console.log(this.state.tasks);
        // let newTasks = this.state.tasks.filter( (val, i) => i!=id );
        this.state.tasks.splice( id, 1 );
        this.setState({
            tasks: this.state.tasks
        });
    };

    componentWillMount() {
        localStorage.getItem('tasks') && this.setState({
            tasks: JSON.parse(localStorage.getItem('tasks'))
        })
    }

    componentWillUpdate (nextProps, nextState) {
        localStorage.setItem('tasks', JSON.stringify(nextState.tasks));
        localStorage.setItem('tasksDate', Date.now());
    }

    render(){
        return <div>
            <p>Tasks counter: {this.state.tasks.length} </p>
            <input type="text"
                   placeholder="What is your next task to do?"
                   ref={input => this.input = input}
            />
                <button onClick={this.addTask}>+</button>
            <ul>
                {this.state.tasks.map((task, index) => {
                    return <li key={index} id={index}>
                        {task}
                        <button onClick={this.removeTask}>-</button>
                    </li>}
                    )}
            </ul>
        </div>
    }
}

class App extends React.Component{
    render(){
        return <ToDo/>
    }
}

document.addEventListener('DOMContentLoaded', function(){

	ReactDOM.render(
	    <App/>,
	    document.getElementById('app')
	);
});
