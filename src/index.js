import React from 'react'
import styles from './styles.module.css'
import Table from './components/Table'
import Deneme from './Deneme'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export const TestComponent = ({ text }) => {
  return <div className={styles.test}>Test Component: {text}</div>
}

export const Deneme = () => {
  return <Deneme />
}

export default Table

