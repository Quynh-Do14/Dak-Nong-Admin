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
import InputSelectCategoryVehicleCommon from '../../infrastucture/common/components/input/select-category-vehicle';

export const ViewVehiclelManagement = () => {
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
                giaVe: detailLocation.giaVe,
                giaVeUS: detailLocation.giaVeUS,
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
        navigate(ROUTE_PATH.VEHICLE)
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
        // if (document.getElementById("videoUpload").files.length > 0) {
        //     formdata.append(
        //         "uriVideo",
        //         document.getElementById("videoUpload").files[0],
        //         document.getElementById('videoUpload').value
        //     );
        // }
        // else {
        //     formdata.append("uriVideo", detailLocation.uriVideo);
        // }
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
        <MainLayout breadcrumb={"Quản lý điểm đến"} title={"Thông tin chi tiết"} redirect={ROUTE_PATH.VEHICLE}>
            <div className='main-page h-100 flex-1 auto bg-white px-4 py-8'>
                <div className='bg-white'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Chỉnh sửa ảnh</div>
                            <UploadFileCommon
                                id={"imageUpload"}
                                dataAttribute={dataLocation.hinhAnh}
                            // handleUpload={handleUpload}
                            />
                            {/* <div className='aaaaa'>Thêm thông tin mới</div> */}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={19} className='border-add'>
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
                                        label={"TP/Huyện"}
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
                        <ButtonCommon onClick={onUpdateLocation} classColor="orange">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
