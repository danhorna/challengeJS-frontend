import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkLogin } from '../../js/helpers';

function LoggedRoute(props) {
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
          <Component {...props} />
        ) : (
            state.loading ? (
              <div>LOADING</div>
            ) : (
                <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
              )
          )
      }
    />
  )
}


export default LoggedRoute;