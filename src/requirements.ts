import { keys, pick, repeat } from "rambda"
import { select } from "./calculations"
import { Subject } from "./subjects"
import { Calculation, SubjectScores } from "./types"

export function minimum(scores: SubjectScores): Calculation {
    const subjects = keys(scores)
    return (input) => {
        const met = subjects.every((subject) => {
            const score = scores[subject]!
            if (input[subject] === undefined) return false
            return input[subject] >= score
        })
        return met ? pick(subjects, input) : null
    }
}

export function minimumOne(subjects: Subject[], minScore: number): Calculation {
    return (input) => {
        for (const subject of subjects) {
            const score = input[subject]
            if (score !== undefined && score >= minScore) {
                return { [subject]: score }
            }
        }
        return null
    }
}

export function requireMultiple(
    count: number,
    requirement: Calculation,
): Calculation {
    return select(...repeat(requirement, count))
}

export const unknownRequirement: Calculation = () => null
