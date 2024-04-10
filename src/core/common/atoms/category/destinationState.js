import { atom } from "recoil";

export const DestinaionState = atom({
    key: 'DESTINATION_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        isLoading: false,
        uri: ''
    }, // default value (aka initial value)
});