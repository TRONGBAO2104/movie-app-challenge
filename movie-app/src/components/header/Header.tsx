import * as React from 'react';
import './Header.scss'
import { useNavigate } from 'react-router-dom';
export interface IHeaderProps {
}

export default function Header (props: IHeaderProps) {
  const navigate = useNavigate()
  return (
    <div className='header-container' onClick={() => navigate('/')}>
      MOVIE WORLD
    </div>
  );
}
