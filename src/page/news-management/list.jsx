import { Button, Col, Dropdown, Image, Input, Menu, Row, Space, Table } from 'antd';
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
import { ActionCommon } from '../../infrastucture/common/components/action/action-common';
import { TitleTableCommon } from '../../infrastucture/common/components/text/title-table-common';

let timeout
export const ListNewsManagement = () => {
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
        const response = await api.getAllNews(
            `${Constants.Params.search}=${keyWord.trim()}&${Constants.Params.limit}=${limit}&${Constants.Params.page}=${page}`,
            setLoading
        )
        setData(response.data.tinTucs);
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
        await api.deleteNews({
            id: idSelected
        },
            onSearch,
            setLoading
        )
        setIsDeleteModal(false);
    };

    const onNavigate = (id) => {
        navigate(`${(ROUTE_PATH.VIEW_NEWS).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    const listAction = (record) => {
        return (
            <Menu>
                <Menu.Item className='title-action' onClick={() => onNavigate(record.idTinTuc)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Sửa</div>
                </Menu.Item>
                <Menu.Item className='title-action' onClick={() => onOpenModalDelete(record.idTinTuc)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Xóa</div>
                </Menu.Item>
            </Menu>
        )
    };
    return (
        <MainLayout breadcrumb={"Quản lý bài viết"} title={"Danh sách bài viết"} redirect={""}>
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
                                title="Tiêu đề"
                                width={"200px"}
                            />
                        }
                        key={"tieuDe"}
                        dataIndex={"tieuDe"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Tiêu đề con"
                                width={"200px"}
                            />
                        }
                        key={"tieuDeCon"}
                        dataIndex={"tieuDe"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Ngày đăng"
                                width={"100px"}
                            />
                        }
                        key={"ngayDang"}
                        dataIndex={"ngayDang"}
                        render={(val) => (
                            <div>{convertDateOnly(val)} </div>
                        )}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Lượt xem"
                                width={"100px"}
                            />
                        }
                        key={"luotXem"}
                        dataIndex={"luotXem"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Địa chỉ"
                                width={"300px"}
                            />
                        }
                        key={"diaChi"}
                        dataIndex={"diaChi"}
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
                                onClickDetail={() => onNavigate(record.idTinTuc)}
                                onClickDelete={() => onOpenModalDelete(record.idTinTuc)}
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
                message={"Bạn có muốn xóa bài viết này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa bài viết"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteNews}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </MainLayout >

    )
}
