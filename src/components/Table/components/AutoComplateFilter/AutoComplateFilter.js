import * as React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { useTranslation } from "../../../../contexts/TranslationContext";

function AutoComplateFilter(props) {
  const { options, value, onChange, label, ...rest } = props
  const theme = useTheme()
  const { translation } = useTranslation();

  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) => option?.toString()}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props
        return (
          <li key={key} {...optionProps} style={{ minHeight: 30 }}>
            {option?.toString()}
          </li>
        )
      }}
      filterSelectedOptions
      limitTags={1}
      size='small'
      // disableClearable
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          // label={label}
          sx={{
            p: 0,
            m: 0,
            '& .MuiInputBase-root.MuiAutocomplete-inputRoot': {
              paddingRight: 0
            },
            '& .MuiInputBase-root.MuiAutocomplete-input': {
              minWidth: '100%'
            },
            // "& .MuiAutocomplete-input": {
            //   "&:focus": {
            //     width: 200,
            //   },
            // },
            '& .MuiButtonBase-root.MuiAutocomplete-tag': {
              fontSize: 10
            },
            // "& .MuiAutocomplete-endAdornment": {
            //   p: 0,
            //   m: 0,
            //   right: 0,
            //   display: "flex",
            //   flexDirection: "column",
            //   alignItems: "center",
            //   justifyContent: "space-between",
            // },
            '& .MuiButtonBase-root.MuiAutocomplete-clearIndicator': {
              color: theme.palette.primary.main
              // p: 0,
              // m: 0,
              // right: 0,
            },
            '& .MuiButtonBase-root.MuiAutocomplete-popupIndicator': {
              color: theme.palette.primary.main
              // p: 0,
              // m: 0,
              // right: 0,
            }
          }}
        />
      )}
      noOptionsText={`${translation.notFound}`}
      {...rest}
    />
  )
}

export default AutoComplateFilter
