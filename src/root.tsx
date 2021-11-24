import { PageLoading } from "@ant-design/pro-layout";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { useState } from "react";
import { configureStore, MobxContext } from "./models/global";
import { ComponentProperties } from "./types/react";
import { useStoreEffect, useStoreState } from "./utils/hooks";


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