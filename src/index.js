import React from 'react'
import PropTypes from 'prop-types'

import { default as TableComponent } from './components/Table'
import TableWrapper from './components/TableWrapper'

import styles from './styles.module.css'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
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

export const Table = ({ language, ...props }) => {
  return (
    <TableWrapper language={language}>
      <TableComponent {...props} />
    </TableWrapper>
  )
}

Table.propTypes = {
  language: PropTypes.string,
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
