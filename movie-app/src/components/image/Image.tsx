import * as React from 'react';
import './Image.scss'
import { IMAGE_URL } from '../../configs/contants';

export interface IImageProps {
    data: string,
    alt: string,
    customCss?: string
}

export default function Image (props: IImageProps) {
    const { data, alt, customCss } = props
    return (
        <img className={customCss ? customCss : 'image'} src={`${IMAGE_URL}${data}`} alt={alt} />
    );
}
