import React, {HTMLAttributes, useState} from "react";

type SelectDropdownProps = {
    handleSetState: (value: any) => void;
    values: any[]
} & HTMLAttributes<HTMLElement>

const SelectDropdown : React.FC<SelectDropdownProps> = ({ handleSetState, values, ...props}) => {
    const [selectedValue, setSelectedValue] = useState(values[0]);


}

