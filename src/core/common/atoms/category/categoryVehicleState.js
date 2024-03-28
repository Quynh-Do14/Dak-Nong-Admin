import { atom } from "recoil";

export const CategoryVehicleState = atom({
    key: 'CATEGORY_VEHCLE_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        isLoading: false,
        uri: ''
    }, // default value (aka initial value)
});