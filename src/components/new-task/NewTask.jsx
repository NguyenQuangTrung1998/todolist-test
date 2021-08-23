import React, { Component} from 'react';
import './NewTaskStyle.css';
const priorities = ['Normal','High','low'];
class NewTask extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            description:'',
            time:'',
            priority:priorities[0]
        }
        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }
     onChange(event){ 
      const target = event.target;
      const name = target.name;
      const value = target.value;
     this.setState({
         [name]:value
     })
     
    }
     onAdd(value){
        const {receive} = this.props;
        receive(value);
        this.setState({
        title:'',
        description:'',
        time:'',
        priority:priorities[0]
       })
    }
    
    render(){
       
        return (
            <div className='newTask'>
                <div className='container'>
                <h2>New Task</h2>
               <input 
               id='info'
               name='title'
                type='text'
                value={this.state.title}
                placeholder='Add New Task'
                onChange={this.onChange}   
                  />    
                 
               <div className='des'>
               <label for='description'>Description</label>
               <br />
                 <textarea id='description'
                 name='description'
                 onChange={this.onChange}
                 value={this.state.description}
                 ></textarea>
               </div>
                 
                  <div className='choice'>
                    <div className='chooseDate'>
                        <label>Due Date</label>
                        <br />
                        <input type='date' 
                        name='time'
                        onChange={this.onChange}
                        value={this.state.time} />
                    </div>
                    <div className='priority'>
                        <label for='selectItem'>Priority</label>
                        <br />
                        <select id='selectItem'
                            defaultValue={priorities[0]}
                            name='priority'
                            onChange={this.onChange}>
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
                  <button id='btnAdd' onClick={()=>this.onAdd(this.state)}>Add</button>
                  </div>
            </div>
        );
    }

   
}

export default NewTask;