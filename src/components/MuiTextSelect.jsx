import React from 'react'
import TextField from '@mui/material/TextField';
import MuiComponent from '../core/MuiComponent';

export default class MuiTextSelect extends MuiComponent {
    renderMuiComponent() {
        const {
            error,
            errorMessages,
            validators,
            requiredError,
            helperText,
            validatorListener,
            withRequiredValidator,
            containerProps,
            ...rest
        } = this.props;
        const { isValid } = this.state;
        return (
            <TextField
                {...rest}
                select
                error={!isValid || error}
                helperText={(!isValid && this.getErrorMessage()) || helperText}
            />
        );
    }
}
