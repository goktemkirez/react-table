import React, { useEffect, useState } from 'react'
import '@goktemkirez/react-table/dist/index.css'
import Table, { ExampleComponent, Tbl } from '@goktemkirez/react-table'

import dummyJSON from './dummy-json'

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
      />
    </>
  )
}

export default App
