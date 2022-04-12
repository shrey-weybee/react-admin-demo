import * as React from 'react';
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody, CCardFooter,
    CCardTitle,
    CCol, CForm,  CFormInput, CFormLabel, CFormText, CFormTextarea, CRow
} from "@coreui/react";
import {Link,useNavigate,useParams  } from "react-router-dom";
import { useForm } from "react-hook-form";
import {useMutation} from "react-query";
import {addProduct, getProductById, updateProduct} from "../../../../lib/query/productQuery";
import {useEffect} from "react";

const ProductFormPage = ({...props}) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } , setValue } = useForm();
    const {mutate:addProductMutate} =  useMutation(addProduct,{
        onSettled:()=>(navigate('/products'))
    })
    const {mutate:updateProductMutate} =  useMutation(updateProduct,{
        onSettled:()=>(navigate('/products'))
    })

    const {mutate:getProductByIdMutate} = useMutation(getProductById,{
        onSuccess:(data)=>{
            Object.keys(data).forEach((key)=>{
                setValue(key,data[key])
            })
        }
    })

    useEffect(()=>{
        if(productId){
            getProductByIdMutate(productId)
        }
    },[getProductByIdMutate, productId])

    const onSubmit = data => {
        console.log(data)
        if(data.id){
            updateProductMutate(data)
        }else {
            addProductMutate(data)
        }
    };
    return (
        <CForm onSubmit={handleSubmit(onSubmit)} >
            <CCard className="mb-3">
                <CCardBody>
                    <CRow className="justify-content-between">
                        <CCol>
                            <CCardTitle>{productId ? 'Edit':'Add'} Product</CCardTitle>
                        </CCol>
                        <CCol sm="auto">
                            <CButtonGroup role="group" aria-label="Basic example" className="gap-2">
                                <CButton color="primary" variant="outline" to='/products' component={Link} >Cancel</CButton>
                                <CButton color="success" variant="outline" type="submit">{productId ? 'Update':'Save'}</CButton>
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
                                    {errors.name && <CFormText className="text-danger">* Required</CFormText>}

                                </div>
                            </CCol>
                            <CCol>
                                <div>
                                    <CFormLabel htmlFor="exampleFormControl2">Price</CFormLabel>
                                    <CFormInput type="number" id="exampleFormControl2" {...register('price',{required:true})} invalid={errors.price}/>
                                    {errors.price && <CFormText className="text-danger">* Required</CFormText>}
                                </div>
                            </CCol>
                        </CRow>
                        <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControl3">Link</CFormLabel>
                            <CFormInput type="text" id="exampleFormControl3" placeholder="Link..." {...register('link',{required:true})} invalid={errors.link} />
                            {errors.link && <CFormText className="text-danger">* Required</CFormText>}
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControl4">Description</CFormLabel>
                            <CFormTextarea id="exampleFormControl4" rows="3" {...register('desc')}></CFormTextarea>
                        </div>
                    </CCardBody>
                    <CCardFooter className="text-end">
                        <CButtonGroup role="group" aria-label="Basic example" className="gap-2">
                            <CButton color="primary" variant="outline" to='/products' component={Link} >Cancel</CButton>
                            <CButton color="success" variant="outline" type="submit">{productId ? 'Update':'Save'}</CButton>
                        </CButtonGroup>
                    </CCardFooter>
            </CCard>
        </CForm>
    );
};
export default ProductFormPage
