import React from 'react'

import Table from 'src/components/Table'

import styles from './styles.module.css'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export default Table
