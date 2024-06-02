import * as React from 'react';
import './Input.scss'

export interface IInputProps {
    type: string,
    value: string,
    placeholder: string,
    onChange: any,
    onKeydown: any
}

export default function Input (props: IInputProps) {
    const { type, value, placeholder, onChange, onKeydown } = props
    return (
        <input className='search-container' type={type} value={value} placeholder={placeholder} onChange={onChange} onKeyDown={onKeydown} />
    );
}
