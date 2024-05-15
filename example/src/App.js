import React from 'react'
import '@goktemkirez/react-table/dist/index.css'
// import { ExampleComponent } from '@goktemkirez/react-table'
import Table from '@goktemkirez/react-table'

import dummyJSON from "./dummy-json"

const App = () => {
  return <>
    {/* <ExampleComponent text="Create React Library Example 😄" /> */}
    <Table 
        title="Test Table"
        data={dummyJSON}
        columns={[
          {
            name: "dummyId",
            title: "dummyId",
            type: "number",
          },
          {
            name: "dummyText",
            title: "dummyText",
            type: "string",
          },
          {
            name: "dummyDate",
            title: "dummyDate",
            type: "date",
          },
          {
            name: "dummyNumber",
            title: "dummyNumber",
            type: "number",
          },
          {
            name: "dummyNumberWithDot",
            title: "dummyNumberWithDot",
            type: "number",
          },
          {
            name: "dummyBool",
            title: "dummyBool",
            type: "bool",
          },
          {
            name: "dummyBoolNumber",
            title: "dummyBoolNumber",
            type: "bool",
          },
          {
            name: "dummyUrl",
            title: "dummyUrl",
            type: "string",
          },
        ]} />
  </>
}

export default App
