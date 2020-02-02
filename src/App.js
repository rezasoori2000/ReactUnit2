import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';

import ListItem from './ListItem';
import './App.css';
import LoadingImage from './loading.gif';

class  App extends Component {
  constructor(){
 super();

 this.state={

  todos:[],
  newTodo:"",
  isUpdating:false,
  todoIndex:0,
  todosUrl:'http://5e365ebef7e55d0014ad50f9.mockapi.io',
  isLoading:false
 };
 this.addItem=this.addItem.bind(this);
 this.handleCahnge=this.handleCahnge.bind(this);
 this.hndUpdate=this.hndUpdate.bind(this);
 this.hndDelete=this.hndDelete.bind(this);
  }
 async hndDelete(i){
    const a=this.state.todos;
    this.setState({
      isLoading:true
    });
    const response= await axios.delete(`${this.state.todosUrl}/todos/${a[i].id}`);
    console.log(response);
    delete a[i];

    this.setState({
      todos:a,
      isLoading:false
    });
  };
  async hndUpdate(i){
    const a=this.state.todos;

    this.setState({
      isUpdating:true,
      newTodo:a[i].name,
      todoIndex:i
    
    })
  };  
  async addItem() {
    const a=this.state.todos;
    this.setState({
      isLoading:true
    });
    if(!this.state.isUpdating){
    a.push({
    id:  this.state.todos[this.state.todos.length-1].id+1,
    name:this.state.newTodo
    });
     this.setState({
      todos:a,
      newTodo:'',
      isLoading:false
     });
    }else{
      a[this.state.todoIndex].name=this.state.newTodo;
      const response=await axios.put(`${this.state.todosUrl}/todos/${a[this.state.todoIndex].id}`,{
        name:this.state.newTodo
      });
      console.log(response);
      this.setState({
        todos:a,
        isUpdating:false,
        newTodo:'',
        isLoading:false
      });


    }
  };
  handleCahnge(event){
    this.setState({
      newTodo:event.target.value
    })
  }
async componentDidMount(){
  this.setState({
    isLoading:true
  });
  //اجرای متد بعد از کامل شدن دم
  const data = await axios.get(`${this.state.todosUrl}/todos`);
  console.log(data);
  this.setState({
    todos:data.data,
    isLoading:false
  });
}
  componentWillMount(){
//اجرای متد قبل از کامل شدن دم
  }
  render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="container">
          <input type="Text" className="form-control" value={this.state.newTodo} onChange={this.handleCahnge}/>
          <input type="button" value={this.state.isUpdating?"Upadte":"Add"} className="btn btn-success mt-3" onClick={this.addItem}/>
          {this.state.isLoading &&
          <img src={LoadingImage}/>}
  {!this.state.isUpdating &&
  <ul className="list-group">
    {this.state.todos.map((item,index)=>{
      return<ListItem
      
      hndDelete={()=>{this.hndDelete(index)}}
      hndUpdate={()=>{this.hndUpdate(index)}}
      item={item}
      />
   })}

  </ul>
  }
</div>
      </header>
    </div>
  );
}
}
export default App;
