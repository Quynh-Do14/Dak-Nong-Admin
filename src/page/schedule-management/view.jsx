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
import InputSelectDestinationCommon from '../../infrastucture/common/components/input/select-destination';
import { apiAxios } from '../../infrastucture/api/api';

export const ViewScheduleManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [detailSchedule, setDetailSchedule] = useState({});
    const [submittedTime, setSubmittedTime] = useState();
    const [dataSelect, setDataSelect] = useState({})
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

    useEffect(() => {
        if (detailSchedule.danhSachDiaDiem) {
            // const dataSelect = JSON.parse(detailSchedule?.danhSachDiaDiem)
            // setDataSelect({
            //     start: dataSelect[0]?.tenDiaDiem,
            //     end: dataSelect[1]?.tenDiaDiem
            // })
            setDataSchedule({
                ten: detailSchedule.ten,
                tenUS: detailSchedule.tenUS,
                thoiGian: detailSchedule.thoiGian,
                thoiGianUS: detailSchedule.thoiGianUS,
                status: detailSchedule.status,
                danhSachDiaDiem: detailSchedule?.danhSachDiaDiem,

            });
        };
    }, [detailSchedule]);

    const param = useParams();
    const onDetailScheduleAsync = async () => {
        const response = await api.getScheduleById({
            id: param.id,

        },
            setLoading
        )
        setDetailSchedule(response.lichTrinh);
    };
    useEffect(() => {
        onDetailScheduleAsync();
    }, []);

    const onBack = () => {
        navigate(ROUTE_PATH.SCHEDULE)
    };

    const catchGeom = async () => {
        if (dataSchedule) {
            const start = JSON.parse(dataSchedule.start !== undefined ? dataSchedule.start : dataSelect.start);
            const end = JSON.parse(dataSchedule.end !== undefined ? dataSchedule.end : dataSelect.end);
            const data = await apiAxios.get(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start.long},${start.lat};${end.long},${end.lat}.json?geometries=geojson&steps=true&overview=full&language=en&access_token=pk.eyJ1IjoibnRkMTAxMDIwMDAiLCJhIjoiY2tvbzJ4anl1MDZjMzJwbzNpcnA5NXZpcCJ9.dePfFDv0RlCLnWoDq1zHlw`)
            setGeom(data.routes[0].geometry)
        }
    }
    useEffect(() => {
        if (dataSchedule.start && dataSchedule.end) {
            catchGeom()
        }
    }, [dataSchedule])

    const onUpdateSchedule = async () => {
        const danhSachDiaDiem = [
            JSON.parse(dataSchedule.start !== undefined ? dataSchedule.start : dataSelect.start),
            JSON.parse(dataSchedule.end !== undefined ? dataSchedule.end : dataSelect.end),
        ]
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.updateSchedule(
                param.id,
                {
                    ten: dataSchedule.ten,
                    tenUS: dataSchedule.tenUS,
                    thoiGian: dataSchedule.thoiGian,
                    thoiGianUS: dataSchedule.thoiGianUS,
                    danhSachDiaDiem: JSON.stringify(danhSachDiaDiem) || dataSchedule.danhSachDiaDiem,
                    geometry: JSON.stringify(geom) || dataSchedule.geometry
                },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        }
    };
    console.log("dataSchedule.start", dataSchedule.start);
    return (
        <MainLayout breadcrumb={"Quản lý danh mục"} title={"Xem chi tiết"} redirect={ROUTE_PATH.SCHEDULE}>
            <div className='main-page h-100 flex-1 auto bg-white px-4 py-8'>
                <div className='bg-white'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Chỉnh sửa thông tin</div>
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
                        <ButtonCommon onClick={onUpdateSchedule} classColor="orange">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout>
    )
}
