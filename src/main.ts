import { difference } from "rambda"
import { Institution } from "./institutions"
import { StudyArea } from "./studyAreas"
import {
    categoryASubjects,
    categoryBSubjects,
    categoryCSubjects,
    coreSubjects,
} from "./subjects"

export { subjects, conflictingSubjects } from "./subjects"
export { grades, maxGrade } from "./grades"
export { programmes } from "./programmes"

export const year: string = "2024"
export const pastYears: string[] = []

export const studyAreas = Object.values(StudyArea)
export const institutions = Object.values(Institution)

export const subjectsByCategory = {
    core: coreSubjects,
    elective: difference(categoryASubjects, coreSubjects),
    apl: categoryBSubjects,
    language: categoryCSubjects,
}

export const categories = ["core", "elective", "apl", "language"]
export const defaultCategory = "elective"

export { coreSubjects }
