import { GluegunCommand } from 'gluegun'
import { DappContext, getBalance } from '@contextdao/context'

const command: GluegunCommand = {
  name: `balance`,
  run: async (toolbox) => {
    const { print } = toolbox
    const context: DappContext = await toolbox.config.loadConfig()
    print.info(`Get Balance`)
    const state = await getBalance(context, context.wallet.address)
    print.highlight(`Balance`)
    print.info(state)
  },
}

module.exports = command
