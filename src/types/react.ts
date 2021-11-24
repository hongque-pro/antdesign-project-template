import type { ReactNode } from 'react';
import type { RouteChildrenProps } from 'react-router';


export interface ComponentProperties extends RouteChildrenProps {
    children?: ReactNode;
}
