import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass,
    faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import Link from 'next/link'
import useDebounce from '../hooks/useDebounce'
import axios from 'axios'
import SearchItem from './SearchItem'
import { useRouter } from 'next/router'

const SearchBox: React.FC = () => {
    const [result, setResult] = useState<any>([])
    const [visible, setVisible] = useState<boolean>(true)
    const [searchText, setSearchText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const debounce = useDebounce(searchText, 500)
    useEffect(() => {
        if (debounce == '') {
            setResult([])
            return
        }
        const fetchProducts = async () => {
            console.log('c')
            setLoading(true)
            const { data } = await axios.get('/api/products', {
                params: {
                    category: 'products',
                    search: searchText,
                },
            })
            setResult(data)
            setLoading(false)
        }
        fetchProducts()
    }, [debounce])
    return (
        <div>
            <Tippy
                interactive
                visible={result.length !== 0 && visible}
                placement="bottom"
                offset={[0, 5]}
                render={(attrs) => (
                    <div
                        className="w-[400px] space-y-2 rounded-xl bg-slate-900/90 p-2 text-center text-sm"
                        tabIndex={-1}
                        {...attrs}
                    >
                        {result.map((item: any, index: number) => {
                            if (index < 7)
                                return <SearchItem item={item} key={item._id} />
                        })}
                    </div>
                )}
                onClickOutside={() => setVisible(false)}
            >
                <div className="relative flex items-center rounded-xl bg-slate-400/30 px-3 py-1 ring-sky-500 focus-within:ring-2">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="h-6 w-6"
                    ></FontAwesomeIcon>
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="group bg-transparent px-3 py-1 text-slate-200 outline-none"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onFocus={() => setVisible(true)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                console.log()
                                router.push(`/products?search=${searchText}`)
                            }
                        }}
                    />
                    {searchText && (
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="h-4 w-4 text-gray-400"
                            onClick={() => {
                                setSearchText('')
                                setResult([])
                            }}
                        ></FontAwesomeIcon>
                    )}
                </div>
            </Tippy>
        </div>
    )
}

export default SearchBox
