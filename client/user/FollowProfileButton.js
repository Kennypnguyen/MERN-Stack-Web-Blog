import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import {unfollow, follow} from './api-user.js'

// This component will show the follow or unfollow button depending on if the current user is already a follower of the user in the profile
export default function FollowProfileButton (props) {
    const FollowClick = () => {
        props.onButtonClick(follow)
    }
    const unfollowClick = () => {
        props.onButtonClick(unfollow)
    }
    return (<div>
        { props.following
            ? (<Button variant="contained" color="secondary"
                       onClick={unfollowClick}>Unfollow</Button>)
            : (<Button variant="contained" color="primary"
                       onClick={followClick}>Follow</Button>)
         }
    </div>)
}
FollowProfileButton.PropTypes = {
    following: PropTypes.bool.isRequired,
    onButtonClick: PropTypes.func.isRequired
}