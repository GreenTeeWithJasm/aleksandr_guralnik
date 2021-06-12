import PropTypes from 'prop-types'

import classes from './Tab.module.css'

const Tab = (props) => {

  return (
    <div className={`${classes.Tab} ${props.isActive ? classes.active : ''}`} onClick={props.onClick}>
      <p>{props.name}</p>
    </div>
  )
}

Tab.propTypes = {
  name: PropTypes.string,
  isActive: PropTypes.bool,
  sorting: PropTypes.object,
  onClick: PropTypes.func
}

Tab.defaultProps = {
  name: '',
  isActive: false,
  sorting: {},
  onClick: () => {}
}

export default Tab
