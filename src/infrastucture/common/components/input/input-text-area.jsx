/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Col, Input, Row } from 'antd';
import { validateFields } from '../../../utils/helper';
import { MessageError } from '../controls/MessageError';
import '../../../../assets/css/common/input.css'
import { validateEmail, validatePhoneNumber } from '../../../utils/validate';
const { TextArea } = Input
const InputTextAreaCommon = (props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        disabled = false,
        size,
        validate,
        setValidate,
        submittedTime
    } = props;
    const [value, setValue] = useState("");

    const onChange = (e) => {
        setValue(e.target.value || "");
        setData({
            [attribute]: e.target.value || ''
        });
    };
    let labelLower = label?.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        let checkValidate
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
        }

        if (attribute.includes("email")) {
            checkValidate = validateEmail(value);
            validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? `Vui lòng nhập đúng định dạng ${labelLower}` : "");
        }
        if (attribute.includes("sdt")) {
            checkValidate = validatePhoneNumber(value);
            validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? `Vui lòng nhập đúng định dạng ${labelLower}` : "");
        }

    };

    useEffect(() => {
        setValue(dataAttribute || '');

    }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);
    return (
        <div>
            <div className='mb-4 input-common'>
                <div className='title mb-2'>
                    <span>
                        <span className='label'>{label}</span>
                        <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                    </span>
                </div>
                <div>
                    <div>
                        <TextArea
                            size={size ? size : "middle"}
                            value={value ? value : ""}
                            onChange={onChange}
                            onBlur={() => onBlur(false)}
                            disabled={disabled}
                            placeholder={`Nhập ${label}`}
                            style={{ borderRadius: "8px !important" }}
                        />
                        <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                    </div>
                </div>
            </div>
        </div>
    )
};
export default InputTextAreaCommon;