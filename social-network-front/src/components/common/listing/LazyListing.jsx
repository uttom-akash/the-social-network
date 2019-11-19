import React from 'react'
import Post from '../card/CustomPost'
import {WindowScroller,List,CellMeasurer,CellMeasurerCache,AutoSizer} from 'react-virtualized'
import feedApi from '../../../api/FeedManagement'
import  './LazyListing.css'

const width = window.innerWidth>475 ? 475 : window.innerWidth;

class LazyListing extends React.Component{
    constructor(props) {
        super(props)

        this.state={
            posts:[]
        }

        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 400
          });
    }


    componentWillMount=()=>{
        const {posts,userId}=this.props
        this.setState({posts,userId})
    }

    componentWillReceiveProps=(nextProps)=>{
            const {posts,userId}=nextProps
            this.setState({posts,userId})
    }

   

    onStar=(rating,index)=>{

        let allPosts=[...this.state.posts]
        let modifiedPost=allPosts[index]
        let {userId}=this.props
        let myRating={userId,numberOfStars:rating}
        
        feedApi.starPost({postId:modifiedPost._id,rating:myRating}).then(resp=>{
            modifiedPost.ratings.push({userId,numberOfStars:rating})
            modifiedPost.totalStars=modifiedPost.totalStars+rating
            modifiedPost.myIndex=modifiedPost.ratings.length-1
            
            allPosts[index]=modifiedPost

            this.overscanRowCount = 15 ^ this.overscanRowCount;
            this.setState({posts:allPosts})
        })
    }

    onUnstar=(index)=>{
        let {userId}=this.props
        let allPosts=[...this.state.posts]
        let post=allPosts[index]

        feedApi.unstarPost({postId:post._id ,userId}).then(resp=>{

            post.totalStars=post.totalStars - post.ratings[post.myIndex].numberOfStars
            post.myIndex= - 10

            allPosts[index]=post

            this.overscanRowCount = 15 ^ this.overscanRowCount;
            this.setState({posts:allPosts})
        })
    }
    

   
        

    onUpdatePost=(data,index)=>{
        let posts=[...this.state.posts]
        let post=posts[index]
        
        post.images=data.images 
        post.description=data.description

        posts[index]=post 
        this.setState({posts})
        this.props.onUpdate(data)
        this.overscanRowCount = 15 ^ this.overscanRowCount;
    }

    rowRender=({ index, key, style, parent })=>{
        const {posts,userId}=this.state
        let item=posts[index];

        return (
            <CellMeasurer 
                key={key}
                cache={this.cache}
                parent={parent}
                index={index}>
                    {({measure})=>(
                        <div style={style}>
                        <Post
                        post={item}
                        userId={userId}   
                        measure={measure}
                        onStar={(rating)=>this.onStar(rating,index)}
                        onUnstar={()=>this.onUnstar(index)}
                        onUpdate={(data)=>this.onUpdatePost(data,index)}
                        />
                        </div>
                    )}
                    
            </CellMeasurer>
          
        );
    }


    render(){
        const {posts}=this.state

        return (
            <div className={'list'} >
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
                            rowCount={posts.length}
                            overscanRowCount={this.overscanRowCount}
                        />

                          )}
                </WindowScroller>
            </div>
        )
    }
}

export default LazyListing;