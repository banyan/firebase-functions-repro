import * as functions from 'firebase-functions'

export type TFunctionsConfig = Readonly<{
  hello: {
    readonly world: string
  }
}>

export function getFunctionsConfig<
  TG extends keyof TFunctionsConfig,
  TK extends keyof TFunctionsConfig[TG]
>(groupKey: TG, valueKey: TK): TFunctionsConfig[TG][TK] {
  if (process.env.FUNCTIONS_EMULATOR) {
    return null!
  }
  const cfg = getConfig()
  const group = cfg[groupKey]
  if (!group) {
    throw new Error(`Missing config group ${groupKey}`)
  }
  const value = group[valueKey]
  if (!group) {
    throw new Error(`Missing config value ${valueKey} in group ${groupKey}`)
  }
  return value
}

export function getConfig() {
  if (process.env.NODE_ENV === 'test') {
    return require('../../../.runtimeconfig.json')
  }
  return functions.config()
}
