# Optional workspace-only runtime for this Windows machine.
$nodeDirectory = Join-Path $PSScriptRoot '../tmp/angular-tools/node_modules/node/bin'
if (-not (Test-Path (Join-Path $nodeDirectory 'node.exe'))) { throw 'Install Node 24.21.0 (see .nvmrc), or restore the optional local runtime.' }
$env:PATH = (Resolve-Path $nodeDirectory).Path + ';' + $env:PATH
function global:npm { & (Join-Path $nodeDirectory 'node.exe') 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' @args }
node --version

