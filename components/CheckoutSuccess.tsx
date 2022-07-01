import React from 'react'

const CheckoutSuccess = () => {
    return (
        <div className="mx-auto mt-6 w-[900px]">
            <h1 className="mb-4 font-sans text-xl font-bold text-slate-200">
                4. Hoàn tất đặt hàng
            </h1>
            <div className="flex h-fit gap-8 rounded-xl bg-slate-600/30 p-6">
                <div className="relative h-20 w-20 rounded-xl bg-slate-400"></div>
                <div>
                    <h1 className="font-sans text-xl font-bold text-pink-500">
                        {' '}
                        Chúc mừng bạn đã đặt hàng thành công!
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSuccess
