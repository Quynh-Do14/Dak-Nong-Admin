import moment from "moment";
import { API, PUBLIC } from "../../core/common/apiLinks";
import noAvatarProduct from "../../assets/images/no-avatar-product.png"
export const DebounceInput = (func, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

export const ConfigStatusTour = (status) => {
    switch (status) {
        case 1:
            return <div style={{ color: "rgb(46, 125, 50)" }}>Hoạt động </div>
        case 2:
            return <div style={{ color: "rgb(211, 47, 47)" }}>Đã xóa </div>
    }
}

export const validateFields = (isImplicitChange = false, key, isCheck, setError, error, message) => {
    if (isImplicitChange) {
        error[key] = {
            isError: isCheck,
            message: message,
        };
    }
    else {
        setError({
            ...error,
            [key]: {
                isError: isCheck,
                message: message,
            }
        });
    }
};

export const convertDate = (date) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY/MM/DD hh:mm:ss");
    } return null;

};
export const convertDateOnly = (date) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY/MM/DD");
    } return null;
};

export const convertTimeOnly = (date) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("hh:mm");
    } return null;
};

export const reverseConvertDate = (inputDateString) => {
    const inputDate = new Date(inputDateString);

    // Format the date as "Thu, 26 Oct 2023 13:05:32 GMT"
    const formattedDate = inputDate.toUTCString();
    return formattedDate
}

export const reverseConvertTime = (inputTime) => {
    // Combine the date and time to create a new Date object
    const dateTimeString = `2023-09-24T${inputTime}:00.000Z`;
    const formattedDateTime = new Date(dateTimeString).toISOString();

    return formattedDateTime
}

export const showImageCommon = (img) => {
    if (!!!img || img == "undefined") {
        return noAvatarProduct;
    }
    if (img?.indexOf("http") == 0) {
        return img;
    }
    else {
        return `${API}${PUBLIC}/${img}`
    }
}
export function getCurrentDate() {
    const date = new Date();
    const day = date.getDate(); // Lấy ngày (1 - 31)
    const month = date.getMonth() + 1; // Lấy tháng (0 - 11), cộng 1 vì tháng bắt đầu từ 0
    const year = date.getFullYear(); // Lấy năm (đầy đủ 4 chữ số)

    return `${day}/${month}/${year}`; // Trả về chuỗi ngày/tháng/năm
}