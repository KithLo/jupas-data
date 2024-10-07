import { maxGrade } from "../src/grades"
import { Institution } from "../src/institutions"
import { programmes } from "../src/programmes"
import { Subject } from "../src/subjects"
import { SubjectGrades } from "../src/types"

const testResults: SubjectGrades[] = [
    {
        [Subject.Chi]: "5",
        [Subject.Eng]: "5",
        [Subject.Maths]: "5",
        [Subject.CS]: "A",
        [Subject.Phys]: "5",
        [Subject.Chem]: "5",
    },
    maxGrade,
]

function* iterate() {
    for (const institution in programmes) {
        for (const programme of programmes[institution as Institution]) {
            for (const result of testResults) {
                yield [programme.mapGrades(result), programme] as const
            }
        }
    }
}

describe("Test all programmes requirement and weightings", () => {
    const list = Array.from(iterate())

    test("duplicate", () => {
        const visited = new Set<string>()
        for (const institution in programmes) {
            for (const programme of programmes[institution as Institution]) {
                expect(visited).not.toContain(programme.id)
                visited.add(programme.id)
            }
        }
    })

    test("requirements", () => {
        for (const [result, programme] of list) {
            const output = programme.requirement(result)
            if (output !== null) {
                expect(output).toEqual(expect.any(Object))
            }
        }
    })
    test("weightings", () => {
        for (const [result, programme] of list) {
            const output = programme.weighting(result)
            if (output !== null) {
                expect(output).toEqual(expect.any(Object))
            }
        }
    })
})
