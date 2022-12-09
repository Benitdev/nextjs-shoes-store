import bcrypt from 'bcryptjs'

const productsName = [
    "Nike Air Force 1 '07 Craft",
    'Nike Air Zoom Pegasus 38',
    'Nike Air Max 97 SE',
    'Nike Dunk High Retro SE',
    'Nike Air Max Terrascape 90',
    'Nike Overbreak',
    'Nike Dunk Low Retro',
    'Air Jordan 1 Retro',
    'Air Jordan Mid',
    'Nike Dunk High Retro',
    'Nike Air Kukini SE',
    'Nike Blazer Mid',
    'Nike Air Trainer',
    'Nike Air Max',
    'Kyrie Infinity',
    'Nike Zoom Freak 3',
    'Jordan One Take',
    'Nike Precision',
    'LeBron 19',
    'Nike Zion',
    'Nike Jordan One Take',
    'Nike Precision By You',
    'Nike Impact',
    'Nike Faker',
    'Nike Air Max 90',
    'Nike Flex Runner 2 Lil',
    'Nike Presto x Hello Kitty',
    'Nike Air Dawn',
    'Nike Force 1 LV8',
    'Nike Air Max 90 LTR SE',
    'Air Jordan 5 Retro',
    'Nike MD Valiant SE',
    'Nike Air Max Motif',
    'Jordan 1 Low Alt',
    'Jordan Why Not? Zer0.5',
    'Jordan Why Not? Zer7.5',
    'Jordan 9 Low Alt',
    'Nike Jr. Tiempo Legend 9 Academy MG',
    'Nike Jr. Tiempo Legend 9 MG',
    'Nike Air Force 1 LV8 Next Nature',
    'Nike Air Force 1 LV8 Nature',
    'Nike Air Max 99',
    'Nike Jr. Phantom GT2 Academy Dynamic Fit TF',
]
const sizes = [
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
    44, 45,
]
const categories = ['men', 'women', 'kid', 'sales']
const childrenCategories = [
    'sneaker',
    'life style',
    'jordan',
    'football',
    'training & gym',
]
let products = []
for (let i = 13; i <= 55; i++) {
    const product = {
        name: productsName[i - 13],
        slug: productsName[i - 13].replaceAll(' ', '-').toLowerCase(),
        category: categories[Math.floor(Math.random() * 4)],
        childrenCategory: childrenCategories[Math.floor(Math.random() * 5)],
        imageDefault: `id${i}.jpg`,
        images: [
            `id${i}-1.jpg`,
            `id${i}-2.jpg`,
            `id${i}-3.jpg`,
            `id${i}-4.jpg`,
            `id${i}-slide.jpg`,
        ],
        isSlide: i == 25 || i == 51 || i == 52 ? true : false,
        isFeatured: i % 2 == 0 ? true : false,
        price: Math.floor(Math.random() * 3000000) + 2000000,
        views: 10,
        rating: 4.5,
        numReviews: 10,
        countInStock: sizes.map((size) => {
            const index = Math.floor(Math.random() * 20) + 25
            const index1 = Math.floor(Math.random() * 20) + 25
            const index2 = Math.floor(Math.random() * 20) + 25
            const index3 = Math.floor(Math.random() * 20) + 25
            return {
                size,
                count:
                    size !== index1 &&
                    size !== index &&
                    size !== index2 &&
                    size !== index3
                        ? Math.floor(Math.random() * 1000)
                        : 0,
            }
        }),
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, minima nulla? Dolore, perferendis. Laudantium ad architecto dignissimos animi rem ex alias non recusandae, maiores vitae, officiis magni quae illum quis?',
    }
    products.push(product)
}
const data = {
    users: [
        {
            name: 'John',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Jane',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
    ],
    coupons: [
        {
            name: 'thiendepchai',
            code: 'thiendepchai',
            type: 0,
            value: '999999',
            expires: '',
        },
        {
            name: 'quanxautrai',
            code: 'quanxautrai',
            type: 0,
            value: '99999',
            expires: '',
        },
        {
            name: 'duylinhnghien',
            code: 'duylinhnghien',
            type: 1,
            value: 10,
            expires: '',
        },
    ],
    products,
}
export default data
