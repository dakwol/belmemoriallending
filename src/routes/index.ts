import React from "react";
import MemorialPage from "../pages/MemorialPage/MemorialPage";
import SearchCardPage from "../pages/SearchCardPage/SearchCardPage";
import DeceasedPage from "../pages/DeceasedPage/DeceasedPage";

export interface IRoute {
    path: string;
    element : React.ComponentType;
    exact?: boolean;
    id?: string;
}

export enum RouteNames {
  
    SEARCH = '/search',
    DECEASED = '/deceased',
    MEMORIAL = '/',

}

export const publicRoutes: IRoute[] = [
    // {path: RouteNames.LOGIN, exact: false, element: Login}
    {path: RouteNames.MEMORIAL, exact: false, element: MemorialPage},

]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.SEARCH, exact: false, element: SearchCardPage},
    { path: `${RouteNames.DECEASED}/:id`, exact: true, element: DeceasedPage },
]