import { GluegunToolbox } from 'gluegun'

interface Config {
  network: string
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
  const home = `${toolbox.filesystem.homedir()}${sep}.context{sep}`
  return home
}

// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
  // toolbox.config = () => {
  toolbox.config = {
    saveConfig: async (network: string, registry: string) => {
      const home = getHome(toolbox)
      const config: Config = { network, registry }
      toolbox.filesystem.write(`${home}config.json`, config)
      // toolbox.filesystem.write(`${home}wallet.json`, wallets.evmWallet)
      toolbox.print.info('Setup Saved')
    },
  }

  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "ctx" property),
  // ctx.config.json, etc.
  // toolbox.config = {
  //   ...toolbox.config,
  //   ...toolbox.config.loadConfig("ctx", process.cwd())
  // }
}
