import styled, { css } from 'styled-components'
import { Checkbox } from '@material-ui/core';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from 'react';


export const fontSetting = css`
    font-size: 20px;
    letter-spacing: .25px;
`;

export const Label = styled.span`
    white-space: nowrap;
    margin-right: 10px;
    ${fontSetting};
 `;


export const CheckboxWrapper = (props) => (
    <FormControlLabel style={{whiteSpace: 'nowrap'}}
        control={<Checkbox checked={props.checked} value={props.label} color="default" {...props} />}
        label={props.label}
    />
);

