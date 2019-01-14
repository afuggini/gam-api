import AdManager from '.'

;(async () => {
  try {
    const adManager = new AdManager({
      networkCode: '0000000',
      appName: 'Test',
      apiVersion: 'v201808',
      serviceAccount: 'service-account@project-name.iam.gserviceaccount.com',
      // keyfilePath: '/path/to/key.json',
      keyData: 'PRIVATE KEY HERE'
    })
    const res = await adManager.callServiceMethodWithPayload(
      'InventoryService',
      'getAdUnitsByStatement',
      new adManager.DFP.Statement('LIMIT 10')
    )
    return res
  } catch (error) {
    throw error
  }
})()
