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
import InputTextAreaCommon from '../../infrastucture/common/components/input/input-text-area';
import { RateCommon } from '../../infrastucture/common/components/rate/rate-common';

export const ViewEvaluateManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [detailEvaluate, setDetailEvaluate] = useState({});
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataEvaluate = _data;

    const setDataEvaluate = (data) => {
        Object.assign(dataEvaluate, { ...data });
        _setData({ ...dataEvaluate });
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
    useEffect(() => {
        if (detailEvaluate) {
            setDataEvaluate({
                noiDung: detailEvaluate.noiDung,
                userName: detailEvaluate.userName,
                thoiGianDanhGia: detailEvaluate.thoiGianDanhGia,
                soSao: detailEvaluate.soSao,
                idDanhGia: detailEvaluate.idDanhGia,
                idDiaDiem: detailEvaluate.idDiaDiem,
            });
        };
    }, [detailEvaluate]);
    const param = useParams();
    const onDetailEvaluateAsync = async () => {
        const response = await api.getEvaluateById({
            id: param.id,

        },
            setLoading
        )
        setDetailEvaluate(response.danhGia);
    };
    useEffect(() => {
        onDetailEvaluateAsync();
    }, []);

    const onBack = () => {
        navigate(ROUTE_PATH.EVALUATE)
    };

    // const onUpdateDistrict = async () => {
    //     await setSubmittedTime(Date.now());
    //     if (isValidData()) {
    //         await api.updateDistrict({
    //             id: parseInt(param.id),
    //             tenQuanHuyen: dataEvaluate.tenQuanHuyen,
    //             status: dataEvaluate.status,
    //         },
    //             onBack,
    //             setLoading
    //         )
    //     }
    //     else {
    //         WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
    //     };
    // };

    return (
        <MainLayout breadcrumb={"Quản lý đánh giá"} title={"Thông tin chi tiết"} redirect={ROUTE_PATH.EVALUATE}>
            <div className='main-page h-100 flex-1 auto bg-white px-4 py-8'>
                <div className='bg-white'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Thông tin chi tiết</div>
                            <Row gutter={[30, 0]}>
                                <Col span={24}>
                                    <InputTextAreaCommon
                                        label={"Nội dung"}
                                        attribute={"noiDung"}
                                        isRequired={false}
                                        dataAttribute={dataEvaluate.noiDung}
                                        setData={setDataEvaluate}
                                        disabled={true}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Ngày đăng"}
                                        attribute={"thoiGianDanhGia"}
                                        isRequired={false}
                                        dataAttribute={dataEvaluate.thoiGianDanhGia}
                                        setData={setDataEvaluate}
                                        disabled={true}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Người dùng"}
                                        attribute={"userName"}
                                        isRequired={false}
                                        dataAttribute={dataEvaluate.userName}
                                        setData={setDataEvaluate}
                                        disabled={true}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24}>
                                    <InputTextCommon
                                        label={"Địa điểm"}
                                        attribute={"idDiaDiem"}
                                        isRequired={false}
                                        dataAttribute={dataEvaluate.idDiaDiem}
                                        setData={setDataEvaluate}
                                        disabled={true}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24}>
                                    <Row className='input-common' gutter={[20,20]} align={"middle"}> 
                                        <Col>
                                            <div className='title'>
                                                <span className='label'>
                                                    Số sao trung bình:
                                                </span>
                                            </div>
                                        </Col>
                                        <Col>
                                            <RateCommon
                                                soSao={dataEvaluate.soSao}
                                                luotXem={""}
                                            />
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='container-btn main-page bg-white p-4 flex flex-col '>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onBack} classColor="blue">Quay lại</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
