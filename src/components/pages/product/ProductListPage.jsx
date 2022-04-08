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
import {useMutation, useQuery, useQueryClient} from "react-query";
import {deleteProduct, getAllProducts} from "../../../lib/query/productQuery";

const ProductListPage = ({...props}) => {
    const queryClient = useQueryClient()
    const {mutate:deleteProductMutate} = useMutation(deleteProduct,{
        onSettled:()=>{
            queryClient.invalidateQueries('products')
        }
    })

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
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{product.name}</CTableDataCell>
                                            <CTableDataCell>{product.desc}</CTableDataCell>
                                            <CTableDataCell>
                                                <CImage rounded thumbnail width={200} src='https://www.91-img.com/gallery_images_uploads/d/7/d7cf5e2b1a3a3dfcca8a8dbb524fb11a8fb1c8e8.JPG?tr=h-550,w-0,c-at_max'/>
                                            </CTableDataCell>
                                            <CTableDataCell>{product.price}</CTableDataCell>
                                            <CTableDataCell>
                                                <CButtonGroup role="group" aria-label="Basic example" className="gap-2">
                                                    <CButton color="warning" to={`update/${product.id}`} component={NavLink}
                                                             variant="outline">Edit</CButton>
                                                    <CButton color="danger" variant="outline" onClick={()=>(deleteProductMutate(product.id))}>Delete</CButton>
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
