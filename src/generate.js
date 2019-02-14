import fs from 'fs'

const tweetnacl = require('tweetnacl')

tweetnacl.sealedbox = require('tweetnacl-sealedbox-js')
tweetnacl.utils = require('tweetnacl-util')

export function generateKeypair () {
  const keyPair = tweetnacl.box.keyPair()

  return {
    privateKey: tweetnacl.utils.encodeBase64(keyPair.secretKey),
    publicKey: tweetnacl.utils.encodeBase64(keyPair.publicKey)
  }
}

export function wrapPrivateKeyHeaders (data) {
  return `-----BEGIN PRIVATE KEY-----
${data}
-----END PRIVATE KEY-----
`
}

export function wrapPublicKeyHeaders (data) {
  return `-----BEGIN PUBLIC KEY-----
${data}
-----END PUBLIC KEY-----
`
}

export async function saveFile (path, data) {
  fs.writeFileSync(path, data, { encoding: 'ascii' })
}
