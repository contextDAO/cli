import { GluegunCommand } from 'gluegun'
import { DappContext, evolveContext } from '@contextdao/context'

const command: GluegunCommand = {
  name: `evolve`,
  run: async (toolbox) => {
    const { print } = toolbox
    if (!toolbox.parameters.first) {
      print.error(`A txId is needed`)
    } else {
      const context: DappContext = await toolbox.config.loadConfig()
      print.info(`Evolve Contract`)
      await evolveContext(context, toolbox.parameters.first)
    }
  },
}

module.exports = command
