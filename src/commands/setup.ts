import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'setup',
  run: async (toolbox) => {
    const { print } = toolbox
    await toolbox.config.saveConfig('localhost', 1)
    print.info('Context Setup')
  },
}

module.exports = command
