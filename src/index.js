import React from 'react'
import styles from './styles.module.css'
import Table from './components/Table'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export const TestComponent = ({ text }) => {
  return <div className={styles.test}>Test Component: {text}</div>
}

export const Tbl = ({ props }) => {
  return <Table {...props} />
}

export default Table

