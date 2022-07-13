import { GluegunCommand } from 'gluegun'
import { DappContext, getSchemaState } from '@contextdao/context'

const command: GluegunCommand = {
  name: `get`,
  run: async (toolbox) => {
    const { print } = toolbox
    const schemaId = toolbox.parameters.first
    const context: DappContext = await toolbox.config.loadConfig()
    print.info(`Get a Schema`)
    const state = await getSchemaState(context, schemaId)
    print.highlight(schemaId)
    print.info(`owner: ${state.contributors[0].address}`)
    print.info(`release: ${state.releaseId}`)
    print.info(`proposals: ${state.proposals.length}`)
    const release = state.releases[state.releaseId]
    release.fields.forEach((r) => {
      console.log(r)
    })
  },
}

module.exports = command
