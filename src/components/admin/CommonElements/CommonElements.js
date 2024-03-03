import React from "react";
import { enviourment } from "../enviourment/enviourment";
import { useEffect } from "react";
const SectionTypeSelectList = ({selectedValue}) => {
    useEffect(()=>{
    });
    return (
        <>
        {enviourment.SECTION_TYPES.map((item, index) => (
          <option selected={selectedValue == item?'Selected':''} key={item} value={item}>{item}</option>
        ))}
        </>
        
    );
}

export default SectionTypeSelectList;