import React, { memo } from 'react'

const Select = ({
  className, label, name, values, register, formState, ...rest }) => {

  return (
    <div className={className}>
      <label>{label}</label>
      <select name={name} {...register(name)} {...rest}>
        {values.map(({ value, title }) => {
          return <option key={value} value={value}>{title ? title : value}</option>
        })}
      </select>
    </div>
  )
}

export default memo(Select)