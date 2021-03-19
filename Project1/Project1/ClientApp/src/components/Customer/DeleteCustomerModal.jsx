import React, { useState, useEffect } from 'react'
import { Label, Form, Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'

/************************************* 
 * Function to get approval to Delete the Customer
 **************************************/

const DeleteCustomerModal = (props) => {
  const { open, toggleDeleteModal, fetchCustomerData, customer } = props;
 useEffect(() => {
    console.log("UnMount a Component using Hook")
    return () => {
      console.log("UnMount a Component using Hook1")
    }
  }, [])

  /************************************* 
  * Function to Delete the Customer
  **************************************/
  const deleteCustomer = (id) => {
    console.log("Customers:deleteCustomer")
    axios.delete(`/Customers/DeleteCustomer/${id}`)
      .then(function (res) {
        console.log(res);
        fetchCustomerData();
        toggleDeleteModal();
      })
      .catch(function (err) {
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
      <Modal.Content>
        <Modal.Description>
          <Header>Customer details</Header>
          <Form>
            <Form.Field>
              <Label as='a' color='red' ribbon>Customer ID</Label>
              <label>{customer.id}</label>
            </Form.Field>
            <Form.Field>
              <Label as='a' color='blue' ribbon>Customer Name</Label>
              <label>{customer.name}</label>
            </Form.Field>
            <Form.Field>
              <Label as='a' color='green' ribbon>Customer Address       </Label>
              <label>{customer.address}</label>
              <footer>Are you sure ?</footer>
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
          color='red'
          icon='cross'
          onClick={() => deleteCustomer(customer.id)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteCustomerModal