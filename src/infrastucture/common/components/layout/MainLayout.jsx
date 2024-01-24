import { Layout, Menu, Row, Col, Dropdown, Space } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import "../../../../assets/css/MainLayout.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../../core/common/appRouter';
import { FullPageLoading } from '../controls/loading';
import DialogConfirmCommon from '../modal/dialogConfirm';
import avatar from "../../../../assets/images/avatar.png"
import profile from "../../../../assets/images/profile.png";
import logo from "../../../../assets/images/logo.png"
import logoutIcon from "../../../../assets/images/logout-icon.png"
import Constants from '../../../../core/common/constant';
import api from '../../../api';
import { useRecoilState } from 'recoil';
import { CategoryState } from '../../../../core/common/atoms/category/categoryState';
import { DistrictState } from '../../../../core/common/atoms/district/districtState';
import { BreadcrumbCommon } from './Breabcumb';
const { Header, Content, Sider } = Layout;


export const MainLayout = ({ ...props }) => {
  const { pageName, title, breadcrumb, redirect } = props
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenModalLogout, setIsOpenModalLogout] = useState(false);

  const [dataCategory, setDataCategory] = useRecoilState(CategoryState);
  const [dataDistrict, setDataDistrict] = useRecoilState(DistrictState);

  const navigate = useNavigate();
  const location = useLocation();
  const onLogout = () => {
    sessionStorage.clear();
    navigate(ROUTE_PATH.LOGIN);
  }
  const openModalLogout = () => {
    setIsOpenModalLogout(true);
  };

  const closeModalLogout = () => {
    setIsOpenModalLogout(false);
  };

  const onGetListCategoryAsync = async () => {
    const response = await api.getDanhMucConCuaDanhMuc(
      `idDanhMuc=${1}`,
      () => { }
    )
    if (response.result?.length > 0) {
      setDataCategory(response.result);
    }
  };

  useEffect(() => {
    onGetListCategoryAsync();
  }, [])

  const onGetListDistrictAsync = async () => {
    const response = await api.getAllDistrict(
      "",
      () => { }
    )
    if (response.data.quanHuyens?.length > 0) {
      setDataDistrict(response.data.quanHuyens);
    }
  };

  useEffect(() => {
    onGetListDistrictAsync();
  }, []);

  const listAction = () => {
    return (
      <Menu className='action-admin'>
        <Menu.Item className='info-admin'>
          <div className='info-admin-title px-1 py-2-5 flex align-center hover-blue'>
            <svg className='mr-1-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="5" r="4" />
              <path d="M12 9a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z" />
            </svg>

            Thông tin cá nhân
          </div>
        </Menu.Item>
        <Menu.Item className='info-admin' onClick={openModalLogout} >
          <div className='info-admin-title px-1 py-2-5 flex align-center hover-red'>
            <svg className='mr-1-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Đăng xuất
          </div>
        </Menu.Item>
      </Menu>
    )
  };

  return (
    <div className="main-layout">
      <Layout>
        <Row className='header pl-16 pr-16' justify={"space-between"} align={"middle"}>
          <Col className='flex align-center'>
            <img src={logo} alt='' height={60} />
          </Col>
          <Col>
            <Row align={"middle"} >
              <Col className='mr-2 flex flex-col align-end'>
                <div className='user-name'>
                  {sessionStorage.getItem("firstName")} {sessionStorage.getItem("lastName")}
                </div>
                <div className='role'>
                  {sessionStorage.getItem("role")}
                </div>
              </Col>
              <Col>
                <Dropdown overlay={listAction} trigger={['click']}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <img className='avatar pointer' width={50} height={50} src={profile} alt='' />
                    </Space>
                  </a>
                </Dropdown>
              </Col>
              {/* <div onClick={openModalLogout} align={"middle"} className='logout pointer ml-4 p-2-5 flex align-center'>
                <img src={logoutIcon} alt='' />
                <div className='ml-1'>Đăng xuất</div>
              </div> */}
            </Row>
          </Col>
        </Row>
        <Layout>
          <Sider className='sider' trigger={null} collapsible collapsed={collapsed}>
            <Menu className='menu'>
              {Constants.Menu.List.map((it, index) => {
                return (
                  <Menu.Item className={`${location.pathname.includes(it.link) ? "menu-title active" : "menu-title"}`} key={index} icon={it.icon}>
                    <Link to={it.link}>
                      {it.label}
                    </Link>
                  </Menu.Item>
                )
              })}
            </Menu>
            <div className='btn-collap flex align-center justify-center pointer'
              onClick={() => setCollapsed(!collapsed)}
            > {collapsed ?
              <DoubleRightOutlined />
              :
              <DoubleLeftOutlined />
              }
            </div>
          </Sider>
          <Layout className='bg-white'>
            <div className='flex flex-col px-6 py-2'>
              <BreadcrumbCommon
                pageName={pageName}
                breadcrumb={breadcrumb}
                title={title}
                redirect={redirect}
              />
            </div>
            <Content className='content flex flex-col mx-6 mb-2 bg-white'>
              {props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <DialogConfirmCommon
        message={"Bạn có muốn đăng xuất khỏi hệ thống"}
        titleCancel={"Bỏ qua"}
        titleOk={"Đăng xuất"}
        visible={isOpenModalLogout}
        handleCancel={closeModalLogout}
        handleOk={onLogout}
        title={"Xác nhận"}
      />
      <FullPageLoading isLoading={loading} />
    </div >
  )
}
