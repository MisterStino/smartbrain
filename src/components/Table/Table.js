import React, { Component } from 'react'
import './Table.css';

class Table extends Component {

   renderTableData() {
    return this.props.multiculturalAppearance.map((student) => {
       const {name, value} = student //destructuring
       return (
          <tr>
             <td>{name}</td>
             <td>{value}</td>
          </tr>
       )
    })
 }

 render() {
  const showTable = this.props.showTable;
  if(showTable)  {
    return (
       <div>
          <h1 id='title'>I've been watching you...</h1>
          <table id='students'>
             <tbody>
                <tr>
                    <td>{'Appearance   '}</td>
                    <td>{'  probability'}</td>
                </tr>
                <tr>
                    <td>{'Age: ' + this.props.age.name}</td>
                    <td>{this.props.age.value}</td>
                </tr>
                <tr>
                    <td>{this.props.masculine.name}</td>
                    <td>{this.props.masculine.value}</td>
                </tr>
                <tr>
                    <td>{this.props.feminine.name}</td>
                    <td>{this.props.feminine.value}</td>
                </tr>
                <tr></tr>
                {this.renderTableData()}
             </tbody>
          </table>
       </div>
    )
  } else {
    return (
        null
    )
  }
 }
}

export default Table //exporting a component make it reusable and this is the beauty of react