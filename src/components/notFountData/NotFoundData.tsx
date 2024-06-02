import React from 'react';
import './NotFoundData.scss'
import 'bootstrap-icons/font/bootstrap-icons.css';

export interface INotFoundDataProps {
}

export default function NotFoundData (props: INotFoundDataProps) {
  return (
    <h1 className='not-found-data-page'>
      Data is not available
    </h1>
  );
}
