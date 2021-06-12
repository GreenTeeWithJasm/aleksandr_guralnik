import { createContext, useReducer, useEffect } from 'react'
import useHttp from '../hooks/use-http'

// Initial Context State
const initialState = {
  data: [],
  sorting: {
    id: '5ms',
    period: 5,
    precision: 'Minutes'
  },
  error: null,
  status: ''
}

// Context reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'set-data':
      return {
        data: action.payload.data,
        sorting: state.sorting,
        error: null,
        status: action.payload.status
      }
    case 'set-error':
      return {
        data: state.data,
        sorting: state.sorting,
        error: action.payload.error,
        status: action.payload.status
      }
    case 'set-status':
      return {
        ...state,
        status: action.payload.status
      }
    case 'change-sorting':
      return {
        data: [],
        sorting: action.payload,
        error: null,
        status: ''
      }
    default:
      return state
  }
}

export const StockCtx = createContext(initialState)

const StockDataProvider = (props) => {
  const [{ data, sorting, error, status }, dispatch] = useReducer(reducer, initialState)

  const [sendRequest, { data: responseData, status: responseStatus, error: responseError }] = useHttp()

  useEffect(() => {
    if (status === '') {
      const REQ_URL = `https://www.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=${sorting.period}&Precision=${sorting.precision}&StartTime=8/28/2020%2016:0&EndTime=9/4/2020%2023:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume`
      sendRequest(REQ_URL)
    }
  }, [sendRequest, sorting, status])

  useEffect(() => {
    if (responseData !== null) {
      dispatch({ type: 'set-data', payload: { data: responseData, status: responseStatus, error: responseError } })
    } else if (responseError !== null) {
      dispatch({ type: 'set-error', payload: { status: responseStatus, error: responseError } })
    } else {
      dispatch({ type: 'set-status', payload: { status: responseStatus } })
    }
  }, [responseData, responseStatus, responseError, dispatch])

  const formatedData = data.length > 15 ? data.splice(data.length - 15) : [...data]

  return <StockCtx.Provider value={{ data: formatedData, dispatch, sorting, status, error }}>{props.children}</StockCtx.Provider>
}

export default StockDataProvider
