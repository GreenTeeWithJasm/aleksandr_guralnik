import { useContext } from 'react'
import { StockCtx } from '../../context/stock-data'

import Tabs from '../UI/Tabs/Tabs'

const tabsSchema = [
  {
    name: '1 min',
    sorting: {
      id: '1ms',
      period: 1,
      precision: 'Minutes'
    },
    isActive: false
  },
  {
    name: '5 min',
    sorting: {
      id: '5ms',
      period: 5,
      precision: 'Minutes'
    },
    isActive: false
  },
  {
    name: '1 hour',
    sorting: {
      id: '1hs',
      period: 1,
      precision: 'Hours'
    },
    isActive: false
  },
  {
    name: '1 week',
    sorting: {
      id: '1ws',
      period: 168,
      precision: 'Hours'
    },
    isActive: false
  }
]

const PeriodFilter = () => {
  const { dispatch, sorting } = useContext(StockCtx)

  const changeSorting = (payload) => {
    dispatch({ type: 'change-sorting', payload })
  }

  const tabs = tabsSchema.map(item => {
    if (item.sorting.id === sorting.id) {
      item.isActive = true
    } else {
      item.isActive = false
    }
    item.onClick = () => changeSorting(item.sorting)
    return item
  })

  return <div>
    <Tabs tabs={tabs} />
  </div>
}

export default PeriodFilter
