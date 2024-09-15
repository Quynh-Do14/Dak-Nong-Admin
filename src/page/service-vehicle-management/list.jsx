import { Button, Col, Dropdown, Image, Input, Menu, Row, Select, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../infrastucture/api';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import Constants from '../../core/common/constant';
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import DialogConfirmCommon from '../../infrastucture/common/components/modal/dialogConfirm';
import { useRecoilValue } from 'recoil';
import { CategoryState } from '../../core/common/atoms/category/categoryState';
import { DistrictState } from '../../core/common/atoms/district/districtState';
import { convertTimeOnly, showImageCommon } from '../../infrastucture/utils/helper';
import { PaginationCommon } from '../../infrastucture/common/components/pagination/Pagination';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';
import { InputSearchCommon } from '../../infrastucture/common/components/input/input-text-search';
import { TitleTableCommon } from '../../infrastucture/common/components/text/title-table-common';
import { ActionCommon } from '../../infrastucture/common/components/action/action-common';
import { RateCommon } from '../../infrastucture/common/components/rate/rate-common';
import { CategoryVehicleState } from '../../core/common/atoms/category/categoryVehicleState';

let timeout
export const ListVehicleManagement = () => {
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(Constants.PaginationConfigs.Size);
    const [page, setPage] = useState(1);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [idSelected, setIdSelected] = useState(null);
    const [pagination, setPagination] = useState({});
    const [totalItem, setTotalItem] = useState();

    const dataCategoryVehicle = useRecoilValue(CategoryVehicleState);
    const dataDistrict = useRecoilValue(DistrictState);

    const [districtId, setDictrictId] = useState();
    const [categoryId, setCategoryId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        setDictrictId(dataDistrict[0]?.idQuanHuyen);
        setCategoryId(dataCategoryVehicle[0]?.idDanhMucDiaDiem);
    }, [dataDistrict, dataCategoryVehicle])
    const checkCondition = () => {
        return dataDistrict && dataCategoryVehicle ? true : false
    }
    const onGetListLocationAsync = async ({ keyWord = "", limit = pageSize, page = 1, idQuanHuyen = 1, idDanhMuc = 7 }) => {
        const condition = await checkCondition()
        if (condition) {
            const response = await api.getAllLocation(
                `${Constants.Params.search}=${keyWord.trim()}&${Constants.Params.limit}=${limit}&${Constants.Params.page}=${page}&${Constants.Params.idQuanHuyen}=${idQuanHuyen}&${Constants.Params.idDanhMuc}=${idDanhMuc}`,
                setLoading
            )
            setData(response.data.diaDiems);
            setPagination(response.data.pagination);
            setTotalItem(response.data.totalItems);
        }
    }
    const onSearch = async (keyWord = "", limit = pageSize, page = 1, idQuanHuyen = dataDistrict[0]?.idQuanHuyen, idDanhMuc = dataCategoryVehicle[0]?.idDanhMucDiaDiem) => {
        await onGetListLocationAsync({ keyWord: keyWord, limit: limit, page: page, idQuanHuyen: idQuanHuyen, idDanhMuc: idDanhMuc });
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, []);

    const onChangeSearchText = (e) => {
        setSearchText(e.target.value);
        setPage(1);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, 1, districtId, categoryId).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };
    const onChangePage = async (value) => {
        setPage(value);
        await onSearch(searchText, pageSize, value, districtId, categoryId).then((_) => { });
    };

    const onPageSizeChanged = async (value) => {
        setPageSize(value);
        setSearchText("");
        setPage(1);
        await onSearch(searchText, value, page, districtId, categoryId).then((_) => { });
    };

    const onOpenModalDelete = (id) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    };
    const onDeleteLocation = async () => {
        await api.deleteLocation({
            id: idSelected
        },
            onSearch,
            setLoading
        )
        setIsDeleteModal(false);
    };
    const onChangeQuanHuyen = (value) => {
        setDictrictId(value);
        setPage(1);
        onSearch(searchText, pageSize, 1, value, categoryId).then((_) => { });
    };
    const onChangeDanhMuc = (value) => {
        setCategoryId(value);
        setPage(1);
        onSearch(searchText, pageSize, 1, districtId, value).then((_) => { });
    };
    const onNavigate = (id) => {
        navigate(`${(ROUTE_PATH.VIEW_VEHICLE).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    const listAction = (record) => {
        return (
            <Menu>
                <Menu.Item className='title-action' onClick={() => onNavigate(record.idDiaDiem)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Sửa</div>
                </Menu.Item>
                <Menu.Item className='title-action' onClick={() => onOpenModalDelete(record.idDiaDiem)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Xóa</div>
                </Menu.Item>
            </Menu>
        )
    };
    return (
        <MainLayout breadcrumb={"Quản lý phương tiện di chuyển"} title={"Danh sách phương tiện di chuyển"} redirect={""}>
            <div className='flex flex-col header-page'>
                <Row className='filter-page mb-2 py-2-5' gutter={[10, 10]} justify={"space-between"} align={"middle"}>
                    <Col xs={24} sm={24} lg={16}>
                        <Row align={"middle"} gutter={[10, 10]}>
                            <Col xs={24} sm={12} lg={8}>
                                <InputSearchCommon
                                    placeholder="Tìm kiếm theo tên..."
                                    value={searchText}
                                    onChange={onChangeSearchText}
                                    disabled={false}
                                />
                            </Col>
                            <Col className='select-search' xs={24} sm={12} lg={8}>
                                <Select
                                    value={districtId != null ? districtId : null}
                                    placeholder={"Chọn TP/Huyện"}
                                    className="w-100"
                                    onChange={onChangeQuanHuyen}
                                    getPopupContainer={(trigger) => trigger.parentNode}
                                >
                                    {
                                        dataDistrict && dataDistrict.length &&
                                        dataDistrict.map((item, index) => {
                                            return (
                                                <Select.Option
                                                    key={index}
                                                    value={item.idQuanHuyen}
                                                    title={item.tenQuanHuyen}
                                                >
                                                    {item.tenQuanHuyen}
                                                </Select.Option>
                                            );
                                        })
                                    }
                                </Select>
                            </Col>
                            <Col className='select-search' xs={24} sm={12} lg={8}>
                                <Select
                                    value={categoryId != null ? categoryId : null}
                                    placeholder={"Chọn danh mục"}
                                    className="w-100"
                                    onChange={onChangeDanhMuc}
                                    disabled={false}
                                    getPopupContainer={(trigger) => trigger.parentNode}
                                >
                                    {
                                        dataCategoryVehicle && dataCategoryVehicle.length &&
                                        dataCategoryVehicle.map((item, index) => {
                                            return (
                                                <Select.Option
                                                    key={index}
                                                    value={item.idDanhMucDiaDiem}
                                                    title={item.tenDanhMuc}
                                                >
                                                    {item.tenDanhMuc}
                                                </Select.Option>
                                            );
                                        })
                                    }
                                </Select>
                            </Col>
                        </Row>

                    </Col>
                    <Col>
                        <ButtonCommon icon={<PlusOutlined />} classColor="orange" onClick={() => navigate(ROUTE_PATH.ADD_VEHICLE)} >Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div>
            <div className='flex-1 auto bg-white content-page'>
                <Table
                    dataSource={data}
                    pagination={false}
                    className="table-common"
                >
                    <Column
                        title={"STT"}
                        dataIndex="stt"
                        key="stt"
                        width={"5%"}
                        render={(val, record, index) => (
                            <div style={{ textAlign: "center" }}>
                                {index + 1 + pageSize * (page - 1)}
                            </div>
                        )}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Hình ảnh"
                                width="100px"
                            />
                        }
                        key={"hinhAnh"}
                        dataIndex={"hinhAnh"}
                        render={(val) => {
                            return (
                                <Image
                                    src={showImageCommon(val)} alt="image" width={80} height={48}
                                />
                            )
                        }}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Tên địa điểm"
                                width="200px"
                            />
                        }
                        key={"tenDiaDiem"}
                        dataIndex={"tenDiaDiem"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Danh mục"
                                width="180px"
                            />
                        }
                        key={"tenDanhMuc"}
                        dataIndex={"tenDanhMuc"}
                        width={"200px"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Số sao trung bình"
                                width="180px"
                            />
                        }
                        key={"soSaoTrungBinh"}
                        dataIndex={"soSaoTrungBinh"}
                        render={(val, record) => {
                            return (
                                <RateCommon
                                    soSao={val}
                                    luotXem={record.luotXem}
                                />
                            )
                        }
                        }
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Địa chỉ"
                                width="300px"
                            />
                        }
                        key={"diaChi"}
                        dataIndex={"diaChi"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Giờ mở cửa"
                                width={"100px"}
                            />
                        }
                        key={"gioMoCua"}
                        dataIndex={"gioMoCua"}
                        render={(val) => (
                            <div>{(val)} </div>
                        )}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Giờ đóng cửa"
                                width={"100px"}
                            />
                        }
                        key={"gioDongCua"}
                        dataIndex={"gioDongCua"}
                        render={(val) => (
                            <div>{(val)} </div>
                        )}
                    />
                    {/* <Column
                        title={"Thời gian ghé"}
                        key={"thoiGianGhe"}
                        dataIndex={"thoiGianGhe"}
                    /> */}
                    <Column
                        title={
                            <TitleTableCommon
                                title="Thao tác"
                            />
                        }
                        width={"60px"}
                        fixed="right"
                        align='center'
                        render={(action, record) => (
                            // <Space
                            //     size="small"
                            // >
                            //     <Dropdown
                            //         trigger={["hover"]}
                            //         placement="bottomRight"
                            //         overlay={listAction(record)}
                            //     >
                            //         <MenuOutlined className="pointer" />
                            //     </Dropdown>
                            // </Space>
                            <ActionCommon
                                onClickDetail={() => onNavigate(record.idDiaDiem)}
                                onClickDelete={() => onOpenModalDelete(record.idDiaDiem)}
                            />
                        )}
                    />
                </Table>
            </div>
            <div className='flex flex-col'>
                <PaginationCommon
                    total={totalItem}
                    currentPage={page}
                    onChangePage={onChangePage}
                    pageSize={pageSize}
                    onChangeSize={onPageSizeChanged}
                    disabled={false}
                />
            </div>
            <DialogConfirmCommon
                message={"Bạn có muốn xóa phương tiện di chuyển này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa điểm đến"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteLocation}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </MainLayout>
    )
}
