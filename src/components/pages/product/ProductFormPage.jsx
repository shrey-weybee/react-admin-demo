import * as React from 'react';
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody, CCardFooter,
    CCardTitle,
    CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormText, CFormTextarea, CRow
} from "@coreui/react";
import {NavLink} from "react-router-dom";
import { useForm } from "react-hook-form";

const ProductFormPage = ({...props}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);
    return (
        <CForm onSubmit={handleSubmit(onSubmit)} >
            <CCard className="mb-3">
                <CCardBody>
                    <CRow className="justify-content-between">
                        <CCol>
                            <CCardTitle>Product Add</CCardTitle>
                        </CCol>
                        <CCol sm="auto">
                            <CButtonGroup role="group" aria-label="Basic example" className="gap-2">
                                <CButton color="primary" variant="outline" to='./../' component={NavLink} >Cancel</CButton>
                                <CButton color="success" variant="outline" type="submit">Save</CButton>
                            </CButtonGroup>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <CCard className="text-center ">
                    <CCardBody className="text-start">
                        <CRow className="mb-3">
                            <CCol>
                                <div>
                                    <CFormLabel htmlFor="exampleFormControl1">Name</CFormLabel>
                                    <CFormInput type="text" id="exampleFormControl1" {...register('name',{required:true})} invalid={errors.name} placeholder="Name..."/>
                                    {errors.name && <CFormText className="text-danger">We'll never share your email with anyone else.</CFormText>}

                                </div>
                            </CCol>
                            <CCol>
                                <div>
                                    <CFormLabel htmlFor="exampleFormControl2">Price</CFormLabel>
                                    <CFormInput type="number" id="exampleFormControl2" {...register('price',{required:true})} invalid={errors.price}/>
                                    {errors.price && <CFormText className="text-danger">We'll never share your email with anyone else.</CFormText>}
                                </div>
                            </CCol>
                        </CRow>
                        <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControl3">Link</CFormLabel>
                            <CFormInput type="text" id="exampleFormControl3" placeholder="Link..." {...register('link',{required:true})} invalid={errors.link} />
                            {errors.link && <CFormText className="text-danger">We'll never share your email with anyone else.</CFormText>}
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControl4">Description</CFormLabel>
                            <CFormTextarea id="exampleFormControl4" rows="3" {...register('desc')}></CFormTextarea>
                        </div>
                    </CCardBody>
                    <CCardFooter className="text-end">
                        <CButtonGroup role="group" aria-label="Basic example" className="gap-2">
                            <CButton color="primary" variant="outline" to='./../' component={NavLink} >Cancel</CButton>
                            <CButton color="success" variant="outline" type="submit">Save</CButton>
                        </CButtonGroup>
                    </CCardFooter>
            </CCard>
        </CForm>
    );
};
export default ProductFormPage
