import React, { useState, useEffect } from 'react'
import { Form, Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'
import CurrencyFormat from 'react-currency-format'

/************************************* 
 * Function to Add/Create the Customer
 **************************************/
const AddNewProduct = (props) => {
  const { open, toggleCreateModal, fetchProductData } = props;
  const [name, setname] = useState();
  const [price, setprice] = useState();

  useEffect(() => {
    console.log(name + price)
    return () => {
      console.log("UnMount a Component using Hook")
    }
  }, [name, price])

  /************************************* 
   * Function to Add/Create the Customer using axios
   **************************************/
  const createProduct = () => {
    axios.post('/Products/PostProduct', {
      name: name,
      price: price
    })
      .then(function (res) {
        console.log(res);
        fetchProductData();
        toggleCreateModal();
      })
      .catch(function (err) {
        console.log(err);
        toggleCreateModal();
      });
  }
var priceFormat=require('react-currency-format')



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
          <Header>Default Profile Image</Header>
          <Form>
            <Form.Field>
              <label>Product Name</label>
              <input placeholder='Product Name' onChange={(e) => setname(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Product Price</label>

              <input placeholder='Product price' 
              onVolumeChange={(e) => setprice(<priceFormat value={e.target.value} displayType={'isNUmericString'} prefix={'$'}/>)} />
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
          onClick={() => createProduct()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default AddNewProduct