import React, { useEffect, useState } from 'react';
import './Pagination.scss'
import { IPagination } from '../../models/pagination';
export interface IPaginationProps {
    pagination: IPagination,
    onChangePage: any
}

export default function Pagination (props: IPaginationProps) {
    const { pagination, onChangePage } = props
    const [pageNumbers, setPageNumbers] = useState<any[]>([])
    const [pageInput, setPageInput] = useState<number | undefined>()
    useEffect(() => {
        generatePageNumber()
    }, [])
    
    const generatePageNumber = () => {
        const pageNumbers: number[] = []
        for (let i = 1; i <= 10; i++) {
            pageNumbers.push(i)
        }
        setPageNumbers(pageNumbers)
    }

    const onChangePageInput = async (value: number) => {
        let realValue = Number(value)
        if (value < 0) {
            realValue = 1
        } else if (value > 10) {
            realValue = 10
        }
        setPageInput(realValue)
        await onChangePage('NUMBER', realValue)
    }

    return (
        <div className='pagination-container'>
            <div className='wrapper-number'>
                {pageNumbers.map((page: any, index: number) => (
                    <div onClick={() => onChangePage('NUMBER', page)} className={`number ${pagination.page === page ? 'active' : ''}`} key={index}>{page}</div>
                ))}
            </div>
            <div className='wrapper-button'>
                <div className='number' onClick={() => onChangePage('PREV')}>PREV</div>
                <div className='wrapper-input-page'>
                    <span>Go to page: </span>
                    <input className='input-page' type="number" min={1} max={10} value={pageInput} onChange={(e: any) => onChangePageInput(e.target.value)} />
                </div>
                <div className='number' onClick={() => onChangePage('NEXT')}>NEXT</div>
            </div>
        </div>
    );
}
