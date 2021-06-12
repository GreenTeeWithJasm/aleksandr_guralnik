import { useContext } from 'react'
import { StockCtx } from './context/stock-data'

import Card from './components/UI/Card/Card'
import PeriodFilter from './components/PeriodFilter/PeriodFilter'
import Chart from './components/Chart/Chart'

const App = () => {
  const ctx = useContext(StockCtx)

  let content = (
    <main>
      <PeriodFilter />
      <Card>
        <Chart />
      </Card>
    </main>
  )

  if (ctx.error) {
    content = <p>An error occured: {ctx.error.message}</p>
  }

  if (ctx.status === 'pending') {
    content = <div className="spinner"></div>
  }

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>Apple stock data</h1>
        </header>
        {content}
      </div>
    </div>
  );
}

export default App;
