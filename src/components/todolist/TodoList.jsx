
import React, { Component } from 'react';
import './TodoListStyle.css';
const priorities = ['Normal','High','low'];
class TodoList extends Component {
    constructor(props){
        super(props);
        this.state={
            isChecked:false,
            titleTask:'',
            search:'',
            titleUpdate:'',
            descriptionUpdate:'',
            timeUpdate:'',
            priorityUpdate:''
        }
        this.inputSearch = React.createRef();
        this.onHandleSearch = this.onHandleSearch.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onhandleCheck = this.onhandleCheck.bind(this);
    }
     onHandleSearch(event){ 
        const {onHandleFilter} = this.props;
       const target = event.target;
       const value = target.value;
       this.setState({
        search:value
    })  
       this.inputSearch.current = setTimeout(() => {
          
          const searchValue= value
          onHandleFilter(searchValue);
       }, 300);
    }

    onhandleCheck(e){
        const {update,data,filters} = this.props;
        const {taskUpdate} = this.state
        const check = e.target.checked;
        const name = e.target.name;
        const value = e.target.value;
        
        this.setState({
            [name]:value
        })
        if(check){
            this.setState({
                [name]:value,
                titleTask:value
            })
            if(filters.length<=0){
                const taskData = data.find(item=>{
                    return item.title===value;
                });
                this.setState({
                    titleUpdate:taskData.title,
                    descriptionUpdate:taskData.description,
                    timeUpdate:taskData.time,
                    priorityUpdate:taskData.priority
                })
            }else{
                const filter = filters.find(item=>{
                    return item.title===value;
                })
                this.setState({
                    titleUpdate:filter.title,
                    descriptionUpdate:filter.description,
                    timeUpdate:filter.time,
                    priorityUpdate:filter.priority
                })
            }
        }
      
    }
    
    onUpdate(){
        const item = {
            titleUpdate:this.state.titleUpdate,
            descriptionUpdate:this.state.descriptionUpdate,
            timeUpdate:this.state.timeUpdate,
            priorityUpdate:this.state.priorityUpdate
        }
        const {update} = this.props;
        
        update(this.state.titleTask,item);
        this.setState({
            titleUpdate:'',
            descriptionUpdate:'',
            timeUpdate:'',
            priorityUpdate:''
        })
        
    }
  render(){
    const {data,filters} = this.props;
    return (
        <div className='todolist'>
             <h2>To Do List</h2>
           
            <div className='container'>
            <input 
            id="inputSearch"
            type ="text" 
            onChange={this.onHandleSearch}
            placeholder="Search"
            ref={this.inputSearch}
            value={this.state.search} />
           
           <input 
           id='homework'
            type='text'
            name=''
            value={this.state.titleUpdate}
            placeholder='Do homework'
            name='titleUpdate'
            onChange={this.onhandleCheck}   
              />    
             
           <div className='des'>
           <label for='description'>Description</label>
           <br />
             <textarea id='description'
             placeholder="Lorem ipsum..."
             onChange= {this.onhandleCheck}
             name='descriptionUpdate'
             value={this.state.descriptionUpdate}
             ></textarea>
           </div>
             
              <div className='choice'>
                <div className='date'>
                    <label>Due Date</label>
                    <br />
                    <input type='date'
                    name='timeUpdate'
                    value={this.state.timeUpdate}
                    onChange={this.onhandleCheck} />
                </div>
                <div className='priority'>
                    <label for='selectPriority'>Priority</label>
                    <br />
                    <select id='selectPriority'
                        defaultValue={this.state.priorityUpdate}
                        name='priorityUpdate'
                        value={this.state.priorityUpdate}
                        onChange={this.onhandleCheck}>
                            {
                                priorities.map((item,index)=>{
                                    return <option key={index}>
                                        {item}
                                    </option>
                                })
                            }
                    </select>
                </div>
              </div>
              <button id='btnAdd' onClick={this.onUpdate}>Update</button>
              </div>
              <div>
                <ul>
                    {
                       filters.length? filters.map((task,index)=>{
                        return <li key={index} className="task">
                        <div className='check'>
                        <input id='check' 
                        type='checkbox'
                        onChange={this.onhandleCheck}
                         value={task.title}/>
                        <p>{task.title}</p>
                        </div>
                         
                        <div className='btnGroup'>
                        <button className='btnAction' style={{backgroundColor:'rgb(10, 145, 179)'}}>Detail</button>
                         <button className='btnAction' style={{backgroundColor:'red'}}>Remove</button>
                        </div>
                         </li>
                       }) : data.map((task,index)=>{
                            return <li key={index} className="task">
                               <div className='check'>
                               <input id='check' type='checkbox'
                               onChange={this.onhandleCheck}
                                value={task.title}/>
                               <p> {task.title}</p>
                               </div>
                                
                               <div className='btnGroup'>
                               <button className='btnAction' style={{backgroundColor:'rgb(10, 145, 179)'}}>Detail</button>
                                <button className='btnAction' style={{backgroundColor:'red'}}>Remove</button>
                               </div>
                                </li>
                        })
                    }
                </ul>
              </div>
              <div className='bulk'>
                        <div>
                        <p>Bulk Action:</p>
                        </div>
                        <div>
                        <button className='btnAll' style={{backgroundColor:'rgb(10, 145, 179)'}}>Done</button>
                        <button className='btnAll' style={{backgroundColor:'red'}}>Remove</button>
                        </div>
              </div>
        </div>
    );
  }
}

export default TodoList;