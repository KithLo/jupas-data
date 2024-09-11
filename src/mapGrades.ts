import { forEachObjIndexed } from "rambda"
import { Subject } from "./subjects"
import { SubjectGrades, SubjectScores } from "./types"
import { memoize } from "./util"

type MapGradeOption = [Subject[], (grade: string) => number]

export const createMapGrades = (options: MapGradeOption[]) =>
    memoize((grades: SubjectGrades): SubjectScores => {
        const output: SubjectScores = {}
        forEachObjIndexed((grade, subject) => {
            if (!grade) return
            for (const [subjects, mapper] of options) {
                if (subjects.includes(subject)) {
                    const result = mapper(grade)
                    if (result) {
                        output[subject] = result
                    }
                }
            }
        }, grades)

        return output
    })

export const mapCatA_Normal = (grade: string): number => {
    switch (grade) {
        case "5**":
            return 7
        case "5*":
            return 6
        case "5":
            return 5
        case "4":
            return 4
        case "3":
            return 3
        case "2":
            return 2
        case "1":
            return 1
        default:
            return 0
    }
}

export const mapCatA_Normal_X1 = (grade: string): number => {
    switch (grade) {
        case "5**":
            return 7
        case "5*":
            return 6
        case "5":
            return 5
        case "4":
            return 4
        case "3":
            return 3
        case "2":
            return 2
        default:
            return 0
    }
}

export const mapCatA_Scaled = (grade: string): number => {
    switch (grade) {
        case "5**":
            return 8.5
        case "5*":
            return 7
        case "5":
            return 5.5
        case "4":
            return 4
        case "3":
            return 3
        case "2":
            return 2
        case "1":
            return 1
        default:
            return 0
    }
}

export const mapCatB_430 = (grade: string): number => {
    switch (grade) {
        case "D2":
            return 4
        case "D1":
            return 3
        case "D":
            return 3
        default:
            return 0
    }
}

export const mapCatB_432 = (grade: string): number => {
    switch (grade) {
        case "D2":
            return 4
        case "D1":
            return 3
        case "D":
            return 3
        case "A":
            return 2
        default:
            return 0
    }
}

export const mapCatC_Scaled = (grade: string): number => {
    switch (grade) {
        case "A":
            return 7
        case "B":
            return 5.5
        case "C":
            return 4
        case "D":
            return 2.5
        case "E":
            return 1
        default:
            return 0
    }
}

export const mapCatC_76543 = (grade: string): number => {
    switch (grade) {
        case "A":
            return 7
        case "B":
            return 6
        case "C":
            return 5
        case "D":
            return 4
        case "E":
            return 3
        default:
            return 0
    }
}

export const mapCatC_65432 = (grade: string): number => {
    switch (grade) {
        case "A":
            return 6
        case "B":
            return 5
        case "C":
            return 4
        case "D":
            return 3
        case "E":
            return 2
        default:
            return 0
    }
}

export const mapCatC_54321 = (grade: string): number => {
    switch (grade) {
        case "A":
            return 5
        case "B":
            return 4
        case "C":
            return 3
        case "D":
            return 2
        case "E":
            return 1
        default:
            return 0
    }
}

export const mapCatC_33322 = (grade: string): number => {
    switch (grade) {
        case "A":
        case "B":
        case "C":
            return 3
        case "D":
        case "E":
            return 2
        default:
            return 0
    }
}

export const mapPassFail = (grade: string): number => {
    switch (grade) {
        case "A":
            return 2
        default:
            return 0
    }
}
