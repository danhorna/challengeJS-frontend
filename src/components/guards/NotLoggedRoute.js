import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkLogin } from '../../js/helpers';
import Loading from '../purpose/Loading'

function NotLoggedRoute(props) {
  const [state, setState] = useState({
    loading: true,
    isAuthenticated: false
  })
  const { component: Component, ...rest } = props

  useEffect(() => {
    checkLogin()
      .then(res => {
        setState({
          loading: false,
          isAuthenticated: res
        })
      })
  }, [])

  return (
    <Route
      {...rest}
      render={props =>
        state.isAuthenticated ? (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ) : (
            state.loading ? (
              <Loading />
            ) : (
                <Component {...props} />
              )
          )
      }
    />
  )
}


export default NotLoggedRoute;