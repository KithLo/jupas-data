import { difference } from "rambda"
import {
    aplChinese,
    categoryASubjects,
    categoryBSubjects,
    conflictingSubjects,
    passFailSubjects,
    Subject,
} from "./subjects"
import { Grade, SubjectGrades } from "./types"

export const grades: Grade[] = [
    {
        subjects: categoryASubjects,
        grades: ["5**", "5*", "5", "4", "3", "2", "1", "U"],
    },
    {
        subjects: difference(categoryBSubjects, aplChinese),
        grades: ["D2", "D1", "A", "U"],
    },
    {
        subjects: aplChinese,
        grades: ["D", "A", "U"],
    },
    {
        subjects: [Subject.French, Subject.German, Subject.Spanish],
        grades: ["C2", "C1", "B2", "B1", "A2"],
    },
    {
        subjects: [Subject.Japanese],
        grades: ["N1", "N2", "N3"],
    },
    {
        subjects: [Subject.Korean],
        grades: ["G6", "G5", "G4", "G3"],
    },
    {
        subjects: passFailSubjects,
        grades: ["A", "U"],
    },
]

export const maxGrade: SubjectGrades = {}

for (const item of grades) {
    const first = item.grades[0]!
    for (const subject of item.subjects) {
        maxGrade[subject] = first
    }
}

for (const [, subjects] of conflictingSubjects) {
    for (const subject of subjects) {
        delete maxGrade[subject]
    }
}
