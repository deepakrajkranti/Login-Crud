import React, { Fragment, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { styled } from 'styled-components';
import './Crud.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Containers = styled.div`
height:100vh;
display:flex;
flex-direction:column;
justify-content:space-around;

`

const Crud = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name,SetName]=useState('');
  const [age,SetAge]=useState('');
  const [isActive,SetIsActive]=useState(0);

  const[editId,SetEditId]=useState('');
  const [editName,SetEditName]=useState('');
  const [editAge,SetEditAge]=useState('');
  const [editIsActive,SetEditIsActive]=useState(0);

  const [data,SetData]=useState([]);
  const empdata=[
    {
      id:1,
      name:'deepak raj',
      age:22,
      isactive:1
    },
    {
      id:2,
      name:'deepak singh',
      age:23,
      isactive:1
    }
    , {
      id:3,
      name:'raj',
      age:22,
      isactive:0
    }
  ];
useEffect(()=>{
  SetData(empdata);
},[])
const handleEdit =(id)=>{
  //alert(id);
  handleShow();
}

const handleDelete =(id)=>{
  if(window.confirm("Are You Sure to delete this Employee")==true)
   { 
    
    alert(id);
   }
}
const handleUpdate=()=>{

}
const handleActiveChange=(e)=>{
    if(e.target.checked){
      SetIsActive(1);
    }
    else{
      SetIsActive(0);
    }
}
const handleEditActiveChange=(e)=>{
  if(e.target.checked){
    SetEditIsActive(1);
  }
  else{
    SetEditIsActive(0);
  }
}
const handleSubmit =()=>{
  const url="https://reqres.in/api/users";
  const data={
    "name":name,
    "job":age,
  }
  axios.post(url,data).then((result)=>{
    console.log(result.data);
    clear();
    toast.success('Employee added Successfully');
  }).catch((error)=>{
    toast.error(error);
  })
}
const clear=()=>{
  SetName('');
  SetAge('');
  SetIsActive(0);
  SetEditName('');
  SetEditAge('');
  SetEditIsActive(0);
  SetEditId('');
}

  return (
    <Containers>
      <ToastContainer/>
      <Container>
      <Row>
        <Col>
        <input type="text" className='form-control' placeholder='Enter Name'
         value={name} onChange={(e)=>SetName(e.target.value)}
        />
        </Col>
        <Col>
        <input type="text" className='form-control' placeholder='Enter Age'
        value={age} onChange={(e)=>SetAge(e.target.value)}
        />
        </Col>
        <Col>
        <input type="checkbox"
        checked={isActive === 1?true:false}
        onChange={(e)=>handleActiveChange(e)} value={isActive}
        />
        <label>IsActive</label>
        </Col>
        <Col>
        <button className='btn btn-primary' onClick={()=>handleSubmit()}>Submit</button>
        </Col>
      </Row>
      </Container>
      <Table striped bordered hover variant="dark">
      <thead className='c1'>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Age</th>
          <th>IsActive</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {
        data && data.length>0 ?
        data.map((item,index)=>{
          return (
          <tr key={index}>
          <td>{index+1}</td>
          <td>{item.name}</td>
          <td>{item.age}</td>
          <td>{item.isactive}</td>
          <td colSpan={2}>
            <button className='btn btn-primary ' onClick={()=>handleEdit(item.id)}> Edit</button> &nbsp;
            <button className='btn btn-danger' onClick={()=>handleDelete(item.id)}>Delete</button>
          </td>
        </tr>
          )
        })
        :"Loading"
      }
       
      </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col>
        <input type="text" className='form-control' placeholder='Enter Name'
        value={editName} onChange={(e)=>SetEditName(e.target.value)}
        />
        </Col>
        <Col>
        <input type="text" className='form-control' placeholder='Enter Age'
        value={editAge} onChange={(e)=>SetAge(e.target.value)}
        />
        </Col>
        <Col>
        <input type="checkbox"
        checked={editIsActive ===1? true:false}
        onChange={(e)=>handleEditActiveChange(e)} value={editIsActive}
        />
        <label>IsActive</label>
        </Col>
      </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Containers>
  )
}

export default Crud