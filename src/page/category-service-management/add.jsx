import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import { WarningMessage } from '../../infrastucture/common/components/toast/notificationToast';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';
import Constants from '../../core/common/constant';

export const AddCategoryServiceManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataCategory = _data;

    const setDataCategory = (data) => {
        Object.assign(dataCategory, { ...data });
        _setData({ ...dataCategory });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });

        return allRequestOK;
    };

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.CATEGORY_VEHICLE)
    };

    const onCreateCategory = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.createCategory({
                tenDanhMuc: dataCategory.tenDanhMuc,
                tenDanhMucUS: dataCategory.tenDanhMucUS,
                status: 1,
                parentId: Constants.CategoryConfig.Vehicle.value
            },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        }
    };
    return (
        <MainLayout breadcrumb={"Quản lý danh mục dịch vụ du lịch"} title={"Thêm danh mục dịch vụ du lịch"} redirect={ROUTE_PATH.CATEGORY_VEHICLE}>

            <div className='main-page h-100 flex-1 auto bg-white px-8 py-4'>
                <div className='bg-white'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Thêm thông tin mới</div>
                            <Row gutter={[30, 0]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Tên danh mục"}
                                        attribute={"tenDanhMuc"}
                                        isRequired={true}
                                        dataAttribute={dataCategory.tenDanhMuc}
                                        setData={setDataCategory}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Tên danh mục(Tiếng anh)"}
                                        attribute={"tenDanhMucUS"}
                                        isRequired={true}
                                        dataAttribute={dataCategory.tenDanhMucUS}
                                        setData={setDataCategory}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div >
            <div className='container-btn main-page bg-white p-4 flex flex-col '>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onBack} classColor="blue">Quay lại</ButtonCommon>
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onCreateCategory} classColor="orange">Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
