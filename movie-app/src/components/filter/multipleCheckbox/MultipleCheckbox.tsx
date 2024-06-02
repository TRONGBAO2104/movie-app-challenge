import React from 'react';
import './MultipleCheckbox.scss'
interface ICheckbox {
  id: number,
  name: string,
  isChecked: boolean
}

export interface IMultipleCheckboxProps {
  data: ICheckbox[],
  type: string,
  onChangeCheck: any,
  onChangeCheckAll: any,
  checkAll: boolean,
  collapseRef: any
}

export default function MultipleCheckbox (props: IMultipleCheckboxProps) {
  const { data, checkAll, type, onChangeCheck, onChangeCheckAll, collapseRef } = props
  return (
    <div className='multiple-checkbox-container' ref={collapseRef}>
      <div className='checkbox-wrapper'>
          <input type="checkbox" checked={checkAll} onChange={(e: any) => onChangeCheckAll(e, type)}/>
          <span>All</span>
        </div>
      {data.map((item: any) => (
        <div className='checkbox-wrapper'>
          <input type="checkbox" checked={item.isChecked} onChange={(e: any) => onChangeCheck(e, item, type)}/>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
