import {
    faBell,
    faBellSlash,
    faCircleXmark,
    faGear,
    faMagnifyingGlass,
    faNoteSticky,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import LoadingIcon from '../common/LoadingIcon'

type Props = {}

const AdminHeader = (props: Props) => {
    const { data: session } = useSession()
    const [searchText, setSearchText] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <div className="flex h-[100px] items-center justify-between px-10">
            <div className="relative flex items-center rounded-xl bg-slate-400/30 px-3 py-1 shadow-md shadow-shop-orange/10 ring-shop-orange focus-within:ring-2">
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
                            // router.push(`/products?search=${searchText}`)
                        }
                    }}
                />
                {searchText && !loading && (
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="absolute right-3 h-4 w-4 cursor-pointer text-shop-orange"
                        onClick={() => {
                            setSearchText('')
                            // setResult([])
                        }}
                    ></FontAwesomeIcon>
                )}
                {loading && (
                    <div className="absolute right-3 h-4 w-4 cursor-pointer text-shop-orange">
                        <LoadingIcon />
                    </div>
                )}
            </div>
            <div className="flex items-center gap-4 text-slate-100">
                <button
                    className={`flex items-center gap-2 rounded-2xl bg-black/50 p-1 pr-3 `}
                >
                    <div className="relative h-8 w-8 overflow-hidden rounded-xl">
                        {session?.user?.image ? (
                            <Image
                                src={`${session?.user?.image}`}
                                layout="fill"
                            />
                        ) : (
                            ''
                        )}
                    </div>
                    <small>{session?.user?.name}</small>
                </button>
                <FontAwesomeIcon
                    icon={faBell}
                    className="h-6 w-6"
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                    icon={faGear}
                    className="h-6 w-6"
                ></FontAwesomeIcon>
            </div>
        </div>
    )
}

export default AdminHeader
