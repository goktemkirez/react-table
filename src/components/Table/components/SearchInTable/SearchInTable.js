import * as React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchInTable({ generalFilter, setGeneralFilter }) {
  return (
    <TextField
      size="small"
      fullWidth
      sx={{ mb: 1 }}
      type="search"
      placeholder="Tabloda Ara..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
      value={generalFilter}
      onChange={(e) => setGeneralFilter(e.target.value)}
    />
  );
}

export default SearchInTable;
