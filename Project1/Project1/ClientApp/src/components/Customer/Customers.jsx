import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'semantic-ui-react';
import AddNewCustomer from './AddNewCustomer';
import DeleteCustomerModal from './DeleteCustomerModal';
import UpdateCustomerModal from './UpdateCustomerModal';

/************************************* 
 * Class to CURD the Customer data
 **************************************/
export class Customers extends Component {
    static displayName = Customers.name;

    /***********************Constructor************/ 
    constructor(props) {
        super(props);
        this.state = { 
            customers: [], 
            loaded: false, 
            openCreateModal: false, 
            openDeleteModal: false, 
            openUpdateModal: false, 
            customer: {} 
                   };
        this.fetchCustomerData = this.fetchCustomerData.bind(this);
        }

 /************************************* 
 * Function to Fetch the Customer Data
 **************************************/
    fetchCustomerData() {
        console.log("Customers:fetchCustomerData")
        axios.get('/Customers/GetCustomers')
            .then( (res) => {
                // handle success
                console.log(res.data);
                this.setState({
                    customers: res.data,
                    loaded: true
                })

            })
            .catch( (err) => {
                // handle error
                console.log(err);
                this.setState({loaded: false})
            })
            .then(() =>{
                // always executed
                console.log("Customers:fetchdata Always Executed");
            });

    }

    
/************************************************************* 
 * Functions to Learn about the life Cycle of React components
 *************************************************************/
 
    componentDidMount() {
        console.log("Customers:componentDidMount");

        this.fetchCustomerData();
    }


  /************************************************************* 
 * Functions to  toggle the status of openCreateModal between true and false
 * to Open or notopen the Modal(Child Component AddNewCustomer)
 *************************************************************/
    toggleCreateModal = () => {
        this.setState({openCreateModal: !this.state.openCreateModal})
        console.log("Customers:toggleCreateModal")
    }

/************************************************************* 
 * Functions to  toggle the status of openDeleteModal between true and false
 * to Open or notopen the Modal(Child Component DeleteCustomerModal)
 *************************************************************/
    toggleDeleteModal = () => {
        this.setState({
            openDeleteModal: !this.state.openDeleteModal
        })
        console.log("Customers:toggleDeleteModal")
    }


/************************************************************* 
 * Functions setStateDeleteModal  copy the Customer Row to customer variable which can be passed to
 *  the DeleteCustomerModal(Child Component )
 *************************************************************/
    setStateDeleteModal = (customer) => {
        this.setState({customer: customer})
        console.log("Customers:setStateDeleteModal:Name: "+customer.name+" address: "+customer.address);
        this.toggleDeleteModal();
    }

 /************************************************************* 
 * Functions to  toggle the status of openUpdateModal between true and false
 * to Open or notopen the Modal(Child Component UpdateCustomerModal)
 *************************************************************/
    toggleUpdateModal = () => {
        this.setState({
            openUpdateModal: !this.state.openUpdateModal
        })
        console.log("Customers:toggleUpdateModal")
   }

/************************************************************* 
 * Functions setStateUpdateModal copy the Customer Row to customer variable which can be passed to
 *  the UpdateCustomerModal(Child Component )
 *************************************************************/
    setStateUpdateModal = (customer) => {
        this.setState({customer: customer})
        console.log("Customers:setStateUpdateModal:Name: "+customer.name+" address: "+customer.address);
        this.toggleUpdateModal();
    }
    
/************************************* 
 * Using Semantic UI Modal & Form  as UI
 **************************************/
    render() {
        console.log("Customers:render");
        const customers = this.state.customers;
        const loaded = this.state.loaded;
        const openCreateModal = this.state.openCreateModal;
        const openDeleteModal = this.state.openDeleteModal;
        const openUpdateModal = this.state.openUpdateModal;
        const customer = this.state.customer;
        console.log("Customers:render:Name: "+customer.name+" address: "+customer.address);
        if (loaded) {
            return (
                <div>
                    <AddNewCustomer 
                    open={openCreateModal} 
                    toggleCreateModal={() => this.toggleCreateModal()} 
                    fetchCustomerData={() => this.fetchCustomerData()}
                     />

                    <DeleteCustomerModal 
                    open={openDeleteModal} 
                    toggleDeleteModal={() => this.toggleDeleteModal()} 
                    fetchCustomerData={() => this.fetchCustomerData()} 
                    customer={customer} />
                    
                    <UpdateCustomerModal 
                    open={openUpdateModal} 
                    toggleUpdateModal={() => this.toggleUpdateModal()} 
                    fetchCustomerData={() => this.fetchCustomerData()} 
                    customer={customer} />

                    <h1> C U S T O M E R S...... </h1>
                    <Button color='blue' content='Add New Customer' onClick={this.toggleCreateModal} />
                    <Button color='green' content='Refresh' onClick={this.fetchCustomerData} />
                    <Table inverted>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>CUSTOMER NAME</Table.HeaderCell>
                <Table.HeaderCell>CUSTOMER ADDRESS</Table.HeaderCell>
                <Table.HeaderCell>ACTION</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
        {customers.map((c) => {
            return (
            <Table.Row key={c.id}>
                <Table.Cell>{c.id}</Table.Cell>
                <Table.Cell>{c.name}</Table.Cell>
                <Table.Cell>{c.address}</Table.Cell>
                <Table.Cell>
                    <Button color='yellow' content='Edit' icon='edit' onClick={() => this.setStateUpdateModal(c)} />
                    <Button color='red' content='Delete'  icon='trash' onClick={() => this.setStateDeleteModal(c)} /> 
                </Table.Cell>
            </Table.Row>
                  )
        })}
        </Table.Body>
    </Table>
                </div>
            );
        } else {
            return (
                <div>
                    <h2> L O A D I N G .....</h2>
                </div>);
        }
    }
}