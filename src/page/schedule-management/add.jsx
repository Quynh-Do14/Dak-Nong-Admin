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
import InputSelectDestinationCommon from '../../infrastucture/common/components/input/select-destination';
import { apiAxios } from '../../infrastucture/api/api';

export const AddScheduleManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();

    const [geom, setGeom] = useState({})
    const [_data, _setData] = useState({});
    const dataSchedule = _data;

    const setDataSchedule = (data) => {
        Object.assign(dataSchedule, { ...data });
        _setData({ ...dataSchedule });
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
        navigate(ROUTE_PATH.SCHEDULE)
    };

    const catchGeom = async () => {
        if (dataSchedule.start && dataSchedule.end) {
            const start = JSON.parse(dataSchedule?.start);
            const end = JSON.parse(dataSchedule?.end);
            const data = await apiAxios.get(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start.long},${start.lat};${end.long},${end.lat}.json?geometries=geojson&steps=true&overview=full&language=en&access_token=pk.eyJ1IjoibnRkMTAxMDIwMDAiLCJhIjoiY2tvbzJ4anl1MDZjMzJwbzNpcnA5NXZpcCJ9.dePfFDv0RlCLnWoDq1zHlw`)
            setGeom(data.routes[0].geometry)
        }
    }
    useEffect(() => {
        if (dataSchedule.start && dataSchedule.end) {
            catchGeom()
        }
    }, [dataSchedule])
    // console.log("geom", geom);
    const onCreateSchedule = async () => {
        const danhSachDiaDiem = [
            JSON.parse(dataSchedule.start),
            JSON.parse(dataSchedule.end),
        ]
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.createSchedule({
                ten: dataSchedule.ten,
                tenUS: dataSchedule.tenUS,
                thoiGian: dataSchedule.thoiGian,
                thoiGianUS: dataSchedule.thoiGianUS,
                danhSachDiaDiem: JSON.stringify(danhSachDiaDiem),
                geometry: JSON.stringify(geom)
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
        <MainLayout breadcrumb={"Quản lý danh mục"} title={"Thêm danh mục"} redirect={ROUTE_PATH.SCHEDULE}>
            <div className='main-page h-100 flex-1 auto bg-white px-4 py-8'>
                <div className='bg-white'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Thêm thông tin mới</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên"}
                                        attribute={"ten"}
                                        isRequired={true}
                                        dataAttribute={dataSchedule.ten}
                                        setData={setDataSchedule}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên(Tiếng anh)"}
                                        attribute={"tenUS"}
                                        isRequired={true}
                                        dataAttribute={dataSchedule.tenUS}
                                        setData={setDataSchedule}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Thời gian"}
                                        attribute={"thoiGian"}
                                        isRequired={true}
                                        dataAttribute={dataSchedule.thoiGian}
                                        setData={setDataSchedule}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Thời gian(Tiếng anh)"}
                                        attribute={"thoiGianUS"}
                                        isRequired={true}
                                        dataAttribute={dataSchedule.thoiGianUS}
                                        setData={setDataSchedule}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectDestinationCommon
                                        label={"Điểm bắt đầu"}
                                        attribute={"start"}
                                        isRequired={true}
                                        dataAttribute={dataSchedule.start}
                                        setData={setDataSchedule}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}

                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectDestinationCommon
                                        label={"Điểm kết thúc"}
                                        attribute={"end"}
                                        isRequired={true}
                                        dataAttribute={dataSchedule.end}
                                        setData={setDataSchedule}
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
                        <ButtonCommon onClick={onCreateSchedule} classColor="orange">Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout>
    )
}
