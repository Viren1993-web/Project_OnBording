import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Modal, Form } from 'semantic-ui-react';

function SalesCreateModal(props) {
    const { open, toggleNewModal, customers, products, stores, fetchSales } = props;
    //formatxxx is for the dropdown list display style purpose (display text and value)
    const [formatcustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [formatproducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [formatstores] = useState([]);
    const [selectedStoreId, setSelectedStoreId] = useState(null);
    const [date, setDate] = useState(null);
    const [disable, setDisable] = useState(true);

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

    useEffect(() => {
        if (selectedCustomerId === undefined || selectedProductId === undefined || selectedStoreId === undefined || date === undefined || date === "") {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [selectedCustomerId, selectedProductId, selectedStoreId, date]);

    const clearId = () => {
        toggleNewModal();
        setSelectedCustomerId(undefined);
        setSelectedStoreId(undefined);
        setSelectedProductId(undefined);
        setDate();
    }

    const submit = () => {
        var msg = ""
        if (selectedCustomerId != null && selectedProductId != null && selectedStoreId != null && date != null) {
            axios
                .post("Sales/PostSales", {
                    productId: selectedProductId,
                    customerId: selectedCustomerId,
                    storeId: selectedStoreId,
                    saledate: date
                })
                .then(() => {
                    toggleNewModal();
                    resetNewSalesData();
                    fetchSales();
                })
                .catch(function (err) {
                   
                    resetNewSalesData();
                   
                  });
        } else {
            /* Show Alert on blank Sales details */
            if (selectedCustomerId == null) {
                msg = "Customer info is empty..\n"
            }
            if (selectedProductId == null) {
                msg = msg + "Product info is empty..\n"
            }
            if (selectedStoreId == null) {
                msg = msg + "Store info is empty..\n"
            }
            if (date == null) {
                msg = msg + "SaleDate info is empty..\n\n"
            }
            msg = msg + "Please enter the correct Sale Details\n"
            alert(msg)
        }
    }
    /*********************************************************************************** 
* Function to Update the local state fields to null before exiting the AddNewSale
***********************************************************************************/
    const resetNewSalesData = () => {
        setcid(null)
        setpid(null)
        setsid(null)
        setsdate(null)
        console.log("AddNewSale:resetNewSalesData:Customer id: " + cid + " Product id: " + pid + " Store id: " + sid + " Sale date: " + sdate)
    }

    /*********************************************************************************** 
     * on Cancel, Function to Update the local state fields to null before exiting the AddNewSale
     ***********************************************************************************/
    const resetNewSalesDataOnCancel = () => {
        resetNewSalesData();
        toggleCreateModal();
        console.log("AddNewSale:resetNewSalesDataOnCancel:Customer id: " + cid + " Product id: " + pid + " Store id: " + sid + " Sale date: " + sdate)
    }


    /* }
      const checking = () => {
         if (date.length !== 10 || date[2] !== '/' || date[5] !== '/') {
             alert("Please input date in the format dd/mm/yyyy");
             return false;
         } else {
             return true;
         }
     } */
    return (
        <Modal
            open={open}
        >
            <Modal.Header>Create a new sales {selectedCustomerId} {selectedProductId} {selectedStoreId}</Modal.Header>
            <Modal.Content>
                <h3>Date Sold</h3>
                <Form.Field>
                    <input type="datetime-local" placeholder='' onChange={(e) => setDate(e.target.value)} />
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
                    /*   disabled={disable} */
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default SalesCreateModal;