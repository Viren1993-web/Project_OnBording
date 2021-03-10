import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Modal, Form } from 'semantic-ui-react';

function UpdateSaleModal(props) {
  const { open, toggleUpdate, customers, products, stores, salesToEdit, fetchSales } = props;

  //formatxxx is for the dropdown list display style purpose (display text and value)
  const [formatcustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState();
  const [formatproducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState();
  const [formatstores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState();
  const [date, setDate] = useState();
  const [disable, setDisable] = useState(true);

  const findDefaltCustomer = () => {
    const something = formatcustomers.find(x => x.key === salesToEdit.customerId);
    if (something !== undefined) return something.value;
  }

  const findDefaltProduct = () => {
    const something = formatproducts.find(x => x.key === salesToEdit.productId)
    if (something !== undefined) return something.value;
  }

  const findDefaltStore = () => {
    const something = formatstores.find(x => x.key === salesToEdit.storeId)
    if (something !== undefined) return something.value;
  }
  // Start building the dropdowm list
  useEffect(() => {
    customers.forEach((c) => {
      formatcustomers.push({
        key: c.id,
        text: c.name,
        value: c.name
      });
    });
  }, [customers]);

  useEffect(() => {
    products.forEach((p) => {
      formatproducts.push({
        key: p.id,
        text: p.name,
        value: p.name
      });
    });
  }, [products]);

  useEffect(() => {
    stores.forEach((s) => {
      formatstores.push({
        key: s.id,
        text: s.name,
        value: s.name
      });
    });
  }, [stores]);
  // End building the dropdowm list

  useEffect(() => {
    setDate(salesToEdit.dateSold);
    setSelectedCustomerId(salesToEdit.customerId);
    setSelectedProductId(salesToEdit.productId);
    setSelectedStoreId(salesToEdit.storeId);
  }, [salesToEdit]);

  useEffect(() => {
    if (date === undefined || date === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [date]);

  const clearId = () => {
    toggleUpdate();
  }

  const submit = () => {
    if (checking()) {
      axios
        .put(`Sales/PutSales/${salesToEdit.id}`, {
          id: salesToEdit.id,
          productId: selectedProductId,
          customerId: selectedCustomerId,
          storeId: selectedStoreId,
          saledate: date.substring(6) + '-' + date.substring(3, 5) + '-' + date.substring(0, 2)
        })
        .then(() => {
          toggleUpdate();
          fetchSales();
        })
        .catch((e) => alert(e));
    }
  }
  const checking = () => {
    if (date.length !== 10 || date[2] !== '/' || date[5] !== '/') {
      alert("Please input date in the format dd/mm/yyyy");
      return false;
    } else {
      return true;
    }
  }
  return (
    <Modal
      open={open}
    >
      <Modal.Header>Update a sales</Modal.Header>
      <Modal.Content>
        <h3>Date Sold</h3>
        <Form.Field>
          <input placeholder='' onChange={(e) => setDate(e.target.value)} defaultValue={salesToEdit.saledate} />
        </Form.Field>
        <h3>Customer</h3>
        <Dropdown
          placeholder='Select Customer'
          fluid
          selection
          onChange={(e, data) => {
            const { value } = data;
            const { key } = (data.options.find(x => x.value === value));
            setSelectedCustomerId(key);
          }}
          defaultValue={findDefaltCustomer()}
          options={formatcustomers}
        />
        <h3>Product</h3>
        <Dropdown
          placeholder='Select Product'
          fluid
          selection
          onChange={(e, data) => {
            const { value } = data;
            const { key } = (data.options.find(x => x.value === value));
            setSelectedProductId(key);
          }}
          defaultValue={findDefaltProduct()}
          options={formatproducts}
        />
        <h3>Store</h3>
        <Dropdown
          placeholder='Select Store'
          fluid
          selection
          onChange={(e, data) => {
            const { value } = data;
            const { key } = (data.options.find(x => x.value === value));
            setSelectedStoreId(key);
          }}
          defaultValue={findDefaltStore()}
          options={formatstores}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => clearId()}>
          Cancel
        </Button>
        <Button
          content="Create"
          labelPosition='right'
          icon='checkmark'
          onClick={() => submit()}
          disabled={disable}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}
export default UpdateSaleModal;