import { Route } from "@ant-design/pro-layout/es/typings";

const { UMI_ENV } = process.env;

const Constants = {
    isDev: UMI_ENV === "dev",
    clientId: "",
    clientSecret: "",
    project: {
        icp: "滇ICP备2020008914号-1",
        name: '百岁通智慧康养平台',
        slogan: "一站式社区养老解决方案",
        shortName: '百岁通',
        company: "昆明红雀科技有限公司"
    },
    routes: [] as Route[],
};

export default Constants;
