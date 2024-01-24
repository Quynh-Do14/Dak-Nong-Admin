/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Upload } from 'antd';
import { MessageError } from '../controls/MessageError';
import '../../../../assets/css/common/input.css'
import { API, PUBLIC } from '../../../../core/common/apiLinks';
import { UploadOutlined } from '@ant-design/icons';
import { ButtonCommon } from '../button/button-common';
import { showImageCommon } from '../../../utils/helper';
import noImgProduct from "../../../../assets/images/no-avatar-product.jpg"
import api from '../../../api';
const UploadFileCommon = (props) => {
    const {
        label,
        isRequired,
        dataAttribute,
        handleUpload
    } = props;
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(dataAttribute || '');

    }, [dataAttribute]);
    // document.getElementsByName("upload-img").addEventListener('change', (e) => {
    //     readURL(this, document.getElementByClassName("file-wrapper"));
    // });

    // document.getElementByClassName("close-btn").addEventListener('click', (e) => {
    //     let file = document.getElementsByName("upload-img");
    //     document.getElementByClassName("file-wrapper").css('background-image', 'unset');
    //     document.getElementByClassName("file-wrapper").classList.remove("file-set");
    //     file.replaceWith(file = file.clone(true));
    // });


    // function readURL(input, obj) {
    //     if (input.files && input.files[0]) {
    //         let reader = new FileReader();
    //         reader.onload = function (e) {
    //             obj.css('background-image', 'url(' + e.target.result + ')');
    //             obj.classList.add("file-set");
    //         }
    //         reader.readAsDataURL(input.files[0]);
    //     }
    // };
    // function readURL(input) {
    //     if (input.files && input.files[0]) {
    //         let reader = new FileReader();
    //         reader.onload = function (e) {
    //             document.getElementById("imagePreview").css('background-image', 'url(' + e.target.result + ')');
    //             document.getElementById("imagePreview").style.display = "none";
    //             document.getElementById("imagePreview").fadeIn(650);
    //         }
    //         reader.readAsDataURL(input.files[0]);
    //     }
    // }
    // document.getElementById("imageUpload").change(function () {
    //     readURL(this);
    // });

    return (
        <div>
            <div className='mb-4 input-common'>
                {/* <Col className='title'>
                    <span >
                        <span className='label'>{label}</span>
                        <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                    </span>
                </Col> */}
                {/* <div className="file-wrapper">
                        <input type='file'
                            // onChange={handleUpload}
                            id='file'
                            multiple
                            name="upload-img"
                            accept="image/*"
                        />
                        <div className="close-btn" id='close-btn'>×</div>
                    </div> */}
                <div className="avatar-upload">
                    <div className="avatar-edit">
                        <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
                        <label for="imageUpload"></label>
                    </div>
                    <div className="avatar-preview">
                        <div id="imagePreview" style={{ backgroundImage: `${dataAttribute ? `url(${showImageCommon(dataAttribute)})` : `url(${noImgProduct})`}` }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default UploadFileCommon;