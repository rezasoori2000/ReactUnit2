import React from "react";

const ListItem =(props)=>{

    return<li className=""  key={props.item.id}>
    <button className="btn-sm btn btn-danger m-2"  onClick={props.hndDelete}>-</button>
       {props.item.name}
    <button className="btn btn-sm btn-default m-2" value="+" onClick={props.hndUpdate}>+</button>
    </li>
  

}
export default ListItem;