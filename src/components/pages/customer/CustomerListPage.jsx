import * as React from 'react';
import {useDeleteCustomerMutation, useGetAllCustomersQuery} from "../../../lib/redux/services/customer";
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardTitle,
    CCol, CImage,
    CRow,
    CSpinner,
    CTable, CTableBody, CTableDataCell,
    CTableHead, CTableHeaderCell, CTableRow
} from "@coreui/react";
import {NavLink} from "react-router-dom";

const CustomerListPage = ({...props}) => {
    const {data:customers, isLoading}= useGetAllCustomersQuery()
    const [deleteCustomer] = useDeleteCustomerMutation()

    return (
        <>
            <CCard className="mb-3">
                <CCardBody>
                    <CRow className="justify-content-between">
                        <CCol>
                            <CCardTitle>Customer List</CCardTitle>
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
                    {(isLoading) ?
                        (<CSpinner color="primary"/>)
                        : (
                            <CTable bordered responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Company</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Primary Contact</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Primary Email</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                                        <CTableHeaderCell scope="col"> </CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {customers && customers.map((customer, index) => (
                                        <CTableRow key={index}>
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{customer.company}</CTableDataCell>
                                            <CTableDataCell>{customer.primary_contact}</CTableDataCell>
                                            <CTableDataCell>{customer.primary_email}</CTableDataCell>
                                            <CTableDataCell>{customer.phone}</CTableDataCell>
                                            <CTableDataCell>
                                                <CButtonGroup role="group" aria-label="Basic example" className="gap-2">
                                                    <CButton color="warning" to={`update/${customer.id}`} component={NavLink}
                                                             variant="outline">Edit</CButton>
                                                    <CButton color="danger" variant="outline" onClick={()=>(deleteCustomer(customer.id))}>Delete</CButton>
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
export default CustomerListPage
