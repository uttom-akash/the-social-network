import React from 'react'
import User from '../card/User'
import {WindowScroller,List,CellMeasurer,CellMeasurerCache} from 'react-virtualized'
import {withRouter} from 'react-router-dom'
const width = window.innerWidth>380 ? 380 : window.innerWidth;


class UserListing extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
             user:[]
        }

        this.overscanRowCount=7
        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 100
          });
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
          console.log("changed in props");
            
          this.overscanRowCount = 15 ^ this.overscanRowCount;
        }
      };


    unFollow=(id,index)=>this.props.unfollow(id,index)
    
    follow=(id,index)=>this.props.follow(id,index)
    
    onClick=(path)=>this.props.history.push("/")
    rowRender=({ index, key, style, parent })=>{
        const {user}=this.props
        let item=user[index];
        let btnText=item['following'] ? "Unfollow" : 'Follow';
        return (
            <CellMeasurer 
                key={key}
                cache={this.cache}
                parent={parent}
                index={index}>
                    {({measure})=>(
                        <div style={style}>
                        <User
                            proPic={item['proPic']}
                            userName={item['userName']}
                            userId={item['_id']}
                            btnText={item['following'] ? "Unfollow" : 'Follow'}
                            onFollow={()=>item['following'] ? this.unFollow(item['_id'],index) : this.follow(item['_id'],index)}
                            onClick={(path)=>this.props.history.push(path)}
                            measure={measure}
                        />
                        </div>
                    )}
                    
            </CellMeasurer>
          
        );
    }

    render(){
        const {user}=this.props

        return (
               <WindowScroller>
                     {({height,scrollTop }) => (
                        <List
                            autoHeight
                            scrollTop={scrollTop}
                            deferredMeasurementCache={this.cache}
                            width={width}
                            height={height}
                            rowHeight={this.cache.rowHeight}
                            rowRenderer={this.rowRender}
                            rowCount={user.length}
                            overscanRowCount={this.overscanRowCount}
                        />

                          )}
                </WindowScroller>
        )
    }
}

export default withRouter(UserListing);