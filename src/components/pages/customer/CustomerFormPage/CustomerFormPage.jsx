import * as React from 'react';
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody, CCardFooter,
    CCardTitle,
    CCol,
    CForm,
    CFormInput,
    CFormLabel, CFormText, CFormTextarea,
    CRow, CSpinner
} from "@coreui/react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {
    useGetCustomerByIdQuery,
    useAddCustomerMutation,
    useUpdateCustomerMutation
} from "../../../../lib/redux/services/customer";

const CustomerFormPage = ({...props}) => {

    const { customerId } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } , setValue, reset } = useForm();

    const [addCustomer] = useAddCustomerMutation()
    const [updateCustomer] = useUpdateCustomerMutation()
    const {data:customer, isLoading} = useGetCustomerByIdQuery(customerId,{skip:!customerId})


    useEffect(()=>{
        if(customerId && customer) {
            Object.keys(customer).forEach((key)=>{
                setValue(key,customer[key])
            })
        }
        else{
            reset()
        }
    },[customerId,customer])

    const onSubmit = async data => {
        console.log(data)
        if(data.id){
            await updateCustomer(data)
        }else {
            await addCustomer(data)
        }
        navigate('/customers')
    };
    return (
        <CForm onSubmit={handleSubmit(onSubmit)} className="customer-form-page" >
            <CCard className="mb-3">
                <CCardBody>
                    <CRow className="justify-content-between">
                        <CCol className="text-v-center">
                            <CCardTitle>{customerId ? 'Edit':'Add'} Customer</CCardTitle>
                        </CCol>
                        <CCol sm="auto">
                            <CButtonGroup role="group" aria-label="Basic example" className="gap-2">
                                <CButton color="primary" variant="outline" to='/customers' component={Link} >Cancel</CButton>
                                <CButton color="success" variant="outline" type="submit">{customerId ? 'Update':'Save'}</CButton>
                            </CButtonGroup>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <CCard className="text-center ">
                {isLoading? (<CSpinner color="primary"/>)
                    : (
                    <>
                        <CCardBody className="text-start">
                            <div className="mb-3">
                                <CFormLabel htmlFor="exampleFormControl1">Company</CFormLabel>
                                <CFormInput type="text" id="exampleFormControl1" {...register('company',{required:true})} invalid={errors.company} placeholder="Name..."/>
                                {errors.company && <CFormText className="text-danger">* Required</CFormText>}

                            </div>
                            <CRow className="mb-3">
                                <CCol>
                                    <div>
                                        <CFormLabel htmlFor="exampleFormControl1">Primary Contact</CFormLabel>
                                        <CFormInput type="text" id="exampleFormControl1" {...register('primary_contact',{required:true})} invalid={errors.primary_contact} placeholder="Contact..."/>
                                        {errors.primary_contact && <CFormText className="text-danger">* Required</CFormText>}
                                    </div>
                                </CCol>
                                <CCol>
                                    <div>
                                        <CFormLabel htmlFor="exampleFormControl1">Primary Email</CFormLabel>
                                        <CFormInput type="text" id="exampleFormControl1" {...register('primary_email',{required:true})} invalid={errors.primary_email} placeholder="Email..."/>
                                        {errors.primary_email && <CFormText className="text-danger">* Required</CFormText>}
                                    </div>
                                </CCol>
                                <CCol>
                                    <div>
                                        <CFormLabel htmlFor="exampleFormControl1">Phone</CFormLabel>
                                        <CFormInput type="tel" id="exampleFormControl1" {...register('phone',{required:true})} invalid={errors.phone} placeholder="Phone..."/>
                                        {errors.phone && <CFormText className="text-danger">* Required</CFormText>}
                                    </div>
                                </CCol>
                            </CRow>
                        </CCardBody>
                        <CCardFooter className="text-end">
                            <CButtonGroup role="group" aria-label="Basic example" className="gap-2">
                                <CButton color="primary" variant="outline" to='/customers' component={Link} >Cancel</CButton>
                                <CButton color="success" variant="outline" type="submit">{customerId ? 'Update':'Save'}</CButton>
                            </CButtonGroup>
                        </CCardFooter>
                    </>
                    )}
            </CCard>
        </CForm>
    );
};
export default CustomerFormPage
