import * as React from 'react';
import './index.scss'
export interface INotFoundPageProps {
}

export default function NotFoundPage (props: INotFoundPageProps) {
  return (
    <div className='error-container'>
      <h1>
        404 - This page could not be found.
      </h1>
    </div>
  );
}
