import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputTextAreaCommon from '../../infrastucture/common/components/input/input-text-area';
import InputNumberCommon from '../../infrastucture/common/components/input/input-number';
import InputTimePickerCommon from '../../infrastucture/common/components/input/input-timepicker';
import UploadFileCommon from '../../infrastucture/common/components/input/upload-file';
import InputSelectDistrictCommon from '../../infrastucture/common/components/input/select-district';
import { WarningMessage } from '../../infrastucture/common/components/toast/notificationToast';
import Constants from '../../core/common/constant';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';
import { TitleTableCommon } from '../../infrastucture/common/components/text/title-table-common';
import UploadMultiFile from '../../infrastucture/common/components/input/upload-multi-file';
import InputSelectCategoryCommon from '../../infrastucture/common/components/input/select-category';
import InputSelectCategoryVehicleCommon from '../../infrastucture/common/components/input/select-category-vehicle';

export const AddVehicleManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [_data, _setData] = useState({});
    const [listImgUpload, setListImgUpload] = useState([])
    const dataLocation = _data;

    const setDataLocation = (data) => {
        Object.assign(dataLocation, { ...data });
        _setData({ ...dataLocation });
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
        navigate(ROUTE_PATH.VEHICLE)
    };

    const onUploadImg = async () => {
        await api.upload(
            listImgUpload,
        )
    }
    const onCreateLocation = async () => {
        var formdata = new FormData();
        await setSubmittedTime(Date.now());
        if (document.getElementById("imageUpload").files.length > 0) {
            formdata.append(
                "hinhAnh",
                document.getElementById("imageUpload").files[0],
                document.getElementById('imageUpload').value
            );
        };
        // if (document.getElementById("videoUpload").files.length > 0) {
        //     formdata.append(
        //         "uriVideo",
        //         document.getElementById("videoUpload").files[0],
        //         document.getElementById('videoUpload').value
        //     );
        // };
        formdata.append("tenDiaDiem", dataLocation.tenDiaDiem);
        formdata.append("tenDiaDiemUS", dataLocation.tenDiaDiemUS);
        formdata.append("status", 1);
        formdata.append("diaChi", dataLocation.diaChi);
        formdata.append("diaChiUS", dataLocation.diaChiUS);
        formdata.append("moTa", dataLocation.moTa);
        formdata.append("moTaUS", dataLocation.moTaUS);
        formdata.append("viTriDiaLy", dataLocation.viTriDiaLy);
        formdata.append("viTriDiaLyUS", dataLocation.viTriDiaLyUS);
        formdata.append("chiDanDuongDi", dataLocation.chiDanDuongDi);
        formdata.append("chiDanDuongDiUS", dataLocation.chiDanDuongDiUS);
        formdata.append("moTa", dataLocation.moTa);
        formdata.append("moTaUS", dataLocation.moTaUS);
        formdata.append("idQuanHuyen", dataLocation.idQuanHuyen);
        formdata.append("idDanhMuc", dataLocation.idDanhMuc);
        formdata.append("soSaoTrungBinh", dataLocation.soSaoTrungBinh || 0);
        formdata.append("emailLienHe", dataLocation.emailLienHe);
        formdata.append("sdtLienHe", dataLocation.sdtLienHe);
        formdata.append("gioMoCua", dataLocation.gioMoCua);
        formdata.append("gioDongCua", dataLocation.gioDongCua);
        formdata.append("thoiGianGhe", dataLocation.thoiGianGhe);
        formdata.append("luotXem", dataLocation.luotXem || 0);
        formdata.append("giaVe", dataLocation.giaVe)
        formdata.append("giaVeUS", dataLocation.giaVeUS)
        formdata.append("lat", Number(dataLocation.lat));
        formdata.append("long", Number(dataLocation.long));
        // formdata.append("geom", "POINT(-122.360 47.656)");
        if (isValidData()) {
            await api.createLocation(
                formdata,
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        }
    };

    return (
        <MainLayout breadcrumb={"Quản lý phương tiện"} title={"Thêm phương tiện"} redirect={ROUTE_PATH.VEHICLE}>
            <div className='main-page h-100 flex-1 auto bg-white px-4 py-8'>
                <div className='bg-white'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Thêm mới ảnh</div>
                            <UploadFileCommon
                                id={"imageUpload"}
                                label={''}
                                dataAttribute={dataLocation.hinhAnh}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={19} className='border-add'>
                            <div className='legend-title'>Thêm thông tin mới</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên phương tiện"}
                                        attribute={"tenDiaDiem"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.tenDiaDiem}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên phương tiện (Tiếng anh)"}
                                        attribute={"tenDiaDiemUS"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.tenDiaDiemUS}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Địa chỉ"}
                                        attribute={"diaChi"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.diaChi}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Địa chỉ (Tiếng anh)"}
                                        attribute={"diaChiUS"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.diaChiUS}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectDistrictCommon
                                        label={"Quận huyện"}
                                        attribute={"idQuanHuyen"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.idQuanHuyen}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}

                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectCategoryVehicleCommon
                                        label={"Danh mục"}
                                        attribute={"idDanhMuc"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.idDanhMuc}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}

                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Kinh độ"}
                                        attribute={"lat"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.lat}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Vĩ độ"}
                                        attribute={"long"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.long}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Giờ mở cửa"}
                                        attribute={"gioMoCua"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.gioMoCua}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Giờ đóng cửa"}
                                        attribute={"gioDongCua"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.gioDongCua}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Giá vé"}
                                        attribute={"giaVe"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.giaVe}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Giá vé (Tiếng anh)"}
                                        attribute={"giaVeUS"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.giaVeUS}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"SĐT liên hệ"}
                                        attribute={"sdtLienHe"}
                                        isRequired={false}
                                        dataAttribute={dataLocation.sdtLienHe}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Email liên hệ"}
                                        attribute={"emailLienHe"}
                                        isRequired={false}
                                        dataAttribute={dataLocation.emailLienHe}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputTextAreaCommon
                                        label={"Chỉ dẫn đường đi"}
                                        attribute={"chiDanDuongDi"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.chiDanDuongDi}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputTextAreaCommon
                                        label={"Chỉ dẫn đường đi (Tiếng anh)"}
                                        attribute={"chiDanDuongDiUS"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.chiDanDuongDiUS}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>

                                <Col span={24}>
                                    <InputTextAreaCommon
                                        label={"Mô tả"}
                                        attribute={"moTa"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.moTa}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputTextAreaCommon
                                        label={"Mô tả (Tiếng anh)"}
                                        attribute={"moTaUS"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.moTaUS}
                                        setData={setDataLocation}
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
                        <ButtonCommon onClick={onCreateLocation} classColor="orange">Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
