import Config from 'react-global-configuration'
import Axios from 'axios'
import AxiosResource from './AxiosResource'
import AuthenticationStore from '../stores/AuthenticationStore'
import Notify from './Notify'
import FileDownload from 'js-file-download'
import Version from './Version'

// Configure axios defaults for security
Axios.defaults.timeout = 30000 // 30 second timeout
Axios.defaults.withCredentials = true // Send cookies with requests

// handle 401 unauth
Axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    // unauth -> redirect login
    AuthenticationStore.RedirectLogin("unauth")
    return Promise.reject(error)
  }
  if (error.response && error.response.status === 400) {
    return Promise.reject(error)
  }
  return Promise.reject(error);
})

class Api {

  constructor() {

    let serviceBase = Config.get("apiServiceBaseUri")
    let clientBase = Config.get("clientBaseUri")

    let bigLimit = 100000

    // auth
    let getSecurityHeader = () => ({ Authorization: "Bearer " + AuthenticationStore.Principal.token })
    this.Authentication = {
      login(type, credentials) {
        let config = { crossDomain: true, headers: { 'content-type': 'application/x-www-form-urlencoded' } }
        switch (type) {
          case "password":
            // Properly encode credentials to handle special characters
            const params = new URLSearchParams()
            params.append('grant_type', 'password')
            params.append('username', credentials.userName)
            params.append('password', credentials.password)
            return Axios.post(`${serviceBase}token`, params.toString(), config)
          case "id_token":
            const tokenParams = new URLSearchParams()
            tokenParams.append('grant_type', 'id_token')
            tokenParams.append('id_token', credentials.id_token)
            return Axios.post(`${serviceBase}token`, tokenParams.toString(), config)
          default:
            return Promise.reject(new Error('Invalid authentication type'))
        }
      },
      forgotPassword(userName) { return Axios.post(`${serviceBase}api/account/forgotpassword`, { UserName: userName }); },
      externalInfo() { return Axios.get(`${serviceBase}api/AuthInstance`, { headers: getSecurityHeader() }) },
      versionCheck() {
        return Axios.get(`${clientBase}version.json`)
          .then((resp) => {
            let newVersionAvailable = resp.data.version !== Version
            return newVersionAvailable
          })
          .catch(() => false)
      },
    }

    // entities
    this.Example = new AxiosResource({ url: `${serviceBase}api/Examples`, idName: "ExampleID", params: { } })

    this.AppUsers = new AxiosResource({ url: `${serviceBase}api/AppUsers`, idName: "AppUserID", params: { } })
    this.AppRoles = new AxiosResource({ url: `${serviceBase}api/AppRoles`, idName: "AppRoleID" })
    this.AppUsers.ChangePassword = (oldPassword, newPassword, confirmNewPassword) => {
      return Axios.post(`${serviceBase}api/Account/ChangePassword`, { OldPassword: oldPassword, Password: newPassword, ConfirmPassword: confirmNewPassword }, { headers: getSecurityHeader() });
    }
    this.AppUsers.ValidatePassword = (password) => {
      return Axios.post(`${serviceBase}api/Account/ValidatePassword`, { Password: password })
    }

    // cancel token
    this.GetCancelToken = () => {
      return Axios.CancelToken.source()
    }

  }
}

export default new Api()