import { ReactNode } from "react";
import {FieldValues, UseFormReturn} from "react-hook-form";

export interface ChildrenProps {
    children: ReactNode;
}

export interface Paging {
    totalPage: number;
    currentPage: number;
    page: number;
    pageSize: number;
    indexPage: number;
}

export interface TypeValueSelect {
    title: string;
    value: number | string | undefined
}

export interface TypeValueRadio {
    label: string;
    value: number | string | undefined;
    name?: string;
    isDisabled?: boolean
}

export interface TypeValueCheckbox {
    label: string;
    value: number | string | undefined;
    name?: string;
    isDisable?: boolean
}

export interface TypeMapObj<K, V> {
    key: K;
    value: V;
}


export interface ReactHookFormType<T extends FieldValues> {
    form: UseFormReturn<T>;
}