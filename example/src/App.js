import React, { useEffect, useState } from 'react'
import '@goktemkirez/react-table/dist/index.css'
import Table, { ExampleComponent } from '@goktemkirez/react-table'

// import dummyJSON from './dummy-json'

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/c/3b32-4630-419c-9426')
      .then((res) => res.json())
      .then((res) => setData(res))
  }, [])

  return (
    <>
      <ExampleComponent text='Create React Library Example 😄' />
      <Table
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
            name: 'dummyBool',
            title: 'dummyBool with component',
            type: 'bool',
            component: (value, row) => (<div>{value} or {row.dummyBool}</div>) // you can add custom component to column
          },
          {
            name: 'dummyBoolNumber',
            title: 'dummyBoolNumber',
            type: 'bool'
          },
          {
            name: 'dummyUrl',
            title: 'dummyUrl',
            type: 'string'
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
