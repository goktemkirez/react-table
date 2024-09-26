import * as React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useTranslation } from "../../../../contexts/TranslationContext";

function SearchInTable({ generalFilter, setGeneralFilter }) {
  const { translation } = useTranslation();

  return (
    <TextField
      size="small"
      fullWidth
      sx={{ mb: 1 }}
      type="search"
      placeholder={`${translation.searchInTable}...`}
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
