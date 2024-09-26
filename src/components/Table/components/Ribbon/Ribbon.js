import { Button, Grid, Typography, useTheme } from "@mui/material";
import React from "react";

import { downloadExcel } from "../../helpers/excel";

function Ribbon({ title, data }) {
  const theme = useTheme();

  return (
    <Grid container spacing={2} mb={1}>
      <Grid item xs={8}>
        <Typography
          fontSize={20}
          fontWeight={700}
          color={theme.palette.primary.main}
          mt={0}
          mr={3}
        >
          {title}
        </Typography>
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="flex-end">
        {data && (
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={() => downloadExcel(data)}
          >
            Excel Export
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default Ribbon;
