import React from 'react';
import styled from 'styled-components';

import { Label } from '../Atoms';
import { CheckboxWrapper } from '../Atoms';
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    formControl: {
        margin: theme.spacing(3)
    }
}));

export const thirdProvider = styled.div`



`;

export interface Checkboxes {
    label: string;
    checked: boolean;

}
export interface CheckboxBlock {
    columnOne: Array<Checkboxes>;
    columnTwo: Array<Checkboxes>;
}



interface CheckboxFilterProps {
    checkboxes: CheckboxBlock;
    onCheckboxChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxFilter = (props: CheckboxFilterProps) => {
    const classes = useStyles();

    const onChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        props.onCheckboxChanged(ev);
    }


    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    {props.checkboxes.columnOne.map((el, index) => (
                        <CheckboxWrapper key={el.label + index} label={el.label} name='one' checked={el.checked} onChange={onChangeHandler} />
                    ))}
                </FormGroup>
            </FormControl>

            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    {props.checkboxes.columnTwo.map((el, index) => (
                        <CheckboxWrapper key={el.label + index} label={el.label} name='two' checked={el.checked} onChange={onChangeHandler} />
                    ))}
                </FormGroup>
            </FormControl>
        </div>
    )
};





// export const TimeFilter = () => (

// );