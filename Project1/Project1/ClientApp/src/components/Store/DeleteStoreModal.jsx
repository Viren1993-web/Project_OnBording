import React, {useState, useEffect} from 'react'
import { Label, Form, Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'

/************************************* 
 * Function to get approval to Delete the Store
 **************************************/
const DeleteStoreModal = (props) => {
  const {open, toggleDeleteModal, fetchStoreData, store } = props;
   
  
  useEffect(() => {
    console.log("UnMount a Component using Hook")
return() => {
  console.log("UnMount a Component using Hook1")
}
  },[])
  
/************************************* 
 * Function to Delete the Store
 **************************************/
const deleteStore = (id) =>  {
        console.log("Stores:deleteStore")
        axios.delete(`/Stores/DeleteStore/${id}`)
            .then( function(res)  {
                // handle success
                //console.log(res.data);
                console.log(res);
                fetchStoreData();
                toggleDeleteModal();
            })
            .catch(function(err)  {
                // handle error
                
                console.log(err);
                toggleDeleteModal();
            })

    }


/************************************* 
 * Using Semantic UI Modal & ribbon Labels as UI
 **************************************/
  return (
    <Modal
     open={open}
     >
      <Modal.Header>Are you sure you want to delete Store ?</Modal.Header>
      <Modal.Content>
        
        <Modal.Description>
          <Header>Store details</Header>
          <Form>
          <Form.Field>
      <Label as='a' color='red' ribbon>Store ID</Label>
      <label>{store.id}</label>
    </Form.Field>
    <Form.Field>
      <Label as='a' color='blue' ribbon>Store Name</Label>
      <label>{store.name}</label>
    </Form.Field>
    <Form.Field>
      <Label as='a' color='green' ribbon>Store Address       </Label>
      <label>{store.address}</label>
    </Form.Field>
  </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleDeleteModal()}>
          Cancel
        </Button>
        <Button
          content="Yes"
          color='black'
          icon='checkmark'
          onClick={() => deleteStore(store.id)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteStoreModal