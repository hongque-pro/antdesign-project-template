import { PageLoading } from "@ant-design/pro-layout";
import { configureStore, MobxContext } from "./models/global";
import { ComponentProperties } from "./types/react";
import { useStoreState } from "./utils/hooks";


const globalStore = configureStore();

interface RootProps extends ComponentProperties {

}

function RootFC(props: RootProps) {

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