import debug from 'debug'
import DFP from '@afuggini/node-google-dfp'
import { google } from 'googleapis'
import { promisify } from 'es6-promisify'

interface APIConfig {
  networkCode: string
  appName: string
  apiVersion: string
  serviceAccount: string
  keyfilePath?: string
  keyData?: string
}

export default class {
  public DFP
  public DFPUser
  public call
  constructor (config: APIConfig) {
    const { networkCode, appName, apiVersion, serviceAccount, keyfilePath, keyData } = config
    const DFPUser = new DFP.User(networkCode, appName, apiVersion)
    const jwtClient = new google.auth.JWT(serviceAccount, keyfilePath, keyData, ['https://www.googleapis.com/auth/dfp'])
    DFPUser.setClient(jwtClient)
    this.DFP = DFP
    this.DFPUser = DFPUser
    this.call = this.callServiceMethodWithPayload
  }
  async callServiceMethodWithPayload (Service, Method, payload) {
    try {
      debug('app:dfp:request')(`${Service} > ${Method}`)
      const service = await new Promise(
        (resolve, reject) => this.DFPUser.getService(Service, (error, dfpService) => error ? reject(error) : resolve(dfpService))
      )
      const method = promisify(service[Method])
      const { rval: result } = await method(payload)
      debug('app:dfp:response')('%o', result)
      return result
    } catch (error) {
      debug('app:dfp:error')(`${error.name}: ${error.message}`)
      throw error
    }
  }
}
