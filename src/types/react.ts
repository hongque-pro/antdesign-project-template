import type { ComponentProps } from 'react';
import type { RouteChildrenProps } from 'react-router';

type BaseProps = RouteChildrenProps & ComponentProps<any>;

export type ComponentProperties = BaseProps;
