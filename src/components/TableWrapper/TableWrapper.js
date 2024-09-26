import React from 'react'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/tr";
import "dayjs/locale/en";
import "dayjs/locale/es";
import "dayjs/locale/pl";
import { ThemeProvider } from '@mui/material';

import { light } from '../../theme';
import { TranslationProvider } from '../../contexts/TranslationContext';

function TableWrapper({children, language="tr"}) {
  return (
    <ThemeProvider theme={light}>
      <TranslationProvider lang={language}>
        <LocalizationProvider adapterLocale={language} dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </TranslationProvider>
    </ThemeProvider>
  )
}

export default TableWrapper