import { InboxOutlined } from '@ant-design/icons'
import Dragger from 'antd/es/upload/Dragger'
import React, { useEffect, useState } from 'react'
import api from '../../../api';
import '../../../../assets/css/common/input.css'


const UploadMultiFile = (props) => {
    const {
        label,
        dataAttribute,
        setListImgUpload
    } = props;
    const [listImage, setListImage] = useState([]);

    const onChange = (e) => {
        setListImgUpload(e.fileList);
    }
    const getAllHinhAnh = async () => {
        if (dataAttribute) {
            const response = await api.getHinhAnhByIdDiaDiem(
                `${dataAttribute}`,
                () => { }
            );
            setListImage(response.data);
        }
    };
    useEffect(() => {
        if (dataAttribute) {
            getAllHinhAnh().then((_) => { });
        }
    }, [dataAttribute]);
    return (
        <div className='mb-4 input-common'>
            <div className='title'>
                <span className='label'>{label}</span>
            </div>
            <div className='mt-3'>
                <Dragger
                    {...props}
                    onChange={onChange}
                    accept='.png, .jpg, .jpeg'
                >
                    <p className="ant-upload-drag-icon" id='multi-file'>
                        <InboxOutlined style={{ color: '#094174' }} />
                    </p>
                    <p className="ant-upload-text">
                        Nhấp hoặc kéo tệp vào khu vực này để tải lên
                    </p>
                </Dragger>
            </div>

        </div>
    )
}

export default UploadMultiFile
