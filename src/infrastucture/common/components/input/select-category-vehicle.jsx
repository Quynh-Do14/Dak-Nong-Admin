import React, { useEffect, useState } from "react";
import { Col, Row, Select } from "antd";
import { validateFields } from '../../../utils/helper';
import { MessageError } from '../controls/MessageError';
import '../../../../assets/css/common/input.css'
import { useRecoilValue } from "recoil";
import { CategoryState } from "../../../../core/common/atoms/category/categoryState";
import { CategoryVehicleState } from "../../../../core/common/atoms/category/categoryVehicleState";
const InputSelectCategoryVehicleCommon = (props) => {
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
    const dataCategory = useRecoilValue(CategoryVehicleState);
    const [value, setValue] = useState("");

    const onChange = async (val) => {
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
                                dataCategory && dataCategory.length && dataCategory.map((item, index) => {
                                    return (
                                        <Select.Option
                                            key={index}
                                            value={item.idDanhMucDiaDiem}
                                            title={item.tenDanhMuc}
                                        >
                                            {item.tenDanhMuc}
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
export default InputSelectCategoryVehicleCommon;