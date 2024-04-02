import { Button, Col, Dropdown, Input, Menu, Row, Space, Table } from 'antd';
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
import { PaginationCommon } from '../../infrastucture/common/components/pagination/Pagination';
import { InputSearchCommon } from '../../infrastucture/common/components/input/input-text-search';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';
import { TitleTableCommon } from '../../infrastucture/common/components/text/title-table-common';
import { ActionCommon } from '../../infrastucture/common/components/action/action-common';

let timeout
export const ListCategoryServiceManagement = () => {
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

    const onGetListCategoryAsync = async ({ keyWord = "", limit = pageSize, page = 1 }) => {
        const response = await api.getAllCategoryByParentId(`${Constants.Params.parentId}=${Constants.CategoryConfig.Vehicle.value}&${Constants.Params.search}=${keyWord.trim()}&${Constants.Params.limit}=${limit}&${Constants.Params.page}= ${page}`,
            setLoading
        )
        setData(response.data.danhMucParentId);
        setPagination(response.data.pagination);
        setTotalItem(response.data.totalItems);
    }
    const onSearch = async (keyWord = "", limit = pageSize, page = 1) => {
        await onGetListCategoryAsync({ keyWord: keyWord, limit: limit, page: page });
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
    const onDeleteCategory = async () => {
        await api.deleteCategory({
            id: idSelected
        },
            onSearch,
            setLoading
        )
        setIsDeleteModal(false);
    };

    const onNavigate = (idDanhMucDiaDiem) => {
        navigate(`${(ROUTE_PATH.VIEW_CATEGORY_VEHICLE).replace(`${Constants.UseParams.Id}`, "")}${idDanhMucDiaDiem}`);
    }
    const listAction = (record) => {
        return (
            <Menu>
                <Menu.Item className='title-action' onClick={() => onNavigate(record.idDanhMucDiaDiem)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Sửa</div>
                </Menu.Item>
                <Menu.Item className='title-action' onClick={() => onOpenModalDelete(record.idDanhMucDiaDiem)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Xóa</div>
                </Menu.Item>
            </Menu>
        )
    };
    return (
        <MainLayout breadcrumb={"Quản lý danh mục dịch vụ du lịch"} title={"Danh sách danh mục dịch vụ du lịch"} redirect={""}>
            <div className='flex flex-col header-page'>
                <Row className='filter-page mb-2 py-2-5 mb-5' justify={"space-between"} align={"middle"}>
                    <Col xs={14} sm={14} md={10} lg={8}>
                        <InputSearchCommon
                            placeholder="Tìm kiếm theo tên..."
                            value={searchText}
                            onChange={onChangeSearchText}
                            disabled={false}
                        />
                    </Col>
                    <Col>
                        <ButtonCommon icon={<PlusOutlined />} classColor="orange" onClick={() => navigate(ROUTE_PATH.ADD_CATEGORY_VEHICLE)} >Thêm mới</ButtonCommon>
                    </Col>
                </Row>
                <div className='title-page pt-5 pb-7'>Danh sách danh mục dịch vụ du lịch</div>
            </div>
            <div className='flex-1 auto bg-white content-page'>
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
                                    title="Tên danh mục"
                                />
                            }
                            key={"tenDanhMuc"}
                            dataIndex={"tenDanhMuc"}
                        />
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
                                // <CommonPermission permission={Permissions.OrderManagement.Order.action}>
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
                                    onClickDetail={() => onNavigate(record.idDanhMucDiaDiem)}
                                    onClickDelete={() => onOpenModalDelete(record.idDanhMucDiaDiem)}
                                />
                                // </CommonPermission>
                            )}
                        />
                    </Table>
                </div>
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
                message={"Bạn có muốn xóa danh mục này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa danh mục"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteCategory}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </MainLayout>
    )
}
