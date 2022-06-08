export default {
    title: 'Product variant',
    name: 'productVariant',
    type: 'object',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
            title: 'Price',
            name: 'price',
            type: 'number',
        },
        {
            name: 'size',
            title: 'Size',
            type: 'array',
            of: [{ type: 'number' }],
        },
        {
            title: 'Quantity',
            name: 'quantity',
            type: 'number',
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        },
    ],
}
