import { GluegunCommand } from 'gluegun'
import { DappContext, createSchema } from '@contextdao/context'
import { humanState } from '../schemas/human'

const command: GluegunCommand = {
  name: `create`,
  run: async (toolbox) => {
    const { print } = toolbox
    const context: DappContext = await toolbox.config.loadConfig()
    print.info(`Create a Schema`)
    console.log(context)
    await createSchema(context, `Human`, humanState)
  },
}

module.exports = command
