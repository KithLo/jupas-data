import {
    pickBy,
    toPairs,
    omit,
    keys,
    mapObjIndexed,
    difference,
    pick,
} from "rambda"
import { select } from "./calculations"
import { Subject, categoryBSubjects, categoryCSubjects } from "./subjects"
import { Calculation, SubjectScores } from "./types"

// Selection

export function choose(...subjects: Subject[]): Calculation {
    return (input) =>
        pickBy((v, k) => v !== undefined && subjects.includes(k), input)
}

export function chooseSome(count: number, ...subjects: Subject[]): Calculation {
    return (input) => {
        const r: SubjectScores = pickBy(
            (v, k) => v !== undefined && subjects.includes(k),
            input,
        )
        const pairs = toPairs(r) as [Subject, number][]
        if (pairs.length < count) {
            return null
        }
        pairs.sort((a, b) => b[1] - a[1])
        const scores: SubjectScores = {}
        for (let i = 0; i < count; ++i) {
            const [subject, score] = pairs[i]!
            scores[subject] = score
        }
        return scores
    }
}

export function chooseWorstOf(
    count: number,
    ...subjects: Subject[]
): Calculation {
    return (input) => {
        const r: SubjectScores = pickBy(
            (v, k) => v !== undefined && subjects.includes(k),
            input,
        )
        const pairs = toPairs(r) as [Subject, number][]
        if (pairs.length < count) {
            return null
        }
        pairs.sort((a, b) => a[1] - b[1])
        const scores: SubjectScores = {}
        for (let i = 0; i < count; ++i) {
            const [subject, score] = pairs[i]!
            scores[subject] = score
        }
        return scores
    }
}

export function chooseBest(count: number): Calculation {
    return (input) => {
        const scores = Object.entries(input) as [Subject, number][]
        if (scores.length < count) return null
        scores.sort((a, b) => b[1] - a[1])
        const output: SubjectScores = {}
        for (let i = 0; i < count; ++i) {
            const [subject, score] = scores[i]!
            output[subject] = score
        }
        return output
    }
}

export function avoid(...subjects: Subject[]): Calculation {
    const output: SubjectScores = {}
    for (const subject of subjects) {
        output[subject] = 0
    }
    return (input) => pick(Object.keys(input), output)
}

export function avoidCategoryBExcept(...subjects: Subject[]): Calculation {
    const output: SubjectScores = {}
    for (const subject of difference(categoryBSubjects, subjects)) {
        output[subject] = 0
    }
    return (input) => pick(Object.keys(input), output)
}

// Multiplication

export function multiply(multipliers: SubjectScores): Calculation {
    return (input) => {
        const scores: SubjectScores = {}
        for (const subject of keys(multipliers)) {
            const score = input[subject]
            const multiplier = multipliers[subject]
            if (score !== undefined && multiplier !== undefined) {
                scores[subject] = score * multiplier
            }
        }
        return scores
    }
}

export function multiplySome(
    count: number,
    multipliers: SubjectScores,
): Calculation {
    return (input) => {
        const r: SubjectScores = pickBy(
            (v, k) => v !== undefined && input[k] !== undefined,
            multipliers,
        )
        const pairs = (toPairs(r) as [Subject, number][]).map(
            ([subject, multiplier]) =>
                [subject, input[subject]! * (multiplier - 1)] as [
                    Subject,
                    number,
                ],
        )
        const scores: SubjectScores = {}
        if (pairs.length === 0) {
            return scores
        }
        // Sort by biggest increases in score
        pairs.sort((a, b) => b[1] - a[1])
        for (let i = 0, n = Math.min(count, pairs.length); i < n; ++i) {
            const [subject, score] = pairs[i]!
            scores[subject] = input[subject]! + score
        }
        return scores
    }
}

export function multiplyAll(multiplier: number): Calculation {
    return mapObjIndexed((v) => v * multiplier)
}

// Discard
export const discardCS: Calculation = omit(Subject.CS)
export const discardCategoryB: Calculation = omit(categoryBSubjects)
export const discardCategoryBExcept = (...subjects: Subject[]): Calculation =>
    omit(difference(categoryBSubjects, subjects))
export const discardCategoryC: Calculation = omit(categoryCSubjects)

export function maxCount(count: number, ...subjects: Subject[]): Calculation {
    return (input) => {
        const valid = subjects.filter((subject) => input[subject] !== undefined)
        if (valid.length < count) {
            return input
        }
        valid.sort((a, b) => input[b]! - input[a]!)
        const scores: SubjectScores = { ...input }
        for (let i = count; i < valid.length; ++i) {
            delete scores[valid[i]!]
        }
        return scores
    }
}

// Scaling

export function scaleSubjects(
    subjects: Subject[],
    scales: Record<number, number>,
): Calculation {
    return (input) => {
        const output = { ...input }
        for (const subject of subjects) {
            const score = output[subject]
            if (score !== undefined) {
                const newScore = scales[score] ?? score
                if (newScore) {
                    output[subject] = newScore
                } else {
                    delete output[subject]
                }
            }
        }
        return output
    }
}

// Common weighting

export const unknownWeighting: Calculation = () => null

export const w3C2X = select(
    choose(Subject.Chi, Subject.Eng, Subject.Maths),
    chooseBest(2),
)
