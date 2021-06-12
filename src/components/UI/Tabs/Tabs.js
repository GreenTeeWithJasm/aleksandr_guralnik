import PropTypes from 'prop-types'

import classes from './Tabs.module.css'

import Tab from './Tab/Tab'

const Tabs = (props) => {
  const tabs = props.tabs.map((item, index) => <Tab key={`tab__${item.name}${index}`} {...item} />)

  return (
    <div className={classes.Tabs}>
      {tabs}
    </div>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.array
}

Tabs.defaultProps = {
  tabs: []
}

export default Tabs