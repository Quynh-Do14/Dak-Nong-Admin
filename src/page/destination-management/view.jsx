import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputSelectDistrictCommon from '../../infrastucture/common/components/input/select-district';
import InputNumberCommon from '../../infrastucture/common/components/input/input-number';
import UploadFileCommon from '../../infrastucture/common/components/input/upload-file';
import InputTextAreaCommon from '../../infrastucture/common/components/input/input-text-area';
import InputTimePickerCommon from '../../infrastucture/common/components/input/input-timepicker';
import InputSelectCategoryCommon from '../../infrastucture/common/components/input/select-category';
import { WarningMessage } from '../../infrastucture/common/components/toast/notificationToast';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';
import UploadMultiFile from '../../infrastucture/common/components/input/upload-multi-file';

export const ViewDestinationlManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [detailLocation, setDetailLocation] = useState({});
    const [submittedTime, setSubmittedTime] = useState();
    const [imageName, setImageName] = useState("");

    const [_data, _setData] = useState({});
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
    useEffect(() => {
        if (detailLocation) {
            setDataLocation({
                tenDiaDiem: detailLocation.tenDiaDiem,
                tenDiaDiemUS: detailLocation.tenDiaDiemUS,
                status: 1,
                diaChi: detailLocation.diaChi,
                diaChiUS: detailLocation.diaChiUS,
                moTa: detailLocation.moTa,
                moTaUS: detailLocation.moTaUS,
                chiDanDuongDi: detailLocation.chiDanDuongDi,
                chiDanDuongDiUS: detailLocation.chiDanDuongDiUS,
                viTriDiaLy: detailLocation.viTriDiaLy,
                viTriDiaLyUS: detailLocation.viTriDiaLyUS,
                giave: detailLocation.giave,
                giaveUS: detailLocation.giaveUS,
                uriVideo: detailLocation.uriVideo,
                uriBaiViet: detailLocation.uriBaiViet,
                idQuanHuyen: detailLocation.idQuanHuyen,
                idDanhMuc: detailLocation.idDanhMuc,
                idDiaDiem: detailLocation.idDiaDiem,
                soSaoTrungBinh: detailLocation.soSaoTrungBinh,
                emailLienHe: detailLocation.emailLienHe,
                sdtLienHe: detailLocation.sdtLienHe,
                gioMoCua: detailLocation.gioMoCua,
                gioDongCua: detailLocation.gioDongCua,
                thoiGianGhe: detailLocation.thoiGianGhe,
                luotXem: detailLocation.luotXem,
                lat: detailLocation.lat,
                long: detailLocation.long,
                geom: detailLocation.geom,
                hinhAnh: detailLocation.hinhAnh

            });
        };
    }, [detailLocation]);

    const param = useParams();
    const onDetailLocationAsync = async () => {
        const response = await api.getLocationById({
            id: param.id,

        },
            setLoading
        )
        setDetailLocation(response.diaDiem);
    };
    useEffect(() => {
        onDetailLocationAsync();
    }, []);

    const onBack = () => {
        navigate(ROUTE_PATH.DESTINATION)
    };

    const onUpdateLocation = async () => {
        var formdata = new FormData();
        await setSubmittedTime(Date.now());
        if (document.getElementById("imageUpload").files.length > 0) {
            formdata.append(
                "hinhAnh",
                document.getElementById("imageUpload").files[0],
                document.getElementById('imageUpload').value
            )
        }
        else {
            formdata.append("hinhAnh", detailLocation.hinhAnh);
        }
        formdata.append("tenDiaDiem", dataLocation.tenDiaDiem);
        formdata.append("status", 1);
        formdata.append("diaChi", dataLocation.diaChi);
        formdata.append("uriVideo", dataLocation.uriVideo);
        formdata.append("moTa", dataLocation.moTa);
        formdata.append("uriBaiViet", dataLocation.uriBaiViet);
        formdata.append("idQuanHuyen", dataLocation.idQuanHuyen);
        formdata.append("idDanhMuc", dataLocation.idDanhMuc);
        formdata.append("idDiaDiem", dataLocation.idDiaDiem);
        formdata.append("soSaoTrungBinh", dataLocation.soSaoTrungBinh);
        formdata.append("emailLienHe", dataLocation.emailLienHe);
        formdata.append("sdtLienHe", dataLocation.sdtLienHe);
        formdata.append("gioMoCua", dataLocation.gioMoCua);
        formdata.append("gioDongCua", dataLocation.gioDongCua);
        formdata.append("thoiGianGhe", dataLocation.thoiGianGhe);
        formdata.append("luotXem", dataLocation.luotXem);
        formdata.append("giaVe", dataLocation.giaVe)
        formdata.append("lat", 1);
        formdata.append("long", 1);
        formdata.append("geom", "POINT(-122.360 47.656)");
        if (isValidData()) {
            await api.updateLocation(
                parseInt(param.id),
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
        <MainLayout breadcrumb={"Quản lý điểm đến"} title={"Thông tin chi tiết"} redirect={ROUTE_PATH.DESTINATION}>
            <div className='main-page h-100 flex-1 auto bg-white px-4 py-8'>
                <div className='bg-white'>
                    <Row>
                        <Col xs={24} sm={24} md={10} lg={7} xl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Chỉnh sửa ảnh</div>
                            <UploadFileCommon
                                label={''}
                                dataAttribute={dataLocation.hinhAnh}
                            // handleUpload={handleUpload}
                            />
                            {/* <div className='aaaaa'>Thêm thông tin mới</div> */}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={17} xl={19} className='border-add'>
                            <div className='legend-title'>Chỉnh sửa thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên điểm đến"}
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
                                        label={"Tên điểm đến (Tiếng anh)"}
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
                                    <InputTextCommon
                                        label={"URL Video"}
                                        attribute={"uriVideo"}
                                        isRequired={false}
                                        dataAttribute={dataLocation.uriVideo}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"URL bài viết"}
                                        attribute={"uriBaiViet"}
                                        isRequired={false}
                                        dataAttribute={dataLocation.uriBaiViet}
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
                                    <InputSelectCategoryCommon
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
                                        attribute={"giave"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.giave}
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
                                        attribute={"giaveUS"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.giaveUS}
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

                                <Col span={24}>
                                    <InputTextAreaCommon
                                        label={"Vị trí địa lý"}
                                        attribute={"viTriDiaLy"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.viTriDiaLy}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputTextAreaCommon
                                        label={"Vị trí địa lý (Tiếng anh)"}
                                        attribute={"viTriDiaLyUS"}
                                        isRequired={true}
                                        dataAttribute={dataLocation.viTriDiaLyUS}
                                        setData={setDataLocation}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <UploadMultiFile />
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
                        <ButtonCommon onClick={onUpdateLocation} classColor="orange">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
