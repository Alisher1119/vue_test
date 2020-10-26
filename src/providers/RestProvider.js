import axios from 'axios'

var rest = {
  getData: (url) => {
    return axios.get(url)
  }
}

export default rest
