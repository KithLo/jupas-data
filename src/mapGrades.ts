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

export const mapCatC_hku = (grade: string): number => {
    switch (grade) {
        case "C2":
        case "C1":
        case "N1":
        case "G6":
            return 8.5
        case "N2":
        case "B2":
        case "G5":
            return 7
        case "B1":
        case "G4":
            return 6
        case "A2":
        case "N3":
        case "G3":
            return 4
        default:
            return 0
    }
}

export const mapCatC_cuhk = (grade: string): number => {
    switch (grade) {
        case "C2":
        case "N1":
        case "G6":
            return 7
        case "C1":
        case "N2":
        case "G5":
            return 5.5
        case "B2":
        case "N3":
        case "G4":
            return 4
        case "B1":
        case "A2":
        case "G3":
            return 3
        default:
            return 0
    }
}

export const mapCatC_cuhk_medic = (grade: string): number => {
    switch (grade) {
        case "C2":
        case "N1":
        case "G6":
            return 6
        case "C1":
        case "N2":
        case "G5":
            return 5
        case "B2":
        case "N3":
        case "G4":
            return 4
        case "B1":
        case "A2":
        case "G3":
            return 3
        default:
            return 0
    }
}

export const mapCatC_eduhk = (grade: string): number => {
    switch (grade) {
        case "C2":
        case "N1":
        case "G6":
            return 7
        case "C1":
        case "G5":
            return 6
        case "B2":
        case "N2":
        case "G4":
            return 5
        case "B1":
        case "N3":
        case "G3":
            return 4
        case "A2":
            return 3
        default:
            return 0
    }
}

export const mapCatC_hkbu = (grade: string): number => {
    switch (grade) {
        case "C2":
        case "C1":
        case "N1":
        case "G6":
            return 7
        case "B2":
        case "B1":
        case "N2":
        case "G5":
        case "G4":
            return 5.5
        case "A2":
        case "N3":
        case "G3":
            return 4
        default:
            return 0
    }
}

export const mapCatC_hkmu = (grade: string): number => {
    switch (grade) {
        case "C2":
        case "N1":
        case "G6":
            return 7
        case "C1":
        case "G5":
            return 6
        case "B2":
        case "N2":
        case "G4":
            return 5
        case "B1":
        case "N3":
        case "G3":
            return 4
        case "A2":
            return 3
        default:
            return 0
    }
}

export const mapCatC_hkust = (grade: string): number => {
    switch (grade) {
        case "C2":
        case "N1":
        case "G6":
            return 8.5
        case "C1":
            return 7
        case "B2":
        case "N2":
        case "G5":
            return 5.5
        case "B1":
        case "G4":
            return 4
        case "A2":
        case "N3":
        case "G3":
            return 3
        default:
            return 0
    }
}

export const mapCatC_cityuhk = (grade: string): number => {
    switch (grade) {
        case "C2":
        case "N1":
        case "G6":
            return 7
        case "C1":
        case "N2":
        case "G5":
            return 5.5
        case "B2":
        case "N3":
        case "G4":
            return 4
        case "B1":
        case "A2":
        case "G3":
            return 3
        default:
            return 0
    }
}

export const mapCatC_polyu = (grade: string): number => {
    switch (grade) {
        case "C2":
        case "N1":
        case "G6":
            return 8.5
        case "C1":
        case "G5":
            return 7
        case "B2":
        case "N2":
            return 5.5
        case "B1":
        case "G4":
            return 4
        case "A2":
        case "N3":
        case "G3":
            return 3
        default:
            return 0
    }
}

const mapCatC_unknown = (grade: string): number => {
    switch (grade) {
        default:
            return 0
    }
}

export const mapCatC_lingnanu = mapCatC_unknown
export const mapCatC_sssdp = mapCatC_unknown
export const mapCatC_thei = mapCatC_unknown

export const mapPassFail = (grade: string): number => {
    switch (grade) {
        case "A":
            return 2
        default:
            return 0
    }
}
