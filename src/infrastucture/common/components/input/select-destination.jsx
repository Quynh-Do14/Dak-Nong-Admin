import React, { useEffect, useState } from "react";
import { Col, Row, Select } from "antd";
import { validateFields } from '../../../utils/helper';
import { MessageError } from '../controls/MessageError';
import '../../../../assets/css/common/input.css'
import api from "../../../api";
import Constants from "../../../../core/common/constant";
import { useRecoilValue } from "recoil";
import { DestinaionState } from "../../../../core/common/atoms/category/destinationState";
const InputSelectDestinationCommon = (props) => {
    const {
        dataAttribute,
        setData,
        attribute,
        disabled,
        setValidate,
        validate,
        submittedTime,
        isRequired,
        label
    } = props;
    const dataDestination = useRecoilValue(DestinaionState);

    const [value, setValue] = useState("");


    const onChange = async (val) => {
        console.log('val', val);
        setValue(val || "");
        setData({
            [attribute]: val
        });
    };
    let labelLower = label.toLowerCase();
    const validateBlur = (isImplicitChange = false) => {
        validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập đúng định dạng ${labelLower}` : "");
    };

    const onBlur = () => {
        validateBlur(false);
    };

    useEffect(() => {
        if (dataAttribute) {
            setValue(dataAttribute);
        }
    }, [dataAttribute]);


    useEffect(() => {
        if (submittedTime != null) {
            validateBlur(true);
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
                        <Select
                            showSearch
                            allowClear={false}
                            showArrow
                            className="w-100"
                            disabled={disabled}
                            value={value}
                            listHeight={120}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder={`Chọn ${label}`}
                            getPopupContainer={trigger => trigger.parentNode}
                        >
                            {
                                dataDestination && dataDestination.length && dataDestination.map((item, index) => {
                                    return (
                                        <Select.Option
                                            key={index}
                                            value={JSON.stringify(item)}
                                            title={item.tenDiaDiem}
                                        >
                                            {item.tenDiaDiem}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                        <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default InputSelectDestinationCommon;