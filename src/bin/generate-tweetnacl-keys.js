import yargs from 'yargs'
import {
  generateKeypair,
  saveFile,
  wrapPrivateKeyHeaders,
  wrapPublicKeyHeaders
} from '../generate'

const packageData = require('../../package.json')

async function execCli () {
  // eslint-disable-next-line no-unused-expressions
  const argv = yargs
    .version(packageData.version)
    .usage('$0 [options]')
    .wrap(120)
    .options({
      privout: {
        describe: 'The output file name of the private key',
        type: 'string',
        default: 'private.key.pem'
      },
      pubout: {
        describe: 'The output filename of the public key',
        type: 'string',
        default: 'public.key.pem'
      }
    })
    .example('$0')
    .example('$0 --privout priv.pem --pubout pub.pem').argv

  if (!argv.privout || !argv.pubout) {
    throw new Error('--privout or --pubout options not defined')
  }

  const keypair = generateKeypair()
  keypair.privateKey = wrapPrivateKeyHeaders(keypair.privateKey)
  keypair.publicKey = wrapPublicKeyHeaders(keypair.publicKey)

  await saveFile(argv.privout, keypair.privateKey)
  await saveFile(argv.pubout, keypair.publicKey)

  console.log(`Wrote ${argv.privout}, ${argv.pubout}`)

  process.exit(0)
}

execCli()
  .then(() => {
    // purposely empty
    // because yargs calls the handler out of band
  })
  .catch(e => {
    console.error(e)
    process.exit(-1)
  })
