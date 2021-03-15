import React, { Component } from 'react';
import { Button, Table, Pagination } from 'semantic-ui-react'
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
            salesTodeleteId: undefined,
            totalSalesRec: 0,
            currentPage: 1,
            totalPage: 1
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
                    isloaded: true,
                    totalSalesRec: res.data.length,
                    totalPage: Math.ceil(res.data.length / 4)
                })
                 /* To fix the last Page Refresh on Delete to move to previous page */
                 if (((res.data.length % 4) == 0) && (this.state.currentPage > Math.ceil(res.data.length / 4))) {
                    console.log("Last Page= Current Page");
                    this.setState({
                        currentPage: (this.state.currentPage == 1) ? 1 : this.state.currentPage - 1
                    })

                }
            })
            .catch((error) => {
                alert(error);
                this.setState({ loaded: false })
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
        axios.get("Customers/GetCustomer")
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
        axios.get("Products/GetProduct")
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
        axios.get("Stores/GetStore")
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
        const deleteId = this.state.salesTodeleteId;
        const totalSalesRec = this.state.totalSalesRec;
        const currentPage = this.state.currentPage;
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
                     <h1> S A L E S...... </h1>
                    <Button primary className='CREATE' onClick={() => this.toggleNewModal()}>Create Sales</Button>
                    <Table inverted>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>CUSTOMER</Table.HeaderCell>
                                <Table.HeaderCell>PRODUCT</Table.HeaderCell>
                                <Table.HeaderCell>STORE</Table.HeaderCell>
                                <Table.HeaderCell>SOLED DATE</Table.HeaderCell>
                                <Table.HeaderCell>ACTION</Table.HeaderCell>
                                <Table.HeaderCell>ACTION</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {sales.map((s,index) => {
                                 if ((index >= ((currentPage * 4) - 4)) && (index < (currentPage * 4))) {
                                    console.log("inside if:" + index)
                                }
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
                    <Pagination
                        boundryRange={0}
                        activePage={currentPage}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={0}
                        totalPages={Math.ceil(totalSalesRec / 4)}
                        onPageChange={(e, pageData) => this.pageChange(e, pageData)}

                    />

                    <h2> {currentPage}</h2>
                </div>
            )
        }

    }
}