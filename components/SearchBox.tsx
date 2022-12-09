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
import LoadingIcon from './common/LoadingIcon'
import productApi from '../api/productApi'

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
            setLoading(true)
            const data: any = await productApi.getProductsFilter({
                params: {
                    search: searchText,
                },
            })
            setResult(data.products)
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
                <div className="relative flex items-center rounded-xl bg-slate-400/30 px-3 py-1 ring-shop-orange focus-within:ring-2">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="h-6 w-6 text-shop-orange/70"
                    ></FontAwesomeIcon>
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="group bg-transparent px-3 py-1 text-shop-orange outline-none"
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
                    {searchText && !loading && (
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="absolute right-3 h-4 w-4 cursor-pointer text-shop-orange"
                            onClick={() => {
                                setSearchText('')
                                setResult([])
                            }}
                        ></FontAwesomeIcon>
                    )}
                    {loading && (
                        <div className="absolute right-3 h-4 w-4 cursor-pointer text-shop-orange">
                            <LoadingIcon />
                        </div>
                    )}
                </div>
            </Tippy>
        </div>
    )
}

export default SearchBox
