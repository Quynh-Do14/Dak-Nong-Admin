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

export const ViewDistrictManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [detailDistrict, setDetailDistrict] = useState({});
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataDistrict = _data;

    const setDataDistrict = (data) => {
        Object.assign(dataDistrict, { ...data });
        _setData({ ...dataDistrict });
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
        if (detailDistrict) {
            setDataDistrict({
                tenQuanHuyen: detailDistrict.tenQuanHuyen,
                status: detailDistrict.status,
            });
        };
    }, [detailDistrict]);
    const param = useParams();
    const onDetailDistrictAsync = async () => {
        const response = await api.getDistrictById({
            id: param.id,

        },
            setLoading
        )
        setDetailDistrict(response.quanHuyen);
    };
    useEffect(() => {
        onDetailDistrictAsync();
    }, []);

    const onBack = () => {
        navigate(ROUTE_PATH.DISTRICT)
    };

    const onUpdateDistrict = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.updateDistrict({
                id: parseInt(param.id),
                tenQuanHuyen: dataDistrict.tenQuanHuyen,
                status: dataDistrict.status,
            },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    return (
        <MainLayout breadcrumb={"Quản lý TP/Huyện"} title={"Thông tin chi tiết"} redirect={ROUTE_PATH.DISTRICT}>
            <div className='main-page h-100 flex-1 auto bg-white px-4 py-8'>
                <div className='bg-white'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Chỉnh sửa thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Tên TP/Huyện"}
                                        attribute={"tenQuanHuyen"}
                                        isRequired={true}
                                        dataAttribute={dataDistrict.tenQuanHuyen}
                                        setData={setDataDistrict}
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
            </div>
            <div className='container-btn main-page bg-white p-4 flex flex-col '>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onBack} classColor="blue">Quay lại</ButtonCommon>
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onDetailDistrictAsync} classColor="orange">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
