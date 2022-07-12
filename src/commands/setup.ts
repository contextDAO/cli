import { GluegunCommand } from 'gluegun'
import {
  deployContext,
  initContext,
  connectWallet,
  openWallet,
  Network,
} from '@contextdao/context'

const askNetwork = {
  type: `select`,
  name: `network`,
  message: `Network`,
  choices: [`localhost`, `testnet`, `mainnet`],
}

const askWallet = {
  type: `input`,
  name: `wallet`,
  message: `path to Wallet`,
}

const askRegisty = {
  type: `input`,
  name: `registry`,
  message: `Regsitry Address (leave empty to deploy a new Regsitry)`,
}

const command: GluegunCommand = {
  name: `setup`,
  run: async (toolbox) => {
    let reg: string
    const { print } = toolbox
    print.info(`Context Setup`)
    const { network, wallet, registry } = await toolbox.prompt.ask([
      askNetwork,
      askWallet,
      askRegisty,
    ])

    const net: Network = network as Network
    if (registry.length === 0) {
      const context = await initContext({ network: net })
      await connectWallet(context, openWallet(wallet))
      await deployContext(context)
      reg = context.contextAddr
    } else reg = registry

    await toolbox.config.saveConfig(network, wallet, reg)
    print.info(reg)
  },
}

module.exports = command
