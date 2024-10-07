import * as React from 'react'
import { useState, useEffect, useRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import {
  Table as MuiTable,
  TableFooter,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Tooltip
} from '@mui/material'
import { styled } from '@mui/material/styles'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { DatePicker } from '@mui/x-date-pickers'
import SortIcon from '@mui/icons-material/Sort'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useCookies } from 'react-cookie'

import { useTranslation } from '../../contexts/TranslationContext'

import { getUniqueListByKey } from './helpers/helperFunctions'
import { convertTurkishCharsToEn } from './helpers/characterConvert'
import {
  areObjectArraysEqual,
  notExistInFirstArray,
  notExistInSecondArray
} from './helpers/compare'
import { sortAsc, sortDesc } from './helpers/sorting'

import AutoComplateFilter from './components/AutoComplateFilter'
import IconButton from './components/IconButton'
import TablePagination from './components/TablePagination'
import Ribbon from './components/Ribbon'
import SearchInTable from './components/SearchInTable'

import "./Table.css"

const datetimeColumnMinWidth = '200px'
const sxFirstColumn = {
  m: 0,
  p: 0.5,
  maxWidth: '60px',
  borderRight: '1px solid #e9e9e9',
  position: 'sticky',
  left: 0,
  zIndex: 4,
  backgroundColor: 'inherit'
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[700]
        : theme.palette.grey[400],
    color: theme.palette.text.primary
  },
  [`&.${tableCellClasses.footer}`]: {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[700]
        : theme.palette.grey[300],
    color: theme.palette.text.primary
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: '4px 8px'
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  },
  '&:nth-of-type(odd)': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.common.white
  }
  // "&.MuiTableRow-hover:hover": {
  //   backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[400],
  // },
  // hide last border
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
}))

// Object Array'deki tüm objectlerin, tüm keylerinde arama için;
function filterObjects(array, searchTerm) {
  return array.filter((obj) =>
    Object.values(obj).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )
}

/**
 * Table component
 * @param {object} props
 * @param {string} props.language - The language of areas such as search, excel export, datepicker in table (tr, en, es, pl...)
 * @param {string} props.title - title of table
 * @param {array} props.data - data source of table, an object array
 * @param {array} props.columns - object array of columns. example: [{name: 'id', title: 'User ID', type: 'string', component: (value, row) => (<div>{value} or {row.id}</div>)}]
 * @param {() => void} props.onEditButtonClick - Function to handle edit click. example: (row) => {setObject(row); setIsModalOpen(true);}
 * @param {() => void} props.onNewButtonClick - Function to handle new click. example: () => {setObject(defaultObject); setIsModalOpen(true);}
 * @param {() => void} props.rowTooltip - Return function to show tooltip on row. example: (row) => {return row.id === 1 && "This row's ID is 1"}
 * @param {bool} props.showFooter - true, false. There are sum of number columns on footer
 */

const Table = ({
  title,
  data,
  columns,
  onEditButtonClick,
  onNewButtonClick,
  rowTooltip,
  showFooter
}) => {
  const { translation } = useTranslation();
  const theme = useTheme()
  const [cookies, setCookie, removeCookie] = useCookies()
  const upperSmall = useMediaQuery(theme.breakpoints.up('sm'))
  const [filterValues, setFilterValues] = useState()
  const [filter, setFilter] = useState()
  const [generalFilter, setGeneralFilter] = useState('')
  const [sortedAsc, setSortedAsc] = useState()
  const [filteredData, setFilteredData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(upperSmall ? 10 : 5)
  const dragRef = useRef(0)
  const dropRef = useRef(0)
  const [orderedColums, setOrderedColumns] = useState(columns)

  // Data değişince işlemler
  useEffect(() => {
    const filterValuesAndSortsAndFilters = (event) => {
      try {
        setFilteredData(data)

        // Filtre Autocomplateleri doldur
        let tempObj = {}
        columns
          .filter((x) => x.type === 'string' || x.type === 'number')
          .forEach((column) => {
            tempObj[column.name] = getUniqueListByKey(data, column.name).sort()
          })
          
        setFilterValues(tempObj)

        // Sorting doldur
        tempObj = {}

        columns.forEach((column) => {
          tempObj[column.name] = null
        })

        setSortedAsc(tempObj)

        // Filtre default değerleri doldur
        tempObj = {}

        columns.forEach((column) => {
          if (column.type === 'string' || column.type === 'number') {
            tempObj[column.name] = []
          } else if (column.type === 'date') {
            tempObj[`${column.name}1`] = null
            tempObj[`${column.name}2`] = null
          } else if (column.type === 'bool') {
            tempObj[column.name] = null
          }
        })

        setFilter(tempObj)
      } catch (error) {
        console.log('error', error)
      }
    }
    filterValuesAndSortsAndFilters()
  }, [data])

  // Filtreleme kodu
  useEffect(() => {
    const doFilter = () => {
      if (!filter) {
        setFilteredData(data)
        return
      }

      let filterSay = 0

      Object.keys(filter).forEach(function (key) {
        filterSay += filter[key]?.length
      })

      if (filterSay === 0) {
        setFilteredData(data)
        return
      }

      let tempData = [...data]

      tempData = tempData.filter(function (item) {
        let tempReturn = true
        columns.forEach((column) => {
          if (column.type === 'string' || column.type === 'number') {
            if (
              filter[`${column.name}`].length > 0 &&
              !filter[`${column.name}`].includes(item[`${column.name}`])
            )
              return (tempReturn = false)
          } else if (column.type === 'date') {
            if (
              (filter[`${column.name}1`] !== null ||
                filter[`${column.name}2`] !== null) &&
              item[`${column.name}`] === null
            )
              return (tempReturn = false)
            if (
              filter[`${column.name}1`] !== null &&
              dayjs(filter[`${column.name}1`]) > dayjs(item[`${column.name}`])
            )
              return (tempReturn = false)
            if (
              filter[`${column.name}2`] !== null &&
              dayjs(filter[`${column.name}2`]).add(1, 'day') <=
                dayjs(item[`${column.name}`])
            )
              return (tempReturn = false)
          } else if (column.type === 'bool') {
            if (
              filter[`${column.name}`] !== null &&
              filter[`${column.name}`] !== item[`${column.name}`]
            )
              return (tempReturn = false)
          }
        })
        return tempReturn
      })

      tempData = filterObjects(tempData, generalFilter)

      setFilteredData(tempData)
      setPage(0)
    }

    doFilter()
  }, [filter, generalFilter])

  const handleFiltreTemizle = () => {
    let tempObj = {}

    columns.forEach((column) => {
      if (column.type === 'string' || column.type === 'number') {
        tempObj[column.name] = []
      } else if (column.type === 'date') {
        tempObj[`${column.name}1`] = null
        tempObj[`${column.name}2`] = null
      } else if (column.type === 'bool') {
        tempObj[column.name] = null
      }
    })

    setFilter(tempObj)
  }

  const sortByColumn = (columnName) => {
    if (!sortedAsc[columnName]) {
      let tempArr = sortAsc(filteredData, columnName)
      setFilteredData(tempArr)
      setSortedAsc({ ...sortedAsc, [columnName]: true })
    } else {
      let tempArr = sortDesc(filteredData, columnName)
      setFilteredData(tempArr)
      setSortedAsc({ ...sortedAsc, [columnName]: false })
    }
  }

  // Column Drag and Drop için
  const cookieName = `${window.location.pathname}-(${convertTurkishCharsToEn(
    title
  )})-table-column-order`

  useEffect(() => {
    if (!columns || !cookies[cookieName]) return;

    let columnsCookie = cookies[cookieName]

    // Cookie'de kayıtlı column listesi ve tablodaki column listesi aynıysa Cookie'den kayıtlı sıralamayı al
    if (areObjectArraysEqual(columnsCookie, columns, 'name')) {
      let tempArr = []

      columnsCookie.forEach((element) => {
        tempArr.push(columns.find((x) => x.name === element.name))
      })

      setOrderedColumns(tempArr)
    } else {
      let added = notExistInFirstArray(columnsCookie, columns, 'name')
      let deleted = notExistInSecondArray(columnsCookie, columns, 'name')

      let tempColumnsCookie = [...columnsCookie]

      // Tabloya yeni column eklendiyse, Cookie'deki sıralanın en başına ekle
      added.forEach((element) => {
        tempColumnsCookie.unshift(element)
      })

      // Tablodan column silindiyse, Cookie'deki sıralamadan sil
      deleted.forEach((element) => {
        let tempIndex = tempColumnsCookie.findIndex(
          (x) => x.name === element.name
        )
        tempColumnsCookie.splice(tempIndex, 1)
      })

      let tempArr = []

      tempColumnsCookie.forEach((element) => {
        tempArr.push(columns.find((x) => x.name === element.name))
      })

      setOrderedColumns(tempArr)

      // Cookie güncelle
      setCookie(cookieName, tempColumnsCookie)
    }
  }, [columns])

  function handleDrop() {
    const dataClone = [...orderedColums]

    const temp = dataClone[dragRef.current]
    dataClone[dragRef.current] = dataClone[dropRef.current]
    dataClone[dropRef.current] = temp

    setOrderedColumns([...dataClone])

    // Sıralamayı Cookies e kaydet
    let tempArr = []
    dataClone.forEach((element) => {
      tempArr.push({ name: element.name })
    })

    setCookie(cookieName, tempArr)
  }

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Ribbon title={title} data={filteredData} />
      <SearchInTable
        generalFilter={generalFilter}
        setGeneralFilter={setGeneralFilter}
      />
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: '100%'
        }}
      >
        <MuiTable size='small' sx={{ borderCollapse: 'separate' }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align='center' sx={sxFirstColumn}>
                {onNewButtonClick && (
                  <IconButton
                    title={translation.new}
                    color='success'
                    onClick={onNewButtonClick}
                  >
                    <AddBoxIcon />
                  </IconButton>
                )}
              </StyledTableCell>
              {orderedColums?.map((column, index) => (
                <StyledTableCell
                  key={index}
                  align='center'
                  draggable
                  onDragStart={() => (dragRef.current = index)}
                  onDragEnter={() => (dropRef.current = index)}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    title={translation.sort}
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                    onClick={() => sortByColumn(column.name)}
                  >
                    <Typography fontSize={14} fontWeight={600}>
                      {column.title}
                    </Typography>
                    <Box display='flex' alignItems='center'>
                      {sortedAsc !== undefined &&
                      sortedAsc[column.name] === true ? (
                        <ArrowDownwardIcon
                          fontSize='small'
                          color='action'
                          sx={{ ml: 1 }}
                        />
                      ) : sortedAsc !== undefined &&
                        sortedAsc[column.name] === false ? (
                        <ArrowUpwardIcon
                          fontSize='small'
                          color='action'
                          sx={{ ml: 1 }}
                        />
                      ) : (
                        <SortIcon
                          fontSize='small'
                          color='action'
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Box>
                  </Box>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell align='center' sx={sxFirstColumn}>
                <IconButton
                  title={translation.clearFilters}
                  color='info'
                  onClick={handleFiltreTemizle}
                >
                  <FilterAltOffIcon />
                </IconButton>
              </StyledTableCell>
              {orderedColums?.map((column, index) => (
                <Fragment key={index}>
                  {(column.type === 'string' || column.type === 'number') && (
                    <StyledTableCell key={index} align='center'>
                      <AutoComplateFilter
                        options={
                          filterValues ? filterValues[`${column.name}`] : []
                        }
                        value={filter ? filter[column.name] : []}
                        onChange={(event, newValue) => {
                          setFilter({
                            ...filter,
                            [`${column.name}`]: newValue
                          })
                        }}
                        label=''
                        sx={{ minWidth: 130 }}
                      />
                    </StyledTableCell>
                  )}
                  {column.type === 'date' && (
                    <StyledTableCell
                      key={index}
                      align='center'
                      sx={{
                        minWidth: datetimeColumnMinWidth,
                        maxWidth: datetimeColumnMinWidth
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <DatePicker
                          sx={{ width: '100%' }}
                          label={'Min'}
                          openTo='month'
                          views={['year', 'month', 'day']}
                          value={
                            filter
                              ? filter[`${column.name}1`]
                              : '' === ''
                              ? null
                              : dayjs(filter[`${column.name}1`])
                          }
                          onAccept={(value) =>
                            setFilter({
                              ...filter,
                              [`${column.name}1`]: dayjs(value?.['$d'])
                            })
                          }
                          onChange={(value) => {
                            setFilter({
                              ...filter,
                              [`${column.name}1`]: dayjs(value?.['$d'])
                            })
                          }}
                          slotProps={{
                            textField: { size: 'small', disabled: true }
                          }}
                        />
                        -
                        <DatePicker
                          sx={{ width: '100%' }}
                          label={'Max'}
                          openTo='month'
                          views={['year', 'month', 'day']}
                          value={
                            filter
                              ? filter[`${column.name}2`]
                              : '' === ''
                              ? null
                              : dayjs(filter[`${column.name}2`])
                          }
                          onAccept={(value) =>
                            setFilter({
                              ...filter,
                              [`${column.name}2`]: dayjs(value?.['$d'])
                            })
                          }
                          onChange={(value) =>
                            setFilter({
                              ...filter,
                              [`${column.name}2`]: dayjs(value?.['$d'])
                            })
                          }
                          slotProps={{
                            textField: { size: 'small', disabled: true }
                          }}
                        />
                      </Box>
                    </StyledTableCell>
                  )}
                  {column.type === 'bool' && (
                    <StyledTableCell key={index} align='center'>
                      <FormControlLabel
                        sx={{ m: 0 }}
                        control={
                          <Checkbox
                            checked={filter?.[column.name] === true}
                            indeterminate={filter?.[column.name] === false}
                            onChange={(e) => {
                              if (filter[`${column.name}`] === null)
                                setFilter({
                                  ...filter,
                                  [`${column.name}`]: true
                                })
                              else if (filter[`${column.name}`] === true)
                                setFilter({
                                  ...filter,
                                  [`${column.name}`]: false
                                })
                              else
                                setFilter({
                                  ...filter,
                                  [`${column.name}`]: null
                                })
                            }}
                          />
                        }
                      />
                    </StyledTableCell>
                  )}
                </Fragment>
              ))}
            </StyledTableRow>
            {(rowsPerPage > 0
              ? filteredData?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredData
            )?.map((row, index) => (
              <Tooltip
                key={index}
                arrow
                followCursor
                enterDelay={500}
                enterNextDelay={500}
                leaveDelay={0}
                title={
                  rowTooltip &&
                  rowTooltip(row) && (
                    <div style={{ whiteSpace: 'pre-line' }}>
                      {rowTooltip(row)}
                    </div>
                  )
                }
              >
                <StyledTableRow>
                  <StyledTableCell align='center' sx={sxFirstColumn}>
                    {onEditButtonClick && (
                      <IconButton
                        title={translation.detail}
                        color='warning'
                        onClick={() => onEditButtonClick(row)}
                      >
                        <DriveFileRenameOutlineIcon />
                      </IconButton>
                    )}
                  </StyledTableCell>
                  {orderedColums?.map((column, index) => (
                    <Fragment key={index}>
                      {column.component ? (
                        <StyledTableCell
                          key={index}
                          align='center'
                          sx={{
                            height: 0,
                            backgroundColor:
                              generalFilter &&
                              row[column.name]
                                ?.toString()
                                ?.toLowerCase()
                                ?.includes(generalFilter.toLowerCase()) &&
                              (theme.palette.mode === 'dark'
                                ? '#e0bc00'
                                : '#FFFF40')
                          }}
                        >
                          {column.component(row[column.name], row)}
                        </StyledTableCell>
                      ) : (
                        <>
                          {(column.type === 'string' ||
                            column.type === 'number') && (
                            <StyledTableCell
                              key={index}
                              align='center'
                              sx={{
                                backgroundColor:
                                  generalFilter &&
                                  row[column.name]
                                    ?.toString()
                                    ?.toLowerCase()
                                    ?.includes(generalFilter.toLowerCase()) &&
                                  (theme.palette.mode === 'dark'
                                    ? '#e0bc00'
                                    : '#FFFF40')
                              }}
                            >
                              {row[column.name]}
                            </StyledTableCell>
                          )}
                          {column.type === 'date' && (
                            <StyledTableCell
                              key={index}
                              align='center'
                              sx={{
                                minWidth: datetimeColumnMinWidth,
                                backgroundColor:
                                  generalFilter &&
                                  row[column.name]
                                    ?.toString()
                                    ?.toLowerCase()
                                    ?.includes(generalFilter.toLowerCase()) &&
                                  (theme.palette.mode === 'dark'
                                    ? '#e0bc00'
                                    : '#FFFF40')
                              }}
                            >
                              {row[column.name] !== null
                                ? new Date(
                                    row[column.name]
                                  )?.toLocaleDateString()
                                : null}
                            </StyledTableCell>
                          )}
                          {column.type === 'bool' && (
                            <StyledTableCell
                              key={index}
                              align='center'
                              sx={{
                                backgroundColor:
                                  generalFilter &&
                                  row[column.name]
                                    ?.toString()
                                    ?.toLowerCase()
                                    ?.includes(generalFilter.toLowerCase()) &&
                                  (theme.palette.mode === 'dark'
                                    ? '#e0bc00'
                                    : '#FFFF40')
                              }}
                            >
                              {row[column.name] && (
                                <CheckCircleIcon
                                  color='success'
                                  fontSize='small'
                                />
                              )}
                            </StyledTableCell>
                          )}
                        </>
                      )}
                    </Fragment>
                  ))}
                </StyledTableRow>
              </Tooltip>
            ))}
          </TableBody>
          <TableFooter>
            {showFooter && (
              <TableRow>
                <StyledTableCell align='center'></StyledTableCell>
                {orderedColums?.map((column, index) => (
                  <>
                    {column.type === 'number' && (
                      <StyledTableCell key={index} align='center'>
                        {filteredData
                          ?.reduce((n, obj) => n + obj[column.name], 0)
                          .toFixed(0)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </StyledTableCell>
                    )}
                    {column.type !== 'number' && (
                      <StyledTableCell
                        key={index}
                        align='center'
                      ></StyledTableCell>
                    )}
                  </>
                ))}
              </TableRow>
            )}
          </TableFooter>
        </MuiTable>
      </TableContainer>
      <>
        <TablePagination
          count={filteredData?.length}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          tableTitle={title}
        />
      </>
    </Box>
  )
}

Table.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      title: PropTypes.string,
      type: PropTypes.oneOf(['string', 'number', 'date', 'bool']).isRequired,
      component: PropTypes.func
    })
  ).isRequired,
  onEditButtonClick: PropTypes.func,
  onNewButtonClick: PropTypes.func,
  rowTooltip: PropTypes.func,
  showFooter: PropTypes.bool
}

PropTypes.checkPropTypes()

export default Table
