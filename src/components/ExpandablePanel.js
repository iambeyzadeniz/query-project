import React, { useState } from 'react'
import { FaChevronLeft, FaChevronDown } from "react-icons/fa";
export default function ExpandablePanel({ children, header }) {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    }
    return (
        <div className='panelDiv'>
            <div className='topArrangement'>
                <div className='topArrangement'>{header}</div>
                <div onClick={handleClick}>
                    {expanded ? <FaChevronDown /> : <FaChevronLeft />}

                </div>
            </div>
            {expanded ? <div>{children}</div> : <></>}
        </div>
    )
}
