import React from 'react';
import './Sidebar.scss'
interface ICheckbox {
  id: number,
  name: string,
  isChecked: boolean
}

export interface ISidebarProps {
  data: ICheckbox[],
  type: string,
  onChangeCheck: any,
  onChangeCheckAll: any,
  checkAll: boolean
}

export default function Sidebar (props: ISidebarProps) {
  const { data, checkAll, type, onChangeCheck, onChangeCheckAll } = props
  return (
    <div className='sidebar-container'>
      <h4>GENRES</h4>
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
