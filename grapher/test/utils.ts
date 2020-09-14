// Todo: remove file.

import { GrapherInterface } from "grapher/core/GrapherInterface"
import { Grapher } from "grapher/core/Grapher"

import { first } from "lodash"
import { LegacyVariablesAndEntityKey } from "owidTable/LegacyVariableCode"
import { readFileSync } from "fs-extra"

const readObj = (fixture: string) =>
    JSON.parse(readFileSync(__dirname + `/${fixture}.mock.json`, "utf8"))

const readVariable = (id: string | number): LegacyVariablesAndEntityKey =>
    readObj(`variable-${id}`)

const readVariableSet = (
    ids: string[] | number[]
): LegacyVariablesAndEntityKey => readObj(`variableset-${ids.join("-")}`)

export function setupGrapher(
    grapherConfigId: number,
    varIds: number[],
    configOverrides?: Partial<GrapherInterface>
) {
    const variableSet =
        varIds.length > 1
            ? readVariableSet(varIds)
            : readVariable(first(varIds) as number)

    return new Grapher({
        ...readGrapherConfig(grapherConfigId),
        ...configOverrides,
        owidDataset: variableSet,
    })
}

export const readGrapherConfig = (id: string | number): GrapherInterface =>
    readObj(`chart-${id}`)
