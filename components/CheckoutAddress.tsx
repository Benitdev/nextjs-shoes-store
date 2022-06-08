import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useForm } from 'react-hook-form'

const CheckoutAddress = ({
    session,
    setAddressForm,
    setCheckoutStage,
}: any) => {
    const [provinces, setProvinces] = useState<any>([])
    const [districts, setDistricts] = useState<any>([])
    const [wards, setWards] = useState<any>([])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm()

    const [provinceCode, districtCode, wardCode] = watch([
        'province',
        'district',
        'ward',
    ])
    useEffect(() => {
        const fetchProvinces = async () => {
            const { data } = await axios.get('/api/address/provinces')
            setProvinces(data)
        }
        fetchProvinces()
    }, [])
    useEffect(() => {
        const fetchDistricts = async () => {
            const { data } = await axios.post('/api/address/district', {
                provinceCode,
            })
            setDistricts(data)
        }
        fetchDistricts()
    }, [provinceCode])
    useEffect(() => {
        const fetchWards = async () => {
            const { data } = await axios.post('/api/address/ward', {
                districtCode,
            })
            setWards(data)
        }
        fetchWards()
    }, [districtCode, provinceCode])
    const onSubmit = (data: any) => {
        const province = provinces.find(
            (province: any) => province.code == data.province
        )
        const district = districts.find(
            (district: any) => district.code == data.district
        )
        const ward = wards.find((ward: any) => ward.code == data.ward)
        setAddressForm({
            ...data,
            province: province.name,
            district: district.name,
            ward: ward.name,
        })
        setCheckoutStage(2)
    }
    return (
        <div className="mx-auto mt-6 w-[900px]">
            <h1 className="font-sans text-xl font-bold text-slate-200">
                2. Điền địa chỉ giao hàng
            </h1>
            <form
                className="mx-auto w-[800px] space-y-8 py-6 px-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex justify-between">
                    <div>
                        <label
                            htmlFor=""
                            className="inline-block w-24 font-serif text-base font-bold text-slate-200"
                        >
                            {' '}
                            Họ tên{' '}
                            <span className="text-xl text-red-500">
                                *
                            </span>:{' '}
                        </label>
                        <input
                            value={`${session?.user?.name}`}
                            type="text"
                            className="ml-4 border-b-2 border-slate-400 bg-transparent px-4 text-slate-300 outline-none"
                            {...register('name')}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <label
                            htmlFor=""
                            className="inline-block w-24 font-serif font-bold text-slate-200"
                        >
                            {' '}
                            Email{' '}
                            <span className="text-xl text-red-500">
                                *
                            </span>:{' '}
                        </label>
                        <input
                            value={`${session?.user?.email}`}
                            type="text"
                            className="ml-4 border-b-2 border-slate-400 bg-transparent px-4 text-slate-300 outline-none"
                            {...register('email', {
                                pattern:
                                    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            })}
                        />
                    </div>
                    <div className="relative">
                        <label
                            htmlFor=""
                            className="font-serif font-bold text-slate-200"
                        >
                            {' '}
                            Số điện thoại{' '}
                            <span className="text-xl text-red-500">
                                *
                            </span>:{' '}
                        </label>
                        <input
                            type="text"
                            className="ml-4 w-36 border-b-2 border-slate-400 bg-transparent px-4 text-slate-300 outline-none"
                            {...register('phone', {
                                pattern: /^[0-9]+$/,
                            })}
                            required
                        />
                        {errors.phone?.type === 'pattern' && (
                            <small className="absolute top-[130%] w-max -translate-x-full text-red-600">
                                {' '}
                                SDT không hợp lệ!
                            </small>
                        )}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor=""
                        className="inline-block w-24 font-serif font-bold text-slate-200"
                    >
                        {' '}
                        Địa chỉ: <span className="text-xl text-red-500">*</span>
                        :{' '}
                    </label>
                    <input
                        type="text"
                        className="ml-4 border-b-2 border-slate-400 bg-transparent px-4 text-slate-300 outline-none"
                        placeholder="Ví dụ: 260 Bạch Đằng"
                        {...register('address')}
                        required
                    />
                </div>
                <div className="flex justify-between text-slate-200">
                    <div>
                        <label htmlFor=""> Tỉnh/thành: </label>
                        <select
                            className="ml-3 h-6 w-32 truncate text-sm text-slate-900 
                        "
                            {...register('province')}
                        >
                            <option value="">Chọn tỉnh thành</option>
                            {provinces.map((province: any) => (
                                <option
                                    key={province.code}
                                    value={province.code}
                                    className="text-sm text-slate-800"
                                >
                                    {province.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor=""> Quận/huyện: </label>
                        <select
                            className="ml-3 h-6 w-max text-sm text-slate-900 "
                            {...register('district')}
                        >
                            <option value="">Chọn quận huyện</option>
                            {districts.map((district: any) => (
                                <option
                                    key={district.code}
                                    value={district.code}
                                    className="text-sm text-slate-800"
                                >
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor=""> Phường/xả: </label>
                        <select
                            className="ml-3 h-6 w-36 truncate text-sm text-slate-900"
                            {...register('ward')}
                        >
                            <option value="">Chọn phường/xả</option>
                            {wards.map((ward: any) => (
                                <option
                                    key={ward.code}
                                    value={ward.code}
                                    className="text-sm text-slate-800"
                                >
                                    {ward.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    className="mx-auto !mt-14 block rounded-xl bg-sky-600 px-6 py-2 font-bold transition hover:scale-110 hover:text-slate-200"
                    type="submit"
                >
                    {' '}
                    Giao Đến Địa Chỉ Này{' '}
                </button>
            </form>
        </div>
    )
}

export default CheckoutAddress
