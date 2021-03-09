import React, {useState, useEffect} from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import axios from 'axios'

/************************************* 
 * Function to Add/Create the Customer
 **************************************/
const AddNewCustomer = (props) => {
  const {open, toggleCreateModal, fetchCustomerData} = props;
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  useEffect(() => {
    console.log(name+address)
return() => {
  console.log("UnMount a Component using Hook")

}
  },[name,address])

/************************************* 
 * Function to Add/Create Customer using axios
 **************************************/
 const createCustomer = () => { 
  axios.post('/Customers/PostCustomer', {
    name: name,
    address: address
  })
  .then(function (res) {
    console.log(res);
    fetchCustomerData();
    toggleCreateModal();
  })
  .catch(function (err) {
    console.log(err);
    toggleCreateModal();
  });
 }

 /************************************* 
 * Using Semantic UI Modal & Form as UI
 **************************************/
  return (
    <Modal
     open={open}
     >
      <Modal.Header>C U S T O M E R</Modal.Header>
      <Modal.Content>
        
        <Modal.Description>
          
          <Form>
    <Form.Field>
      <label>Customer Name</label>
      <input placeholder='Customer Name' value={name} onChange={(e) => setname(e.target.value)} />
    </Form.Field>
    <Form.Field>
      <label>Customer Address</label>
      <input placeholder='Customer Address' onChange={(e) => setaddress(e.target.value)} />
    </Form.Field>
  </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleCreateModal()}>
          Cancel
        </Button>
        <Button
          content="Create"
          labelPosition='right'
          icon='checkmark'
          onClick={() => createCustomer()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default AddNewCustomer