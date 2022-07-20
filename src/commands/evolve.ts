import { GluegunCommand } from 'gluegun'
import { DappContext } from '@contextdao/context'
import { contextContractSource } from '@contextdao/context'

const command: GluegunCommand = {
  name: `evolve`,
  run: async (toolbox) => {
    const { print } = toolbox
    const context: DappContext = await toolbox.config.loadConfig()
    print.info(`Evolve Contract`)
    console.log(context.wallet.address, contextContractSource)
    const tx = await context.arweave.createTransaction(
      { data: contextContractSource },
      context.wallet.json
    )
    tx.addTag('App-Name', 'SmartWeaveContractSource')
    tx.addTag('App-Version', '0.0.2')
    tx.addTag('Content-Type', 'application/javascript')

    await context.arweave.transactions.sign(tx, context.wallet.json)
    const evolvedContractTxId = tx.id
    console.log(evolvedContractTxId)
    await context.arweave.transactions.post(tx)
  },
}

module.exports = command
