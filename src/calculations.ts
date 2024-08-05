import { isNotNil, keys, omit, pickBy, sum, values } from "rambda"
import { Subject } from "./subjects"
import { Calculation, SubjectScores } from "./types"

type Reducer<T> = (
    value: SubjectScores,
    fn: Calculation,
    accumulator?: T,
) => { accumulator: T; value: SubjectScores } | null

const sequenceReducer: Reducer<undefined> = (value, fn) => {
    const val = fn(value)
    if (val === null) return null
    return { accumulator: undefined, value: val }
}

const combinationReducer: Reducer<SubjectScores> = (value, fn, accumulator) => {
    const initial = accumulator ?? value
    const val = fn(initial)
    if (val === null) return null
    return { accumulator: initial, value: { ...value, ...val } }
}

const omitZero = pickBy<SubjectScores>((val) => val !== 0)

const selectionReducer: Reducer<SubjectScores> = (value, fn, accumulator) => {
    const val = fn(accumulator ?? value)
    if (val === null) return null
    return {
        accumulator: omit(keys(val), accumulator ?? value),
        value: omitZero(accumulator ? { ...val, ...value } : val),
    }
}

const modificationReducer: Reducer<Subject[]> = (
    value,
    fn,
    accumulator = [],
) => {
    const val = fn(omit(accumulator, value))
    if (val === null) return null
    return {
        accumulator: [...accumulator, ...keys(val)],
        value: omitZero({ ...value, ...val }),
    }
}

const evaluationReducer: Reducer<{
    original: SubjectScores
    best: SubjectScores
    score: number
}> = (value, fn, accumulator) => {
    const val = fn(accumulator?.original ?? value)
    if (val === null) return null
    const score = sum(values(val).filter(isNotNil))
    if (accumulator === undefined) {
        return {
            accumulator: { original: value, best: val, score },
            value: val,
        }
    } else if (accumulator.score >= score) {
        return { accumulator, value }
    } else {
        return {
            accumulator: { original: accumulator.original, best: val, score },
            value: val,
        }
    }
}

function toMultiple<T>(
    reducer: Reducer<T>,
): (...rest: Calculation[]) => Calculation {
    return (first, ...calculations) =>
        (input) => {
            if (!first) return null
            let result = reducer(input, first)
            if (result === null) return null
            for (const calc of calculations) {
                result = reducer(result.value, calc, result.accumulator)
                if (result === null) return null
            }
            return result.value
        }
}

function toGenerator<T>(
    reducer: Reducer<T>,
): (
    generator: (
        input: SubjectScores,
    ) => Generator<
        Calculation | ReturnType<Calculation>,
        void | ReturnType<Calculation>,
        SubjectScores
    >,
) => Calculation {
    return (generator) => (value) => {
        const iterator = generator(value)
        let item = iterator.next()
        let accumulator = undefined
        while (!item.done) {
            const fn: Calculation =
                typeof item.value === "function"
                    ? item.value
                    : () => item.value as ReturnType<Calculation>
            const result = reducer(value, fn, accumulator)
            if (result === null) return null
            value = result.value
            accumulator = result.accumulator
            item = iterator.next(value)
        }
        return item.value !== undefined ? item.value : value
    }
}

export const sequence = toMultiple(sequenceReducer)
export const doSequence = toGenerator(sequenceReducer)

export const select = toMultiple(selectionReducer)
export const doSelect = toGenerator(selectionReducer)

export const modify = toMultiple(modificationReducer)
export const doModify = toGenerator(modificationReducer)

export const evaulate = toMultiple(evaluationReducer)
export const doEvaluate = toGenerator(evaluationReducer)

export const combine = toMultiple(combinationReducer)
export const doCombine = toGenerator(combinationReducer)

export function or(first: Calculation, ...rest: Calculation[]): Calculation {
    return (input) => {
        let result = first(input)
        if (result) return result
        for (const calc of rest) {
            result = calc(input)
            if (result) return result
        }
        return null
    }
}

export function optional(calculation: Calculation): Calculation {
    return (input) => calculation(input) || {}
}
