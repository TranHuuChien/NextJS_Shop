import {HTMLAttributes} from "react";

type Breadcrumb = {
    darkMode?: boolean;
    start?: number;
    end?: number;
} & HTMLAttributes<HTMLElement>;

const Breadcrumb : React.FC<Breadcrumb> = ({ darkMode = false
      , start= 2, end , ...props}) => {

}