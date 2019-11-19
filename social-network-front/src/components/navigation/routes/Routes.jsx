import React from 'react'
import {Switch,Route} from 'react-router-dom'
import TimeLine from '../../page/timeline/TimeLine'
import Profile from '../../page/profile/Profile'
import Login from '../../page/login/Login'
import ProfileForm from '../../forms/profile/ProfileForm'
import DiscoverPeople from '../../page/discover/DiscoverPeople'
import ConfirmEmail from '../../page/confirm email/ConfirmEmail'
import ProfileAsViewer from '../../page/profile/ProfileAsViewer'
import ResendEmail from '../../forms/resend email/ResendEmail'

export default ()=>{
    return (
        <Switch>
            <Route path="/" exact component={TimeLine} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/login" exact component={Login} />
            <Route path="/update-profile" exact component={ProfileForm}/>
            <Route path="/discover-people" exact component={DiscoverPeople}/>
            <Route path="/confirm-email/:id/:code" exact component={ConfirmEmail}/>
            <Route path="/profile-view/:userId" exact component={ProfileAsViewer}/>
            <Route path="/resend-email" exact component={ResendEmail}/>
            
        </Switch>
    )
}
