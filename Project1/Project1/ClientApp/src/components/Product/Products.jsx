import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Pagination } from 'semantic-ui-react';
import AddNewProduct from './AddNewProduct';
import DeleteProductModal from './DeleteProductModal';
import UpdateProductModal from './UpdateProductModal';
import CurrencyFormat from 'react-currency-format'

/************************************* 
 * Class to CURD the Product data
 **************************************/
export class Products extends Component {
    static displayName = Products.name;


    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loaded: false,
            openCreateModal: false,
            openDeleteModal: false,
            openUpdateModal: false,
            product: {},
            totalProductsRec: 0,
            currentPage: 1,
            totalPage: 1
        };
        this.fetchProductData = this.fetchProductData.bind(this);

    }
    /************************************* 
    * Function to Add/Create the Product
    **************************************/
    fetchProductData() {
        console.log("Products:fetchProductData")
        axios.get('/Products/GetProduct')
            .then((res) => {
                // handle success
                console.log(res.data);
                this.setState({
                    Product: res.data,
                    loaded: true,
                    totalProductsRec: res.data.length,
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
            .catch((err) => {
                // handle error
                console.log(err);
                this.setState({ loaded: false })
            })
            .then(() => {
                // always executed
                console.log("Always Executed");
            });

    }

    /************************************************************* 
    * Functions to Learn about the life Cycle of React components
    *************************************************************/

    componentDidMount() {
        console.log("Products:componentDidMount");

        this.fetchProductData();
    }

    /************************************************************* 
     * Functions to  toggle the status of openCreateModal between true and false
     * to Open or notopen the Modal(Child Component AddNewProduct)
     *************************************************************/
    toggleCreateModal = () => {
        this.setState({ openCreateModal: !this.state.openCreateModal })
        console.log("Products:toggleCreateModal")
    }


    /************************************************************* 
     * Functions to  toggle the status of openDeleteModal between true and false
     * to Open or notopen the Modal(Child Component DeleteProductModal)
     *************************************************************/
    toggleDeleteModal = () => {
        this.setState({
            openDeleteModal: !this.state.openDeleteModal
        })

        console.log("Products:toggleDeleteModal")

    }

    /************************************************************* 
     * Functions setStateDeleteModal  copy the Product Row to customer variable which can be passed to
     *  the DeleteProductModal(Child Component )
     *************************************************************/
    setStateDeleteModal = (product) => {
        this.setState({ product: product })
        console.log("Products:setStateDeleteModal:Name: " + product.name + " address: " + product.address);
        this.toggleDeleteModal();
    }

    /************************************************************* 
     * Functions to  toggle the status of openUpdateModal between true and false
     * to Open or notopen the Modal(Child Component UpdateProductModal)
     *************************************************************/
    toggleUpdateModal = () => {
        this.setState({
            openUpdateModal: !this.state.openUpdateModal
        })

        console.log("Products:toggleUpdateModal")

    }

    /************************************************************* 
    * Functions setStateUpdateModal copy the Product Row to customer variable which can be passed to
    *  the UpdateProductModal(Child Component )
    *************************************************************/
    setStateUpdateModal = (product) => {
        this.setState({ product: product })
        console.log("Products:setStateUpdateModal:Name: " + product.name + " address: " + product.address);
        this.toggleUpdateModal();
    }
/************************************************************* 
        * Functions pageChange set the Pagination attributes
        *************************************************************/
 pageChange = (e, pagData) => {
    this.setState({
        currentPage: pagData.activePage,
        totalPage: pagData.totalPages
    })
    console.log(pagData);
    console.log("Products:pageChange:Saleid: Product id: Store id: Sale Time: ");
}

    /************************************* 
     * Using Semantic UI Modal & Form  as UI
     **************************************/
    render() {
        console.log("Products:render");
        const Product = this.state.Product;
        const loaded = this.state.loaded;
        const openCreateModal = this.state.openCreateModal;
        const openDeleteModal = this.state.openDeleteModal;
        const openUpdateModal = this.state.openUpdateModal;
        const product = this.state.product;
        const totalProductsRec = this.state.totalProductsRec;
        const currentPage = this.state.currentPage;

        console.log("Products:render:Name: " + product.name + " address: " + product.address);
        if (loaded) {
            return (
                <div>
                    <AddNewProduct
                        open={openCreateModal}
                        toggleCreateModal={() => this.toggleCreateModal()}
                        fetchProductData={() => this.fetchProductData()}
                        name={product.name} />

                    <DeleteProductModal
                        open={openDeleteModal}
                        toggleDeleteModal={() => this.toggleDeleteModal()}
                        fetchProductData={() => this.fetchProductData()}
                        product={product} />

                    <UpdateProductModal
                        open={openUpdateModal}
                        toggleUpdateModal={() => this.toggleUpdateModal()}
                        fetchProductData={() => this.fetchProductData()}
                        product={product} />

                    <h1> P R O D U C T S .......</h1>
                    <Button color='blue' content='Add New Product' onClick={this.toggleCreateModal} />
                    <Table inverted>
                        <Table.Header>
                            <Table.Row>

                                <Table.HeaderCell>PRODUCT NAME</Table.HeaderCell>
                                <Table.HeaderCell>PRODUCT PRICE</Table.HeaderCell>
                                <Table.HeaderCell>ACTION</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {Product.map((p, index) => {
                                if ((index >= ((currentPage * 4) - 4)) && (index < (currentPage * 4))) {
                                    console.log("inside if:" + index)

                                    return (
                                        <Table.Row key={p.id}>

                                            <Table.Cell>{p.name}</Table.Cell>
                                            <Table.Cell>
                                                <CurrencyFormat value={p.price} displayType={'text'} prefix={'$'} />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button color='yellow' content='Edit' icon='edit' onClick={() => this.setStateUpdateModal(p)} />
                                                <Button color='red' content='Delete' icon='trash' onClick={() => this.setStateDeleteModal(p)} />
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                }
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
                        totalPages={Math.ceil(totalProductsRec / 4)}
                        onPageChange={(e, pageData) => this.pageChange(e, pageData)}
                    />
                    <h2> {currentPage}</h2>
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