import React, { useEffect, useState } from 'react';
import './index.scss'
import { useParams } from 'react-router-dom';
import { getMovieDetailById } from '../../services/movie-service';
import { IMAGE_URL } from '../../configs/contants';
import Image from '../../components/image/Image';

export interface IDetailPageProps {
}

export default function DetailPage (props: IDetailPageProps) {
  const params = useParams()
  const id: any = params.movieId;
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>(null)
  const [genres, setGenres] = useState<any[]>([])
  useEffect(() => {
    if (id) fetchMovieDetailById()
  }, [id])
  

  const fetchMovieDetailById = async () => {
    setLoading(true)
    try {
      const result = await getMovieDetailById(id)
      if (result) {
        setData(result)
        setGenres(result.genres)
      }
      setLoading(false)
    } catch (error) {
      console.log(">>> Fetch Movie Detail By Id Error", error)
      setLoading(false)
    }
  }
  return (
    <>
      {data ? (
        <div className='layout-container'
          style={{backgroundImage: `linear-gradient( rgba(8, 8, 37, 0.5), rgba(0, 15, 80, 0.5)),url(${IMAGE_URL}${data.backdrop_path})`}}
        >
          <div className='detail-container'>
            <Image data={data.poster_path} alt={data.title} customCss={'image-custom'}/>
            <div className='detail-wrapper-content'>
              <h2>{data.title}</h2>
              <p>Visit: <a href={data.homepage} target='_blank'>{data.homepage}</a></p>
              <div className='tags-wrapper'>
                {genres.map((item: any) => (
                  <div className='tag' key={item.id}>{item.name}</div>
                ))}
              </div>
              <p>{data.overview}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>No data</div>
      )}
    </>
  );
}
