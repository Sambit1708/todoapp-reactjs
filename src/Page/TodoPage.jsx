import React, { useEffect, useRef, useState } from 'react'
import '../Assets/style.css'
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import Swal from 'sweetalert2'

const getLocalStorage = () => {
    let listItem = localStorage.getItem('items')
    if(listItem) {
        var prevItem = localStorage.getItem('items').split(",");
        if(prevItem[0] === '') {
            // eslint-disable-next-line no-unused-vars
            let shifted = prevItem.shift();
            console.log('I am in getLocalStorage')
        }
        return prevItem;
    }
    return [];
}

const TodoPage = () => {

  const [items, setItems] = useState(getLocalStorage())
  const formRef = useRef();

  useEffect(() => {
    localStorage.setItem('items', items);
  }, [items])

  const printData = (item, index) => {
    return (
        <div className='todo-field'>
            <div className='text-content' style={{fontSize: '1.2em' }}>
                <span>{item}</span>
            </div>
            <div className='action-content'>
                <div className='manage-i'>
                    <button className='act-btn'><AiFillEdit style={{fontSize: '1.5em', cursor: 'pointer'}} /></button>
                    <button className='act-btn' onClick={() => deleteItem(index)}><MdDelete style={{fontSize: '1.5em', cursor: 'pointer'}} /></button>
                </div>
            </div>
        </div>
    )
  }

  const formSubmit = (event) => {
    event.preventDefault();
    const newData = formRef.current.todo.value
    if(newData === '') {
        Swal.fire("Null!!","Form Value Can't be null", "error");
        return
    }
    var prevItem = localStorage.getItem('items').split(",");
    var newItem = [];
    if(prevItem.length > 0 && prevItem[0] !== '') {
        newItem = [...prevItem, newData]
    }
    else {
        newItem = [newData]
    }
    setItems(newItem)
  }

  const deleteItem = (index) => {
    var newData = [...items]
    newData.splice(index, 1)
    setItems(newData)
  }

  return (
    <main>
        <div className='container'>
            <div className='todo-field-input'>
                <h4>Todo App</h4>
                <div className='input-field-container'>
                    <form ref={formRef} onSubmit={(event) => formSubmit(event)} className='input-field'>
                        <input name='todo' className='input-bx' type='text'/>
                        <button className='btn' type='submit'>Save</button>
                    </form>
                </div>
            </div>
            <div className='saved-section'>
                {items.length > 0 ? 
                    items.map((item, index) => (
                        <div key={index} className='todo-field-container'>
                            {printData(item, index)}
                        </div>
                    )) : <div className='todo-field-container' style={{position: 'relative'}}>
                            <div className='empty' style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.2em' }} >
                                <h4>No Data</h4>
                            </div>
                         </div>
                }
            </div>
        </div>
    </main>
  )
}

export default TodoPage