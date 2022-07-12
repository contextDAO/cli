import { GluegunToolbox } from 'gluegun'
import {
  initContext,
  DappContext,
  Network,
  connectWallet,
  openWallet,
} from '@contextdao/context'

interface Config {
  network: string
  wallet: string
  registry: string
}

/**
 * get Home
 *
 * @param {GluegunToolbox} toolbox
 * @return {string} Home directory
 */
function getHome(toolbox: GluegunToolbox): string {
  const sep = toolbox.filesystem.separator
  const home = `${toolbox.filesystem.homedir()}${sep}.context${sep}`
  return home
}

// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
  // toolbox.config = () => {
  toolbox.config = {
    saveConfig: async (network: string, wallet: string, registry: string) => {
      const home = getHome(toolbox)
      const config: Config = { network, wallet, registry }
      toolbox.filesystem.write(`${home}config.json`, config)
      toolbox.print.info('Setup Saved')
    },
    loadConfig: async (): Promise<DappContext> => {
      const home = getHome(toolbox)
      const strConfig = toolbox.filesystem.read(`${home}config.json`)
      if (!strConfig) {
        toolbox.print.error('No config file found. Run "ctx setup"')
        process.exit(1)
      }
      const config: Config = JSON.parse(strConfig)
      const network = config.network as Network
      const context = await initContext({ network })
      await connectWallet(context, openWallet(config.wallet))
      return context
    },
  }
}
