import React from 'react'
import {Rating} from 'semantic-ui-react'

export default ({onRate,onLeaveStar})=>{
    return (
        <React.Fragment>
           {
                <div onMouseLeave={onLeaveStar}
                  style={{backgroundColor:'white'}} >
                    <Rating defaultRating={0} maxRating={5} size="huge" onRate={onRate}/> 
                </div>
           }
        </React.Fragment>
    )
}
