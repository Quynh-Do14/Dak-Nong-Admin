const PREFIX = "";

export const ROUTE_PATH = {
    LOGIN: `${PREFIX}/login`,
    REGISTER: `${PREFIX}/register`,

    USER: `${PREFIX}/user`,
    VIEW_USER: `${PREFIX}/user/view/:id`,
    ADD_USER: `${PREFIX}/user/add`,

    CATEGORY_LAYOUT_MAP: `${PREFIX}/category-layout-map`,
    VIEW_CATEGORY_LAYOUT_MAP: `${PREFIX}/category-layout-map/view/:id`,
    ADD_CATEGORY_LAYOUT_MAP: `${PREFIX}/category-layout-map/add`,

    CATEGORY_NEWS: `${PREFIX}/category_news`,
    VIEW_CATEGORY_NEWS: `${PREFIX}/category_news/view/:id`,
    ADD_CATEGORY_NEWS: `${PREFIX}/category_news/add`,

    CATEGORY_VEHICLE: `${PREFIX}/vehicle`,
    VIEW_CATEGORY_VEHICLE: `${PREFIX}/vehicle/view/:id`,
    ADD_CATEGORY_VEHICLE: `${PREFIX}/vehicle/add`,

    CATEGORY: `${PREFIX}/category`,
    VIEW_CATEGORY: `${PREFIX}/category/view/:id`,
    ADD_CATEGORY: `${PREFIX}/category/add`,


    DESTINATION: `${PREFIX}/destination`,
    VIEW_DESTINATION: `${PREFIX}/destination/view/:id`,
    ADD_DESTINATION: `${PREFIX}/destination/add`,

    SPECIALTY: `${PREFIX}/specialty`,
    VIEW_SPECIALTY: `${PREFIX}/specialty/view/:id`,
    ADD_SPECIALTY: `${PREFIX}/specialty/add`,

    FESTIVAL: `${PREFIX}/festival`,
    VIEW_FESTIVAL: `${PREFIX}/festival/view/:id`,
    ADD_FESTIVAL: `${PREFIX}/festival/add`,

    NEWS: `${PREFIX}/news`,
    VIEW_NEWS: `${PREFIX}/news/view/:id`,
    ADD_NEWS: `${PREFIX}/news/add`,

    RESTAURANT: `${PREFIX}/restaurant`,
    VIEW_RESTAURANT: `${PREFIX}/restaurant/view/:id`,
    ADD_RESTAURANT: `${PREFIX}/restaurant/add`,

    HOTEL: `${PREFIX}/hotel`,
    VIEW_HOTEL: `${PREFIX}/hotel/view/:id`,
    ADD_HOTEL: `${PREFIX}/hotel/add`,

    TOUR: `${PREFIX}/tour`,
    VIEW_TOUR: `${PREFIX}/tour/view/:id`,
    ADD_TOUR: `${PREFIX}/tour/add`,

    EVALUATE: `${PREFIX}/evaluate`,
    VIEW_EVALUATE: `${PREFIX}/evaluate/view/:id`,
    ADD_EVALUATE: `${PREFIX}/evaluate/add`,

    VEHICLE: `${PREFIX}/serviceVehicle`,
    VIEW_VEHICLE: `${PREFIX}/serviceVehicle/view/:id`,
    ADD_VEHICLE: `${PREFIX}/serviceVehicle/add`,

    DISTRICT: `${PREFIX}/district`,
    VIEW_DISTRICT: `${PREFIX}/district/view/:id`,
    ADD_DISTRICT: `${PREFIX}/district/add`,

    SCHEDULE: `${PREFIX}/schedule`,
    VIEW_SCHEDULE: `${PREFIX}/schedule/view/:id`,
    ADD_SCHEDULE: `${PREFIX}/schedule/add`,
    MAINLAYOUT: `${PREFIX}/`,
};
export class Endpoint {
    static Auth = class {
        // static Login = "/auth/login";
        static Login = "/auth/login/admin"
    }

    static Module = class {
        static Tour = "/tour";
        static User = "/user";
        static Category = "/danhmuc";
        static CategoryByParentId = "/danhmuc/parentId";
        static Location = "/diadiem";
        static News = "/tintuc";
        static Evaluate = "/danhgia";
        static District = "/quanhuyen";
        static Upload = "/files/upload";
        static MultiUpload = "/files/upload-multi";
        static Files = "/files/hinh-anh"
        static Schedule = "/lichtrinh"
    }
};