import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post'

// Render and list of posts provided to it. This will be used for NewsFeed and Profile components
export default function Postlist (props) {
    return (
        <div style={{marginTop: '24px'}}>
        {props.posts.map((item, i ) => {
            return <Post post={item} key={i} onRemove={props.removeUpdate}/>
            })
        }
        </div>
    )
}

Postlist.propTypes = {
    posts: PropTypes.array.isRequired,
    removeUpdate: PropTypes.func.isRequired
}