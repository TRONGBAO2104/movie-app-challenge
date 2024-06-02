import React from 'react';
import './Loading.scss'
export interface ILoadingProps {
}

export default function Loading (props: ILoadingProps) {
  return (
    <i className="icon-loading bi bi-arrow-repeat"></i>
  );
}
