import fetch from 'isomorphic-fetch'

export default class {
  static async getData() {
    const res = await fetch('//jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    return data
  }
}
