import { GluegunCommand } from 'gluegun'
import { DappContext, getBalance} from '@contextdao/context'

const command: GluegunCommand = {
  name: `get`,
  run: async (toolbox) => {
    const { print } = toolbox
    const context: DappContext = await toolbox.config.loadConfig()
    print.info(`Get Balance`)
    // @ts-ignore
    const state = await getBalance(context)
    print.highlight(`Balance`)
    print.info(state)
  },
}

module.exports = command
