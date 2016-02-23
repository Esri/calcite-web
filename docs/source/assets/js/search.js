console.log('pretty cool search page guy')


calcite.bus.on('filterDropdown:active', logActive)
function logActive (options) {
  console.log(`Filter dropdown '${options.id}' has ${options.active.length} active items`)
  console.log(options.active)
}

