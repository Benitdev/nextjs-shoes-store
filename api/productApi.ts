import axiosClient from './axiosClient'

const productApi = {
    getAllProducts: () => axiosClient.get('/products'),
    getHomeProducts: () => axiosClient.get('/products/home'),
    getProductsFilter: (params: any) => axiosClient.get('/products', params),
    getProductDetail: (params: any) => axiosClient.get('/products/' + params),
}

export default productApi
