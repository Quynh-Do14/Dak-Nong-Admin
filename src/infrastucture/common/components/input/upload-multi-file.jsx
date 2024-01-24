import { InboxOutlined } from '@ant-design/icons'
import Dragger from 'antd/es/upload/Dragger'
import React, { useEffect, useState } from 'react'
import api from '../../../api';

const UploadMultiFile = (props) => {
    const {
        label,
        dataAttribute,
    } = props;
    const [listImage, setListImage] = useState([]);

    const onChange = (e) => {
        console.log('e', e.fileList);
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
    console.log('listImage', listImage);

    return (
        <div>
            <Dragger
                {...props}
                onChange={onChange}
                accept='.png, .jpg, .jpeg'
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ color: '#094174' }} />
                </p>
                <p className="ant-upload-text">
                    Nhấp hoặc kéo tệp vào khu vực này để tải lên
                </p>
            </Dragger>
        </div>
    )
}

export default UploadMultiFile
