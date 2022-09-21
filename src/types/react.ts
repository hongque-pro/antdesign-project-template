import { IRouteComponentProps } from '@umijs/types';


export interface ComponentProperties<Params extends {
    [K in keyof Params]?: string;
} = {}, Query extends {
    [K in keyof Query]?: string;
} = {}> extends IRouteComponentProps<Params> {
}
