import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react'
import axios from 'axios';
import AddNewSale from './AddNewSale';
import UpdateSaleModal from './UpdateSaleModal';
import DeleteSaleModal from './DeleteSaleModal';

export default class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            customers: [],
            products: [],
            stores: [],
            isloaded: false,
            openNewModal: false,
            openUpdateModal: false,
            openDeleteModal: false,
            salesToEdit: {},
            salesTodeleteId: undefined
        };
        this.fetchCustomer = this.fetchCustomer.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);
        this.fetchStores = this.fetchStores.bind(this);
        this.fetchSales = this.fetchSales.bind(this);
    }

    componentDidMount() {
        console.log("Sales Mounted!");
        this.fetchSales();
        this.fetchProducts();
        this.fetchCustomer();
        this.fetchStores();
    }

    componentDidUpdate() {
        console.log("Sales Update!");

    }

    componentWillUnmount() {
        console.log("Sales Unmount!");
    }

    fetchSales = () => {
        axios.get("Sales/GetSales")
            .then((res) => {
                res.data.forEach(element => {
                    let editdate = new Date(element.dateSold);
                    element.dateSold = formatdate(editdate);
                });
                this.setState({
                    sales: res.data,
                    isloaded: true
                });
            })
            .catch((error) => {
                alert(error);
            });

        const formatdate = (editdate) => {
            let year = editdate.getFullYear();
            let month = editdate.getMonth() + 1;
            let date = editdate.getDate();
            if (month < 10) { month = "0" + month }
            if (date < 10) { date = "0" + date }
            const finaldate = `${date}/${month}/${year}`;
            return finaldate;
        }
    }

    fetchCustomer = () => {
        axios.get("Customers/GetCustomers")
            .then((res) => {
                this.setState({
                    customers: res.data,
                });
            })
            .catch((error) => {
                alert(error);
            });
    }

    fetchProducts = () => {
        axios.get("Products/GetProducts")
            .then((res) => {
                this.setState({
                    products: res.data,
                });
            })
            .catch((error) => {
                alert(error);
            });
    }

    fetchStores = () => {
        axios.get("Stores/GetStores")
            .then((res) => {
                this.setState({
                    stores: res.data,
                });
            })
            .catch((error) => {
                alert(error);
            });
    }

    toggleNewModal = () => {
        this.setState({
            openNewModal: !this.state.openNewModal
        });
    }

    toggleUpdateModal = (s) => {
        this.setState({
            openUpdateModal: !this.state.openUpdateModal,
            salesToEdit: s
        })
    }

    toggleDeleteModal = (id) => {
        this.setState({
            openDeleteModal: !this.state.openDeleteModal,
            salesTodeleteId: id
        });
    }

    render() {
        const sales = this.state.sales;
        const openNewModal = this.state.openNewModal;
        const customers = this.state.customers;
        const products = this.state.products;
        const stores = this.state.stores;
        const salesToEdit = this.state.salesToEdit;
        const openUpdateModal = this.state.openUpdateModal;
        const openDeleteModal = this.state.openDeleteModal;
        const deleteId = this.state.salesTodeleteId
        if (!this.state.isloaded) {
            return (
                <div>loading...</div>
            )
        } else {
            return (
                <div>
                    <DeleteSaleModal
                        open={openDeleteModal}
                        toggleDeleteModal={() => this.toggleDeleteModal(deleteId)}
                        idToDelete={deleteId}
                        fetchSales={() => this.fetchSales()}
                    />
                    <UpdateSaleModal
                        open={openUpdateModal}
                        toggleUpdate={() => this.toggleUpdateModal(salesToEdit)}
                        salesToEdit={salesToEdit}
                        customers={customers}
                        stores={stores}
                        products={products}
                        fetchSales={() => this.fetchSales()}
                    />
                    <AddNewSale
                        open={openNewModal}
                        toggleNewModal={() => this.toggleNewModal()}
                        customers={customers}
                        products={products}
                        stores={stores}
                        fetchSales={() => this.fetchSales()}
                    />
                    <Button primary className='CREATE' onClick={() => this.toggleNewModal()}>Create Sales</Button>
                    <Table >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Customer</Table.HeaderCell>
                                <Table.HeaderCell>Product</Table.HeaderCell>
                                <Table.HeaderCell>Store</Table.HeaderCell>
                                <Table.HeaderCell>Date Sold</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {sales.map((s) => {
                                return (
                                    <Table.Row key={s.id}>
                                        <Table.Cell>{s.customer.name}</Table.Cell>
                                        <Table.Cell>{s.product.name}</Table.Cell>
                                        <Table.Cell>{s.store.name}</Table.Cell>
                                        <Table.Cell>{s.saledate}</Table.Cell>
                                        <Table.Cell><Button
                                            color='yellow'
                                            content='Edit'
                                            icon='edit'
                                            onClick={() => this.toggleUpdateModal(s)}
                                        /></Table.Cell>
                                        <Table.Cell><Button
                                            color='red'
                                            content='Delete'
                                            icon='trash'
                                            onClick={() => this.toggleDeleteModal(s.id)}
                                        /></Table.Cell>
                                    </Table.Row>
                                );
                            })}

                        </Table.Body>
                    </Table>
                </div>
            )
        }

    }
}