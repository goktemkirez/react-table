import { Autocomplete, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function AutoComplateFilter(props) {
  const { options, value, onChange, label, ...rest } = props;
  const theme = useTheme();

  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) => option?.toString()}
      filterSelectedOptions
      limitTags={1}
      size="small"
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
            "& .MuiInputBase-root.MuiAutocomplete-inputRoot": {
              paddingRight: 0,
            },
            "& .MuiInputBase-root.MuiAutocomplete-input": {
              minWidth: "100%",
            },
            // "& .MuiAutocomplete-input": {
            //   "&:focus": {
            //     width: 200,
            //   },
            // },
            "& .MuiButtonBase-root.MuiAutocomplete-tag": {
              fontSize: 10,
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
            "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
              color: theme.palette.primary.main,
              // p: 0,
              // m: 0,
              // right: 0,
            },
            "& .MuiButtonBase-root.MuiAutocomplete-popupIndicator": {
              color: theme.palette.primary.main,
              // p: 0,
              // m: 0,
              // right: 0,
            },
          }}
        />
      )}
      noOptionsText="Bulunamadı."
      {...rest}
    />
  );
}

export default AutoComplateFilter;