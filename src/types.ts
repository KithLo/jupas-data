import { type Subject } from "./subjects"

export type CoreSubject = Subject.Chi | Subject.Eng | Subject.Maths | Subject.CS

export type ElectiveSubject = Exclude<Subject, CoreSubject> | Subject | Subject

export type SubjectScores = Partial<Record<Subject, number>>

export type Calculation = (input: SubjectScores) => SubjectScores | null

export type StatisticValue =
    | number
    | ((calculate: Calculation) => SubjectScores | null)

export type Programme = {
    id: string
    requirement: Calculation
    weighting: Calculation
}

export type Grade = {
    subjects: Subject[]
    grades: Record<string, number>
}
