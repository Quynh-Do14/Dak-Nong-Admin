import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputDateCommon from '../../infrastucture/common/components/input/input-date';
import InputTextAreaCommon from '../../infrastucture/common/components/input/input-text-area';
import { WarningMessage } from '../../infrastucture/common/components/toast/notificationToast';
import UploadFileCommon from '../../infrastucture/common/components/input/upload-file';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';

export const ViewNewsManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [detailNews, setDetailNews] = useState({});
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataNews = _data;

    const setDataNews = (data) => {
        Object.assign(dataNews, { ...data });
        _setData({ ...dataNews });
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
        if (detailNews) {
            setDataNews({
                tieuDe: detailNews.tieuDe,
                tieuDeUS: detailNews.tieuDeUS,
                tieuDeCon: detailNews.tieuDeCon,
                tieuDeConUS: detailNews.tieuDeConUS,
                moTaNgan: detailNews.moTaNgan,
                moTaNganUS: detailNews.moTaNganUS,
                chiTiet: detailNews.chiTiet,
                chiTietUS: detailNews.chiTietUS,
                firstName: detailNews.firstName,
                ngayDang: detailNews.ngayDang,
                lat: detailNews.lat,
                long: detailNews.long,
                soSaoTrungBinh: detailNews.soSaoTrungBinh,
                luotXem: detailNews.luotXem,
                diaChi: detailNews.diaChi,
                hinhAnh: detailNews.hinhAnh,
                hinhAnh2: detailNews.hinhAnh2,
                hinhAnh3: detailNews.hinhAnh3,
            });
        };
    }, [detailNews]);
    const param = useParams();
    const onDetailNewsAsync = async () => {
        const response = await api.getNewsById({
            id: param.id,

        },
            setLoading
        )
        setDetailNews(response.tinTuc);
    };
    useEffect(() => {
        onDetailNewsAsync();
    }, []);

    const onBack = () => {
        navigate(ROUTE_PATH.NEWS)
    };

    const onUpdateNews = async () => {
        var formdata = new FormData();
        await setSubmittedTime(Date.now());
        if (document.getElementById("imageUpload").files.length > 0) {
            formdata.append(
                "hinhAnh",
                document.getElementById("imageUpload").files[0],
                document.getElementById('imageUpload').value
            );
        }
        else {
            formdata.append("hinhAnh", dataNews.hinhAnh);
        }
        if (document.getElementById("imageUpload2").files.length > 0) {
            formdata.append(
                "hinhAnh2",
                document.getElementById("imageUpload2").files[0],
                document.getElementById('imageUpload2').value
            );
        }
        else {
            formdata.append("hinhAnh2", dataNews.hinhAnh);
        }
        if (document.getElementById("imageUpload3").files.length > 0) {
            formdata.append(
                "hinhAnh3",
                document.getElementById("imageUpload3").files[0],
                document.getElementById('imageUpload3').value
            );
        }
        else {
            formdata.append("hinhAnh3", dataNews.hinhAnh);
        }
        formdata.append("tieuDe", dataNews.tieuDe);
        formdata.append("tieuDeUS", dataNews.tieuDeUS);
        formdata.append("status", 1);
        formdata.append("tieuDeCon", dataNews.tieuDeCon);
        formdata.append("tieuDeConUS", dataNews.tieuDeConUS);
        formdata.append("moTaNgan", dataNews.moTaNgan);
        formdata.append("moTaNganUS", dataNews.moTaNganUS);
        formdata.append("chiTiet", dataNews.chiTiet);
        formdata.append("chiTietUS", dataNews.chiTietUS);
        formdata.append("ngayDang", dataNews.ngayDang);
        formdata.append("luotXem", dataNews.luotXem || 1);
        formdata.append("soSaoTrungBinh", dataNews.soSaoTrungBinh || 0);
        formdata.append("diaChi", dataNews.diaChi || "");
        formdata.append("userId", localStorage.getItem("id") || 1);
        formdata.append("lat", 1);
        formdata.append("log", 1);
        formdata.append("geom", "");
        if (isValidData()) {
            await api.updateNews(
                param.id,
                formdata,
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    return (
        <MainLayout breadcrumb={"Quản lý tin tức"} title={"Thông tin chi tiết"} redirect={ROUTE_PATH.NEWS}>
            <div className='main-page h-100 flex-1 auto bg-white px-4 py-8'>
                <div className='bg-white'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Thêm mới ảnh</div>
                            <Col>
                                <UploadFileCommon
                                    label={''}
                                    id={"imageUpload"}
                                    dataAttribute={dataNews.hinhAnh}
                                />
                                <UploadFileCommon
                                    label={''}
                                    id={"imageUpload2"}
                                    dataAttribute={dataNews.hinhAnh2}
                                    shape={'rectangle'}
                                />
                                <UploadFileCommon
                                    label={''}
                                    id={"imageUpload3"}
                                    dataAttribute={dataNews.hinhAnh3}
                                    shape={'rectangle'}
                                />
                            </Col>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={19} className='border-add'>
                            <div className='legend-title'>Chỉnh sửa thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tiêu đề"}
                                        attribute={"tieuDe"}
                                        isRequired={true}
                                        dataAttribute={dataNews.tieuDe}
                                        setData={setDataNews}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tiêu đề (Tiếng anh)"}
                                        attribute={"tieuDeUS"}
                                        isRequired={true}
                                        dataAttribute={dataNews.tieuDeUS}
                                        setData={setDataNews}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>

                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextAreaCommon
                                        label={"Tiêu đề con"}
                                        attribute={"tieuDeCon"}
                                        isRequired={true}
                                        dataAttribute={dataNews.tieuDeCon}
                                        setData={setDataNews}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextAreaCommon
                                        label={"Tiêu đề con (Tiếng anh)"}
                                        attribute={"tieuDeConUS"}
                                        isRequired={true}
                                        dataAttribute={dataNews.tieuDeConUS}
                                        setData={setDataNews}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputTextAreaCommon
                                        label={"Mô tả ngắn"}
                                        attribute={"moTaNgan"}
                                        isRequired={true}
                                        dataAttribute={dataNews.moTaNgan}
                                        setData={setDataNews}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputTextAreaCommon
                                        label={"Mô tả ngắn (Tiếng anh)"}
                                        attribute={"moTaNganUS"}
                                        isRequired={true}
                                        dataAttribute={dataNews.moTaNganUS}
                                        setData={setDataNews}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>

                                <Col span={24}>
                                    <InputTextAreaCommon
                                        label={"Chi tiết"}
                                        attribute={"chiTiet"}
                                        isRequired={true}
                                        dataAttribute={dataNews.chiTiet}
                                        setData={setDataNews}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputTextAreaCommon
                                        label={"Chi tiết (Tiếng anh)"}
                                        attribute={"chiTietUS"}
                                        isRequired={true}
                                        dataAttribute={dataNews.chiTietUS}
                                        setData={setDataNews}
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
                        <ButtonCommon onClick={onUpdateNews} classColor="orange">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
