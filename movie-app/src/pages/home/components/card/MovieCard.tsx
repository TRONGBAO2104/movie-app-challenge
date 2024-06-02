import React, { useState } from 'react';
import Loadable from 'react-loadable';
import './MovieCard.scss'
import Loading from '../../../../components/loading/Loading';

import { useNavigate } from 'react-router-dom';

export interface IMovieCardProps {
  data: any;
  onOpen: any,
  layout?: string
}

const Image = Loadable(
  {
      loader: () => import('../../../../components/image/Image'),
      loading: () => <Loading />,
      render(loaded: any, props: any) {
          const Alerts = loaded.default;
          return <Alerts {...props} />
      }
  }
);

export default function MovieCard (props: IMovieCardProps) {
  const { data, onOpen, layout } = props
  const navigate = useNavigate()
  const onClickMovie = (id: number) => {
    navigate(`/${id}`);
  }

  return (
    <div className={`${layout === 'list' ? 'movie-list-wrapper' : 'movie-grid-wrapper'} movie-wrapper`} key={data.id} onClick={(e: any) => onClickMovie(data.id)}>
      <Image data={data.poster_path} alt={data.tittle} customCss={layout === 'list' ? 'image-list-layout' : undefined}/>
      <div className='movie-wrapper-content'>
        <div>
          <h4>{data.title}</h4>
          <p>Vote: {Number(data.vote_average).toFixed(1)}/10</p>
          {layout === 'list' && <p className='description'>{data.overview}</p>}
        </div>
        <button className='movie-wrapper-button' onClick={(e: any) => onOpen(e, data.id)}>TRAILER</button>
      </div>
    </div>
  );
}
