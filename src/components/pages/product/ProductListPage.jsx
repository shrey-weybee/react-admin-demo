import * as React from 'react';
import {
    CButton, CButtonGroup,
    CCard, CCardBody, CCardSubtitle,
    CCardTitle, CCol, CImage, CRow, CSpinner,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from "@coreui/react";
import {NavLink} from "react-router-dom";
import {useQuery} from "react-query";
import {getAllProducts} from "../../../lib/query/productQuery";

const ProductListPage = ({...props}) => {

    const {data:products,isLoading,isFetching} = useQuery('products',getAllProducts,{
        initialData:[]
    })

    return (
        <>
            <CCard className="mb-3">
                <CCardBody>
                    <CRow className="justify-content-between">
                        <CCol>
                            <CCardTitle>Product List</CCardTitle>
                            {JSON.stringify(products)}
                        </CCol>
                        <CCol sm="auto">
                            <CButtonGroup role="group" aria-label="Basic example" className="gap-2">
                                <CButton color="primary" to='create' component={NavLink} variant="outline">Add</CButton>
                            </CButtonGroup>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <CCard className="text-center ">
                <CCardBody>
                    {(isLoading || isFetching) ?
                        (<CSpinner color="primary"/>)
                        : (
                            <CTable bordered responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Link</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                                        <CTableHeaderCell scope="col"> </CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {products && products.map((product, index) => (
                                        <CTableRow key={index}>
                                            <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
                                            <CTableDataCell>{product.name}</CTableDataCell>
                                            <CTableDataCell>{product.desc}</CTableDataCell>
                                            <CTableDataCell>
                                                <CImage rounded thumbnail width={200} src={product.link}/>
                                            </CTableDataCell>
                                            <CTableDataCell>{product.price}</CTableDataCell>
                                            <CTableDataCell>
                                                <CButtonGroup role="group" aria-label="Basic example" className="gap-2">
                                                    <CButton color="warning" to='update' component={NavLink}
                                                             variant="outline">Edit</CButton>
                                                    <CButton color="danger" variant="outline">Delete</CButton>
                                                </CButtonGroup>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        )
                    }
                </CCardBody>
            </CCard>
        </>

    );
};
export default ProductListPage
