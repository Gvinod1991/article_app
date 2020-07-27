import { api } from '../../services/api'

export const signupRequest = (body) => (dispatch, getState) => {

  return new Promise((resolve, reject) => {
      api({api: 'web/v1/signup',
      method: 'post', body }).then((data) => {
          resolve(data)
         
      }).catch(({ err }) => {
          reject(err)
      })
  })
}
export const loginRequest = (body) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        api({api: 'web/v1/login',
        method: 'post', body }).then((data) => {
            resolve(data)
           
        }).catch(({ err }) => {
            reject(err)
        })
    })
}
