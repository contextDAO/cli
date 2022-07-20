import { GluegunCommand } from 'gluegun'
import { DappContext, deployContext, deploySchema } from '@contextdao/context'
import { humanState } from '../schemas/human'

const command: GluegunCommand = {
  name: `deploy`,
  run: async (toolbox) => {
    const { print } = toolbox

    const context: DappContext = await toolbox.config.loadConfig()
    if (toolbox.parameters.first === 'schema') {
      print.info(`Deploy a Schema`)
      const schemaAddr = await deploySchema(context, humanState)
      print.highlight(`Schema deployed to ${schemaAddr}`)
    } else if (toolbox.parameters.first === 'datapod') {
      print.info(`Deploy a DataPod`)
    } else if (toolbox.parameters.first === 'context') {
      print.info(`Evolve Context`)
      const addr = await deployContext(context)
      print.info(`New tx = ${addr}`)
    } else {
      print.error(`Usage: ctx deploy schema|datapod`)
    }
  },
}

module.exports = command
