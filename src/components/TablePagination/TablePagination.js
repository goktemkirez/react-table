import { styled } from "@mui/material/styles";
import { TablePagination as MuiTablePagination, Box } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

import { convertTurkishCharsToEn } from "../../helpers/characterConvert";

// Pagination
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

const CustomTablePagination = styled(MuiTablePagination)(({ theme }) => ({
  width: "100%",
  maxWidth: "100%",
}));

function TablePagination({
  count,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  tableTitle,
}) {
  const theme = useTheme();
  const [cookies, setCookie, removeCookie] = useCookies();
  const upperMedium = useMediaQuery(theme.breakpoints.up("md"));

  const cookiePagination = parseInt(
    cookies[
      `${window.location.pathname}-(${convertTurkishCharsToEn(
        tableTitle
      )})-table-pagination`
    ] || rowsPerPage
  );

  useEffect(() => {
    setRowsPerPage(cookiePagination);
  }, [cookiePagination]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCookie(
      `${window.location.pathname}-(${convertTurkishCharsToEn(
        tableTitle
      )})-table-pagination`,
      parseInt(event.target.value, 10)
    );
    setPage(0);
  };

  return (
    <CustomTablePagination
      rowsPerPageOptions={[5, 10, 15, 25, 50, { label: "Tümü", value: -1 }]}
      colSpan={3}
      count={count}
      rowsPerPage={cookiePagination || rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: {
          "aria-label": "rows per page",
        },
        native: true,
        sx: { boxShadow: "2px 2px 5px #aaaaaa" },
      }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
      labelRowsPerPage=""
      labelDisplayedRows={({ from, to, count }) => {
        return `${
          count !== -1 ? count : `more than ${to}`
        } kayıtta ${from}–${to} arası gösteriliyor.`;
      }}
      sx={
        upperMedium
          ? {
              border: "none",
              ".MuiTablePagination-toolbar": {
                margin: 0,
                padding: 0,
              },
            }
          : {
              border: "none",
              ".MuiTablePagination-toolbar": {
                display: "flex",
                margin: 0,
                padding: 0,
                flexDirection: "column-reverse",
                flexWrap: "wrap",
                alignItems: "flex-start",
              },
              ".MuiTablePagination-displayedRows": {
                padding: 0,
                margin: 0,
                mb: 1.5,
                ml: 1,
              },
              ".MuiTablePagination-toolbar .MuiBox-root": {
                padding: 0,
                margin: 0,
              },
            }
      }
    />
  );
}

export default TablePagination;
