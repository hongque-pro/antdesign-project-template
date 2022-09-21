import { PageLoading } from "@ant-design/pro-layout/es/components/PageLoading";
import { configureStore, MobxContext } from "./models/global";
import { ComponentProperties } from "./types/react";
import { useStoreState } from "./utils/hooks";
import { Outlet } from '@umijs/max';


const globalStore = configureStore();

interface RootProps extends ComponentProperties {

}

function RootFC(props: RootProps) {
    console.log("root is loading");
    const [isLoading] = useStoreState(globalStore.ui, "isLoading");

    if(isLoading){
        return <PageLoading />;
    }
    return (
        <MobxContext.Provider value={globalStore}>
            {props.children}
        </MobxContext.Provider>
    );
}

const Root = RootFC;
export default Root;