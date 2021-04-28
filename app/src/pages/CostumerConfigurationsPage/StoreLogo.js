import React, { useState, useRef } from 'react';
import { StyledStoreLogo } from './style';

const StoreLogo = ({ logoUrl, onLogoChange }) => {
    const inputFileRef = useRef(null);

    function onEditClick() {
        inputFileRef.current.click();
    }

    function onImageChange(e) {
        onLogoChange(e.target.files[0]);
    }

    return (
        <StyledStoreLogo>
            <img src={logoUrl} />
            <span onClick={onEditClick}>Editar</span>
            <input
                ref={inputFileRef}
                hidden
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={onImageChange}
            />
        </StyledStoreLogo>
    )
}

export default StoreLogo;
