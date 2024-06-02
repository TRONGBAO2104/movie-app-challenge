import React, { useEffect, useRef, useState } from 'react';
import './index.scss'
import { IPagination } from '../../models/pagination';
import Input from '../../components/filter/input/Input';
import MovieCard from '../home/components/card/MovieCard';
import Loading from '../../components/loading/Loading';
import VideoModal from '../../components/modal/VideoModal';
import NotFoundData from '../../components/notFountData/NotFoundData';
import Loadable from 'react-loadable';
import { getMoviesByKeyword } from '../../services/global-service';

const Pagination = Loadable(
  {
      loader: () => import('../../components/pagination/Pagination'),
      loading: () => <Loading />,
      render(loaded: any, props: any) {
          const Alerts = loaded.default;
          return <Alerts {...props} />
      }
  }
);

export interface ISearchPageProps {
}

export default function SearchPage (props: ISearchPageProps) {
  const params =  new URLSearchParams(window.location.search)
  const keyword: any = params.get("keyword")
  const [data, setData] = useState<any[]>([])
  const [movieId, setMovieId] = useState<number | undefined>(undefined)
  const [openTrailerVideoModal, setOpenTrailerVideoModal] = useState<boolean>(false)
  const [search, setSearch] = useState<any>(keyword)
  console.log(">>> search", search)
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    total: 0
  })

  useEffect(() => {
    fetchMovieByKeyword()
  }, [pagination.page])
  
  const fetchMovieByKeyword = async () => {
    setLoading(true)
    try {
      const { page } = pagination
      const params = {
        query: search,
        page: page,
        include_adult: true,
      }
      const result = await getMoviesByKeyword(params)
      if (result && result.results) {
        setData(result.results)
        setPagination({
          ...pagination,
          page: result.page,
          total: result.total_pages,
        })
      }
      setLoading(false)
    } catch (error) {
      console.log(">>> Fetch Movie By Keyword Error", error)
      setLoading(false)
    }
  }

  const onChangeSearch = (value: string) => {
    console.log(">>> value", value)
    setSearch(value)
  }

  const onKeydown = (event: any) => {
    if (event.key === 'Enter') {
      fetchMovieByKeyword()
    }
  }

  const onOpenModal = (e: any, id: number) => {
    e.stopPropagation();
    setOpenTrailerVideoModal(!openTrailerVideoModal)
    setMovieId(id)
  }

  const onChangePage = (type: string, page?: any) => {
    let paging = {...pagination}
    switch (type) {
      case 'NUMBER':
        paging.page = page
        break;
    
      case 'PREV':
        if (paging.page > 1) paging.page = paging.page - 1
        break;
    
      case 'NEXT':
        if (paging.page < 10) paging.page = paging.page + 1
        break;
    
      default:
        break;
    }
    setPagination(paging)
  }

  const modalRef = useRef(null);
  const useOutsideModal = (ref: any) => {
      useEffect(() => {
          function handleClickOutside(event: any) {
              if (ref.current && !ref.current.contains(event.target)) {
                setOpenTrailerVideoModal(false)
              }
          }

          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, [ref])
  };
  useOutsideModal(modalRef);

  return (
    <div className='search-page-container'>
      <div className='right-side'>
        <div className='filter-wrapper'>
          <Input
            type={'text'} 
            value={search} 
            placeholder={'Search by Movie name'} 
            onChange={(e: any) => onChangeSearch(e.target.value)}
            onKeydown={onKeydown}  
          />
        </div>
        {data && data.length > 0 ? (
          <div className='movie-grid'>
            {data ? data.map((item: any) => (
              <MovieCard key={item.id} data={item} onOpen={onOpenModal} layout={'grid'} />
            )) : <Loading/>}
          </div>
        ) : (
          <NotFoundData/>
        )}
        <Pagination pagination={pagination} onChangePage={onChangePage}/>
      </div>
      {openTrailerVideoModal && (
        <div ref={modalRef} >
          <VideoModal id={movieId}/>
        </div>
      )}
    </div>
  );
}
