import { Button, Col, Dropdown, Image, Input, Menu, Row, Space, Table, Tooltip } from 'antd';
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
import { convertDateOnly, showImageCommon } from '../../infrastucture/utils/helper';
import { PaginationCommon } from '../../infrastucture/common/components/pagination/Pagination';
import { InputSearchCommon } from '../../infrastucture/common/components/input/input-text-search';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';
import { TitleTableCommon } from '../../infrastucture/common/components/text/title-table-common';
import { RateCommon } from '../../infrastucture/common/components/rate/rate-common';

let timeout
export const ListEvaluateManagement = () => {
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(Constants.PaginationConfigs.Size);
    const [page, setPage] = useState(1);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [idSelected, setIdSelected] = useState(null);
    const [pagination, setPagination] = useState({});
    const [totalItem, setTotalItem] = useState();

    const navigate = useNavigate();

    const onGetListNewsAsync = async ({ keyWord = "", limit = pageSize, page = 1 }) => {
        const response = await api.getAllEvaluate(
            `${Constants.Params.search}=${keyWord.trim()}&${Constants.Params.limit}=${limit}&${Constants.Params.page}=${page}`,
            setLoading
        )
        setData(response.data.danhGias);
        setPagination(response.data.pagination);
        setTotalItem(response.data.totalItems);
    }
    const onSearch = async (keyWord = "", limit = pageSize, page = 1) => {
        await onGetListNewsAsync({ keyWord: keyWord, limit: limit, page: page });
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, []);

    const onChangeSearchText = (e) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, page).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };
    const onChangePage = async (value) => {
        setPage(value);
        await onSearch(searchText, pageSize, value).then((_) => { });
    };

    const onPageSizeChanged = async (value) => {
        setPageSize(value);
        setSearchText("");
        setPage(1);
        await onSearch(searchText, value, page).then((_) => { });
    };
    const onOpenModalDelete = (id) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    };
    const onDeleteNews = async () => {
        await api.deleteEvaluate({
            id: idSelected
        },
            onSearch,
            setLoading
        )
        setIsDeleteModal(false);
    };

    const onNavigate = (id) => {
        navigate(`${(ROUTE_PATH.VIEW_EVALUATE).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    const listAction = (record) => {
        return (
            <Menu>
                {/* <Menu.Item className='title-action' onClick={() => onNavigate(record.idDanhGia)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Sửa</div>
                </Menu.Item> */}
                <Menu.Item className='title-action' onClick={() => onOpenModalDelete(record.idDanhGia)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Xóa</div>
                </Menu.Item>
            </Menu>
        )
    };
    return (
        <MainLayout breadcrumb={"Quản lý đánh giá"} title={"Danh sách đánh giá"} redirect={""}>
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
                        </Row>

                    </Col>
                    <Col>
                        <ButtonCommon icon={<PlusOutlined />} classColor="orange" onClick={() => navigate(ROUTE_PATH.ADD_NEWS)} >Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div>
            <div className='flex-1 auto bg-white content-page'>
                <Table
                    dataSource={data}
                    pagination={false}
                    className='table-common'
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
                                title="Người dùng"
                                width={"100px"}
                            />
                        }
                        key={"userName"}
                        dataIndex={"userName"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Nội dung"
                                width={"300px"}
                            />
                        }
                        key={"noiDung"}
                        dataIndex={"noiDung"}
                        render={(val) => (
                            <div className='text-truncate'>{val} </div>
                        )}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Ngày đăng"
                                width={"100px"}
                            />
                        }
                        key={"thoiGianDanhGia"}
                        dataIndex={"thoiGianDanhGia"}
                        render={(val) => (
                            <div>{convertDateOnly(val)} </div>
                        )}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Số sao trung bình"
                                width="180px"
                            />
                        }
                        key={"soSao"}
                        dataIndex={"soSao"}
                        render={(val, record) => {
                            return (
                                <RateCommon
                                    soSao={val}
                                    luotXem={""}
                                />
                            )
                        }
                        }
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Thao tác"
                                width={"60px"}
                            />
                        }
                        fixed="right"
                        align='center'
                        render={(action, record) => (
                            <ActionCommon
                                onClickDetail={() => onNavigate(record.idDanhGia)}
                                onClickDelete={() => onOpenModalDelete(record.idDanhGia)}
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
                message={"Bạn có muốn xóa đánh giá này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa đánh giá"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteNews}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </MainLayout >

    )
}
export const ActionCommon = (props) => {
    const { onClickDetail, onClickDelete } = props;
    return (
        <div className='action-common flex justify-between white-space-nowrap'>
            <Tooltip className="custom-tooltip" color={'#fff'} overlayInnerStyle={{ color: "#475f7b" }} title={"Xem"}>
                <div onClick={onClickDetail} className='option p-1 pointer'>
                    <div className='option-select'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="1em" width="1em" class="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div>
                </div>
            </Tooltip>
            <Tooltip color={'#fff'} overlayInnerStyle={{ color: "#666666" }} title={"Xóa"}>
                <div onClick={onClickDelete} className='option p-1 pointer'>
                    <div className='option-select'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                        </svg>
                    </div>
                </div>
            </Tooltip>
        </div>
    )
}
