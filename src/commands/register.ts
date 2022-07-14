import { GluegunCommand } from 'gluegun'
import { DappContext, registerSchema } from '@contextdao/context'

const command: GluegunCommand = {
  name: `register`,
  run: async (toolbox) => {
    const { print } = toolbox
    if (toolbox.parameters.array.length !== 3) {
      print.error
    }
    const context: DappContext = await toolbox.config.loadConfig()
    if (toolbox.parameters.first === 'schema') {
      print.info(`Register a Schema`)
      const schemaId = toolbox.parameters.second
      const schemaAddr = toolbox.parameters.third
      await registerSchema(context, schemaId, schemaAddr)
      print.highlight(`Schema ${schemaId} registered to ${schemaAddr}`)
    } else if (toolbox.parameters.first === 'datapod') {
      print.info(`Register a DataPod`)
    } else {
      print.error(`run deploy <schema|datapod> <Id> <addr>`)
    }
  },
}

module.exports = command
