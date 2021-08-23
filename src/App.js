import { Component } from 'react';
import './App.css';
import NewTask from './components/new-task/NewTask';
import TodoList from './components/todolist/TodoList';
var items =[];
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      tasks:[],
      taskFilters:[]
    }
    this.onReceiveNewTask = this.onReceiveNewTask.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }
  onReceiveNewTask(value){
   items.push(value)
   items = items.sort(function(x,y){
      return x.time-y.time;
    });
    this.setState({
      tasks:items
      });
  }
  onFilter(param){
    const filters = this.state.tasks.filter(item=>{
      return item.title.toLowerCase().indexOf(param.toLowerCase())  !==-1;
    });
   this.setState({
     taskFilters:[...filters]
   });
   param =param.trim();
   if(!param || param===''){
    this.setState({
      taskFilters:[]
    });
   }
  }
  onUpdate(params,newTask){
    if(!params.titleUpdate
      ||params.title===''
      ||!params.timeUpdate
      ||params.timeUpdate===''
      || params.priorityUpdate===''
      ||!params.priorityUpdate
      ||!params.descriptionUpdate
      ||params.descriptionUpdate===''){
        return; // dung chuong trinh
      }
    console.log(params)
    const task = this.state.tasks.find(item=>{
      return item.title===params;
    })
    const index = this.state.tasks.indexOf(task);
  
    this.setState({
      tasks: [
        ...this.state.tasks.slice(0,index),
        {
          ...newTask,
          title:newTask.titleUpdate,
          description:newTask.descriptionUpdate,
          time:newTask.timeUpdate,
          priority:newTask.priorityUpdate
        },
        ...this.state.tasks.slice(index+1)
      ]
    });
    
  }
  render(){
    return (
      <div className="App">
       <NewTask receive={this.onReceiveNewTask} />
       <TodoList 
       data = {this.state.tasks} 
       filters={this.state.taskFilters} 
       onHandleFilter={this.onFilter}
       update = {this.onUpdate}
        />
      </div>
    );
  }
}

export default App;
