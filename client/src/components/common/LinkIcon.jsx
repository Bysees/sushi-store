import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LinkIcon = ({ className, title, icon, path }) => {
  return (
    <div className={className}>
      <Link to={path}>
        <FontAwesomeIcon icon={icon} />
        <div>{title}</div>
      </Link>
    </div>
  )
}

export default LinkIcon