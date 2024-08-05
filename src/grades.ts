import { difference, max, values } from "rambda"
import {
    aplChinese,
    categoryASubjects,
    categoryBSubjects,
    categoryCSubjects,
    conflictingSubjects,
    passFailSubjects,
} from "./subjects"
import { Grade, SubjectScores } from "./types"

export const grades: Grade[] = [
    {
        subjects: categoryASubjects,
        grades: {
            "5**": 7,
            "5*": 6,
            "5": 5,
            "4": 4,
            "3": 3,
            "2": 2,
            "1": 1,
            U: 0,
        },
    },
    {
        subjects: categoryBSubjects,
        grades: {
            D2: 3,
            D1: 2,
            A: 1,
            U: 0,
        },
    },
    {
        subjects: difference(categoryBSubjects, aplChinese),
        grades: {
            D2: 3,
            D1: 2,
            A: 1,
            U: 0,
        },
    },
    {
        subjects: aplChinese,
        grades: {
            D: 2,
            A: 1,
            U: 0,
        },
    },
    {
        subjects: categoryCSubjects,
        grades: {
            A: 5,
            B: 4,
            C: 3,
            D: 2,
            E: 1,
            U: 0,
        },
    },
    {
        subjects: passFailSubjects,
        grades: {
            A: 1,
            U: 0,
        },
    },
]

export const maxGrade: SubjectScores = {}

for (const item of grades) {
    const maxScore = values(item.grades).reduce(max)
    for (const subject of item.subjects) {
        maxGrade[subject] = maxScore
    }
}

for (const [, subjects] of conflictingSubjects) {
    for (const subject of subjects) {
        delete maxGrade[subject]
    }
}
