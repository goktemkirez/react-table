import React, { useEffect, useState } from 'react'
import Table from '@goktemkirez/react-table'

import dummyJSON from './dummy-json'

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    // fetch('https://dummyjson.com/c/3b32-4630-419c-9426')
    //   .then((res) => res.json())
    //   .then((res) => setData(res))
    setData(dummyJSON)
  }, [])

  return (
    <>
      <Table
        language="en"
        title='Test Table'
        data={data}
        columns={[
          {
            name: 'dummyId',
            title: 'dummyId',
            type: 'number'
          },
          {
            name: 'dummyText',
            title: 'dummyText',
            type: 'string'
          },
          {
            name: 'dummyDate',
            title: 'dummyDate',
            type: 'date'
          },
          {
            name: 'dummyNumber',
            title: 'dummyNumber',
            type: 'number'
          },
          {
            name: 'dummyNumberWithDot',
            title: 'dummyNumberWithDot',
            type: 'number'
          },
          {
            name: 'dummyBool',
            title: 'dummyBool',
            type: 'bool'
          },
          {
            name: 'dummyBoolNumber',
            title: 'column with component',
            type: 'number',
            component: (value, row) => (<div style={{backgroundColor: "red"}}>{value} or {row.dummyBoolNumber}</div>) // you can add custom component to column
          },
          {
            name: 'dummyUrl',
            title: 'dummyUrl',
            type: 'string',
            component: (value, row) => (<a href={value} target='_blank' rel="noopener noreferrer">{value}</a>)
          }
        ]}
        onNewButtonClick={() => {
          alert("New button clicked")
        }}
        onEditButtonClick={(row) => {
          alert(`ID: ${row.dummyId} row edit clicked`)
        }}
        rowTooltip={(row) => {
            return row.dummyBool && "dummyBool is true";
        }}
        showFooter={true}
      />
    </>
  )
}

export default App
