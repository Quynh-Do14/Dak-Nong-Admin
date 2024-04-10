import { InboxOutlined } from '@ant-design/icons'
import Dragger from 'antd/es/upload/Dragger'
import React, { useEffect, useState } from 'react'
import api from '../../../api';
import '../../../../assets/css/common/input.css'

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const UploadMultiFile = (props) => {
    const {
        label,
        dataAttribute,
        listImgUpload,
        setListImgUpload
    } = props;
    const [listImage, setListImage] = useState([]);


    const onChange = (info) => {
        if (info.file) {
            getBase64(info.file.originFileObj, async (url) => {
                setListImage(url);
                setListImgUpload([
                    ...listImgUpload,
                    info.file.originFileObj
                ]);
            });
        }
    };

    // const onChange = async (e) => {
    //     setListImgUpload(e.fileList);

    //     const data = {
    //         idDiaDiem: "255",
    //         files: e.file
    //     }
    //     await api.upload(
    //         data,
    //         () => { }
    //     )
    // }
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
