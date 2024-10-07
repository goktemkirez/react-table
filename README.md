# @goktemkirez/react-table

> React Table with MUI

[![NPM](https://img.shields.io/npm/v/@goktemkirez/react-table.svg)](https://www.npmjs.com/package/@goktemkirez/react-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @goktemkirez/react-table
```

## Usage

```jsx
import React, { useEffect, useState } from 'react'

import Table from '@goktemkirez/react-table'

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/c/3b32-4630-419c-9426')
      .then((res) => res.json())
      .then((res) => setData(res))
  }, [])
  
  return (
    <Table
        language="en" // tr(Turkish), en(English), pl(Polish), es(Spanish) are supported. Default language is tr(Turkish)
        title='Dummy Table'
        data={data}
        columns={[
          {
            name: 'dummyId', // object key in data
            title: 'Dummy ID', // custom name for column
            type: 'number' // data type
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
            component: (value, row) => (
              <div style={{ backgroundColor: 'red', height: '100%' }}>
                {value} or {row.dummyBoolNumber}
              </div>
            ) // you can add custom component to column
          },
          {
            name: 'dummyUrl',
            title: 'dummyUrl',
            type: 'string',
            component: (value, row) => (
              <a href={value} target='_blank' rel='noopener noreferrer'>
                {value}
              </a>
            )
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
        showFooter={true} // You can show sum of number values on footer
    />
  )
}
```

## License

MIT © [goktemkirez](https://github.com/goktemkirez)
