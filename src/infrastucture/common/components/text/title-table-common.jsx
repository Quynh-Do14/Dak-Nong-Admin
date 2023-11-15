import React from 'react'

export const TitleTableCommon = (props) => {
  const { title, width } = props;
  return (
    <div className='white-space-nowrap' style={{ width: width }}>{title} </div>
  )
}
