import { useTheme, IconButton as MuiIconButton } from "@mui/material";
import React from "react";

function IconButton(props) {
  const { color, onClick, children, ...rest } = props;
  const theme = useTheme();

  return (
    <MuiIconButton
      color={color}
      size="small"
        sx={{
            "&:hover, &.Mui-focusVisible": {
                color: theme.palette[color].dark,
            },
        }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </MuiIconButton>
  );
}

export default IconButton;
