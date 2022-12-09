import axiosClient from './axiosClient'

const cartApi = {
    checkCoupon: (params: any) => axiosClient.post('/cart/coupon', params),
    checkQuantity: (params: any) => axiosClient.post('/cart/check', params),
}

export default cartApi