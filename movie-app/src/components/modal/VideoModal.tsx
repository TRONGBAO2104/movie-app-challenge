import React, { useEffect, useState } from 'react';
import './VideoModal.scss'
import { getVideoById } from '../../services/movie-service';
import ReactPlayer from 'react-player';
export interface IVideoModalProps {
    id: any
}

export default function VideoModal (props: IVideoModalProps) {
    const { id } = props
    const [videoList, setVideoList] = useState<any[]>([])
    const [playVideo, setPlayVideo] = useState<any>('')

    useEffect(() => {
        fetchVideoById()
    }, [id])
    
    const fetchVideoById = async () => {
        try {
            const params = {
                append_to_response: 'videos'
            }
            const result = await getVideoById(id, params)
            if (result && result.videos && result.videos.results) {
                setVideoList(result.videos.results)
                const randomVideo = Math.floor(Math.random() * result.videos.results.length)
                setPlayVideo(randomVideo)
            }
        } catch (error) {
            
        }
    }
    return (
        <div className='modal-container'>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoList[playVideo]?.key}`} />
        </div>
    );
}
