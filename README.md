# generate-tweetnacl-keys

This is a CLI utility to generate an x25519 keypair that is compatible for use with `tweetnacl`.

## Install

`$ npm i -g generate-tweetnacl-keys`

## Usage

Generates two files, `public.key.pem`, `private.key.pem`

`$ generate-tweetnacl-keys`

Specify the output filenames:

`$ generate-tweetnacl-keys --privout private.pem --pubout public.pem`

## Context

We originally used `openssl 1.1.1` to generate the private key via the following command:

`openssl genpkey -algorithm X25519 -out private.pem`

and extracted the public key with:

`openssl pkey -in private.pem -pubout -out public.pem`

While the keypair worked in a Java library, it did not with `tweetnacl`, as `tweetnacl` is expecting a 32-byte length public key,
but the public key in the above example is 44 bytes. We're unsure what the potential differences are after researching online,
and so created this utility to ensure a working set of keys can be generated.

The generated keypair with this utility does work in the Java library we are testing against, along with `tweetnacl`.

See https://bugs.openjdk.java.net/browse/JDK-8213363 for more information.
