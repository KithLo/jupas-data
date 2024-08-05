import { maxGrade } from "../src/grades"
import { Institution } from "../src/institutions"
import { programmes } from "../src/programmes"
import { Subject } from "../src/subjects"
import { SubjectScores } from "../src/types"

const testResults: SubjectScores[] = [
    {
        [Subject.Chi]: 5,
        [Subject.Eng]: 5,
        [Subject.Maths]: 5,
        [Subject.CS]: 1,
        [Subject.Phys]: 5,
        [Subject.Chem]: 5,
    },
    maxGrade,
]

function* iterate() {
    for (const institution in programmes) {
        for (const programme of programmes[institution as Institution]) {
            for (const result of testResults) {
                yield [result, programme] as const
            }
        }
    }
}

describe("Test all programmes requirement and weightings", () => {
    test("requirements", () => {
        for (const [result, programme] of iterate()) {
            const output = programme.requirement(result)
            if (output !== null) {
                expect(output).toEqual(expect.any(Object))
            }
        }
    })
    test("weightings", () => {
        for (const [result, programme] of iterate()) {
            const output = programme.weighting(result)
            if (output !== null) {
                expect(output).toEqual(expect.any(Object))
            }
        }
    })
})
