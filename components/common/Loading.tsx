import React from 'react'
import { css } from '@emotion/react'
import { PropagateLoader } from 'react-spinners'

const override = css`
    display: block;
    margin: 0 auto;
`

const Loading = ({ children }: any) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center bg-black/50">
            <PropagateLoader
                color={'#F5A623'}
                loading={true}
                css={override}
                size={30}
            />
        </div>
    )
}

export default Loading
