import React, { useEffect, useRef, useState } from 'react';
import './index.scss'
import Sidebar from './components/sidebar/Sidebar';
import { getMovieList } from '../../services/movie-service';
import { IPagination } from '../../models/pagination';
import Loadable from 'react-loadable';
import Loading from '../../components/loading/Loading';
import { useNavigate } from 'react-router-dom';
import VideoModal from '../../components/modal/VideoModal';
import Pagination from '../../components/pagination/Pagination';
import { getGenresMovie, getMovieDiscover } from '../../services/global-service';
import MultipleCheckbox from '../../components/filter/multipleCheckbox/MultipleCheckbox';
export interface IHomepageProps {
}

const MovieCard = Loadable(
  {
      loader: () => import('./components/card/MovieCard'),
      loading: () => <Loading />,
      render(loaded: any, props: any) {
          const Alerts = loaded.default;
          return <Alerts {...props} />
      }
  }
);

const Input = Loadable(
  {
      loader: () => import('../../components/filter/input/Input'),
      loading: () => <Loading />,
      render(loaded: any, props: any) {
          const Alerts = loaded.default;
          return <Alerts {...props} />
      }
  }
);

export default function Homepage (props: IHomepageProps) {
  const navigate = useNavigate()
  const [movieId, setMovieId] = useState<number | undefined>(undefined)
  const [layouts, setLayouts] = useState<any[]>([
    {
      key: 'list',
      class: 'bi-view-list'
    },
    {
      key: 'grid',
      class: 'bi-grid'
    },
  ])
  const [currentLayout, setCurrentLayout] = useState<string>('grid')
  const [data, setData] = useState<any[]>([])
  const [genres, setGenres] = useState<any[]>([])
  const [collapse, setCollapse] = useState<any>({
    menu: false,
    genres: false
  })
  const [tabs, setTabs] = useState<any[]>([
    {
      id: 1,
      path: 'popular',
      name: 'Popular'
    },
    {
      id: 2,
      path: 'now_playing',
      name: 'Now Playing'
    },
    {
      id: 3,
      path: 'top_rated',
      name: 'Top Rated'
    },
    {
      id: 4,
      path: '',
      name: 'Discover'
    },
  ])
  const [filter, setFilter] = useState<any>({
    genres: [],
    isCheckedAllGenres: false
  })
  const [currentTab, setCurrentTab] = useState<number>(1)
  const [apiPath, setApiPath] = useState<string>('popular')
  const [keyword, setKeyword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    total: 0
  })
  const [openTrailerVideoModal, setOpenTrailerVideoModal] = useState<boolean>(false)

  useEffect(() => {
    fetchGenres()
  }, [])
  
  useEffect(() => {
    fetchMovieList(apiPath, filter)
  }, [apiPath, pagination.page, filter])

  const fetchMovieList = async (apiPath: string, filter: any) => {
    setLoading(true)
    try {
      let result
      const { page } = pagination
      let params: any = {
        page: page
      }
      if (currentTab !== 4) {
        result = await getMovieList(params, apiPath)
      } else {
        if (filter) {
          if (filter.genres && filter.genres.length) {
            params[`with_genres`] = filter.genres.join()
            
          }
        }
        result = await getMovieDiscover(params)
      }
      
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
      console.log(">>> Fetch Movie List Error", error)
      setLoading(false)
    }
  }

  const fetchGenres = async () => {
    try {
      const result = await getGenresMovie()
      if (result && result.genres) {
        const newGenres = result.genres.map((data: any) => ({
          ...data,
          isChecked: false
        }))
        setGenres(newGenres)
      }
    } catch (error) {
      console.log(">>> Fetch Genres Error", error)
    }
  }

  const onChangeTab = (id: number, path: string) => {
    setCurrentTab(id)
    setApiPath(path)
    setPagination({
      ...pagination,
      page: 1
    })
  }

  const onChangeSearch = (value: string) => {
    setKeyword(value)
  }

  const onKeydown = (event: any) => {
    if (event.key === 'Enter') {
      navigate(`/search?keyword=${keyword}`)
    }
  }

  const onOpenModal = (e: any, id: number) => {
    e.stopPropagation();
    setOpenTrailerVideoModal(!openTrailerVideoModal)
    setMovieId(id)
  }

  const onChangeLayout = (layout: string) => {
    setCurrentLayout(layout)
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

  const onChangeCheck = (e: any, data: any, type: string) => {
    var filterData = {...filter}
    switch (type) {
      case 'GENRES':
        var newData = (genres || []).map((item: any) => {
          if (data.id === item.id) {
              item.isChecked = item.isChecked ? false : true;
              if (item.isChecked) {
                if (!filterData['genres'].includes(item.id)) {
                  filterData["genres"].push(item.id);
                }
              } else {
                  filterData["isCheckedAllGenres"] = false;
              }
            } 
            return item;
          });
        setGenres(newData);
        break;
    
      default:
        break;
    }
    setFilter(filterData);
  }

  const onChangeCheckAll = (e: any, type: string) => {
    var filterData = {...filter}
    switch (type) {
      case "GENRES":
        filterData["isCheckedAllGenres"] = !filterData["isCheckedAllGenres"];
        filterData["genres"] = [];
        var newData = (genres || []).map((item: any) => {
          item.isChecked = filterData["isCheckedAllGenres"] ? true : false;
          if (item.isChecked) {
              filterData["genres"].push(item.id);
          }
          return item;
        });
        setGenres(newData);
      break;
        break;
    
      default:
        break;
    }
    setFilter(filterData);
  }

  const onCollapse = (field: string) => {
    var collapseData = {...collapse};
    collapseData[field] = !collapse[field];
    setCollapse(collapseData);
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

  const collapseRef = useRef(null);
    const useOutsideCollapse = (ref: any) => {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setCollapse("")
                }
            }
            
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref])};
    useOutsideCollapse(collapseRef);
  
  return (
    <div className={`${currentTab !== 4 ? 'homepage-container-special' : 'homepage-container'}`}>
      {currentTab === 4 && (
        <div className='left-side'>
          <Sidebar data={genres} type={"GENRES"} checkAll={filter.isCheckedAllGenres} onChangeCheck={onChangeCheck} onChangeCheckAll={onChangeCheckAll}/>
          {/* <MultipleCheckbox data={genres} type={"GENRES"} checkAll={filter.isCheckedAllGenres} onChangeCheck={onChangeCheck} onChangeCheckAll={onChangeCheckAll}/> */}
        </div>
      )}
      <div className='right-side'>
        <div className='filter-wrapper'>
          <div className='tab-container'>
            {tabs.map((tab) => (
              <div className="tabs" onClick={() => onChangeTab(tab.id, tab.path)}>
                  <div className={currentTab === tab.id ? "tab-item active remove-text-transform" : "tab-item remove-text-transform"}>
                      {tab.name} 
                  </div>
                  <div className="line"></div>
              </div>
            ))}
          </div>
          <Input 
            type={'text'} 
            value={keyword} 
            placeholder={'Search by Movie name'} 
            onChange={(e: any) => onChangeSearch(e.target.value)}
            onKeydown={onKeydown}  
          />
        </div>
        <div className='layout-icon-container'>
          <i onClick={() => onCollapse('menu')} className="menu-icon bi bi-list"></i>
          <div className='layout-style-wrapper'>
            {layouts.map((layout: any) => (
              <i onClick={() => onChangeLayout(layout.key)} key={layout.key} className={`icon bi ${layout.class} ${layout.key === currentLayout ? 'active' : ''}`}></i>
            ))}
          </div>
          {collapse && collapse.menu ? (
            <div className='dropdown-container' ref={collapseRef}>
              {tabs.map((tab: any) => (
                <div onClick={() => onChangeTab(tab.id, tab.path)} className={`tab ${currentTab === tab.id ? "tab-active" : ""}`}>{tab.name}</div>
              ))}
            </div>
          ) : null}
        </div>
        {currentTab === 4 ? (
          <div className='filter-container'>
            <div className='filter-dropdown' onClick={() => onCollapse('genres')}>
              <div>Genres</div>
              <i className="bi bi-chevron-down"></i>
            {collapse && collapse.genres ? (
              <MultipleCheckbox collapseRef={collapseRef} data={genres} type={"GENRES"} checkAll={filter.isCheckedAllGenres} onChangeCheck={onChangeCheck} onChangeCheckAll={onChangeCheckAll}/>
            ) : null}
            </div>
          </div>
        ) : null}
        <div className={`${currentLayout === 'list' ? 'movie-list' : 'movie-grid'}`}>
          {data ? data.map((item: any) => (
            <MovieCard key={item.id} data={item} onOpen={onOpenModal} layout={currentLayout} />
          )) : <Loading/>}
        </div>
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
