import { isNotNil, sum, values } from "rambda"
import { modify, optional, select, sequence } from "../calculations"
import { maxGrade } from "../grades"
import {
    createMapGrades,
    mapCatA_Scaled,
    mapCatB_430,
    mapCatC_Scaled,
    mapPassFail,
} from "../mapGrades"
import { minimum, minimumOne } from "../requirements"
import {
    categoryASubjects,
    categoryBSubjects,
    categoryCSubjects,
    passFailSubjects,
    Subject,
} from "../subjects"
import { Calculation, Programme, SubjectScores } from "../types"
import {
    avoid,
    choose,
    chooseBest,
    chooseSome,
    discardCategoryB,
    discardCategoryC,
    discardCS,
    multiply,
    multiplySome,
    scaleSubjects,
} from "../weightings"

const mapGrades = createMapGrades([
    [categoryASubjects, mapCatA_Scaled],
    [categoryBSubjects, mapCatB_430],
    [categoryCSubjects, mapCatC_Scaled],
    [passFailSubjects, mapPassFail],
])

const hkustConfig = sequence(discardCS, discardCategoryB)

const extraSubject = (maxScore: number): Calculation => {
    const percent = (percent: number) => (maxScore * percent) / 100
    return optional(
        sequence(
            discardCS,
            scaleSubjects(categoryASubjects, {
                8.5: percent(5),
                7: percent(4.1),
                5.5: percent(3.2),
                4: percent(2.4),
                3: percent(1.8),
                2: 0,
                1: 0,
            }),
            scaleSubjects(categoryBSubjects, {
                4: percent(2.4),
                3: percent(1.8),
            }),
            scaleSubjects(categoryCSubjects, {
                7: percent(4.1),
                5.5: percent(3.2),
                4: percent(2.4),
                2.5: 0,
                1: 0,
            }),
            chooseBest(1),
        ),
    )
}

const hkustSequence = (
    { allowCategoryB }: { allowCategoryB: boolean },
    ...fns: Calculation[]
): Calculation => {
    const fn = sequence(hkustConfig, ...fns)
    const maxScoreGrade = fn(mapGrades(maxGrade))
    if (!maxScoreGrade) return fn
    const maxScore = sum(values(maxScoreGrade).filter(isNotNil))
    if (!maxScore) return fn
    const extraChain = extraSubject(maxScore)
    if (allowCategoryB) {
        return select(fn, extraChain)
    } else {
        return select(fn, avoid(...categoryBSubjects), extraChain)
    }
}

const wSci = (multiplier: SubjectScores): Calculation =>
    hkustSequence(
        { allowCategoryB: true },
        discardCategoryC,
        modify(
            multiply({
                [Subject.Eng]: 1.5,
            }),
            multiplySome(2, multiplier),
        ),
        select(
            choose(Subject.Eng, Subject.Maths),
            chooseSome(
                1,
                Subject.Bio,
                Subject.Chem,
                Subject.Phys,
                Subject.M1,
                Subject.M2,
            ),
            chooseBest(2),
        ),
    )

const r2Sci = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 2,
        [Subject.CS]: 1,
    }),
    minimumOne(
        [Subject.Bio, Subject.Chem, Subject.Phys, Subject.M1, Subject.M2],
        3,
    ),
    minimumOne(categoryASubjects, 3),
)

const r3Sci = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 3,
        [Subject.CS]: 1,
    }),
    minimumOne(
        [Subject.Bio, Subject.Chem, Subject.Phys, Subject.M1, Subject.M2],
        3,
    ),
    minimumOne(categoryASubjects, 3),
)

export const wEngg = hkustSequence(
    { allowCategoryB: false },
    discardCategoryC,
    modify(
        multiply({
            [Subject.Eng]: 2,
            [Subject.Maths]: 2,
        }),
    ),
    select(
        choose(Subject.Eng, Subject.Maths),
        sequence(
            modify(
                multiply({
                    [Subject.Bio]: 2,
                    [Subject.Chem]: 2,
                    [Subject.Phys]: 2,
                }),
            ),
            chooseSome(1, Subject.Bio, Subject.Chem, Subject.Phys, Subject.ICT),
        ),
        sequence(
            modify(
                multiply({
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                }),
            ),
            chooseBest(2),
        ),
    ),
)

const rEngg = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 3,
        [Subject.CS]: 1,
    }),
    minimumOne([Subject.Bio, Subject.Chem, Subject.Phys, Subject.ICT], 3),
    minimumOne(categoryASubjects, 3),
)

const wBuisAndMgmt = hkustSequence(
    { allowCategoryB: false },
    discardCategoryC,
    modify(
        multiply({
            [Subject.Eng]: 2,
            [Subject.Maths]: 2,
        }),
    ),
    select(choose(Subject.Eng, Subject.Maths), chooseBest(3)),
)

const rBba = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 4,
        [Subject.Maths]: 3,
        [Subject.CS]: 1,
    }),
    minimumOne(categoryASubjects, 3),
    minimumOne(categoryASubjects, 3),
)

const wFin = hkustSequence(
    { allowCategoryB: false },
    discardCategoryC,
    modify(
        multiply({
            [Subject.Eng]: 2,
            [Subject.Maths]: 2,
        }),
        multiplySome(1, {
            [Subject.Chem]: 1.5,
            [Subject.Econ]: 1.5,
            [Subject.Phys]: 1.5,
            [Subject.M1]: 1.5,
            [Subject.M2]: 1.5,
        }),
    ),
    select(choose(Subject.Eng, Subject.Maths), chooseBest(3)),
)

export const hkustProgrammes: Programme[] = [
    {
        id: "JS5101",
        mapGrades,
        requirement: r2Sci,
        weighting: hkustSequence(
            { allowCategoryB: true },
            discardCategoryC,
            select(
                choose(Subject.Eng, Subject.Maths),
                chooseSome(
                    2,
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Phys,
                    Subject.M1,
                    Subject.M2,
                ),
                chooseBest(1),
            ),
        ),
    },
    {
        id: "JS5102",
        mapGrades,
        requirement: r2Sci,
        weighting: wSci({
            [Subject.Phys]: 2,
            [Subject.M1]: 2,
            [Subject.M2]: 2,
            [Subject.Bio]: 1.5,
            [Subject.Chem]: 1.5,
        }),
    },
    {
        id: "JS5103",
        mapGrades,
        requirement: r2Sci,
        weighting: wSci({
            [Subject.Bio]: 2,
            [Subject.Chem]: 2,
            [Subject.Phys]: 1.5,
            [Subject.M1]: 1.5,
            [Subject.M2]: 1.5,
        }),
    },
    {
        id: "JS5181",
        mapGrades,
        requirement: r3Sci,
        weighting: wSci({
            [Subject.Phys]: 2,
            [Subject.M1]: 2,
            [Subject.M2]: 2,
            [Subject.Bio]: 1.5,
            [Subject.Chem]: 1.5,
        }),
    },
    {
        id: "JS5200",
        mapGrades,
        requirement: rEngg,
        weighting: wEngg,
    },
    {
        id: "JS5282",
        mapGrades,
        requirement: rEngg,
        weighting: wEngg,
    },
    {
        id: "JS5300",
        mapGrades,
        requirement: rBba,
        weighting: wBuisAndMgmt,
    },
    {
        id: "JS5311",
        mapGrades,
        requirement: rBba,
        weighting: wBuisAndMgmt,
    },
    {
        id: "JS5312",
        mapGrades,
        requirement: rBba,
        weighting: wFin,
    },
    {
        id: "JS5313",
        mapGrades,
        requirement: rBba,
        weighting: wBuisAndMgmt,
    },
    {
        id: "JS5314",
        mapGrades,
        requirement: rBba,
        weighting: wBuisAndMgmt,
    },
    {
        id: "JS5315",
        mapGrades,
        requirement: rBba,
        weighting: wBuisAndMgmt,
    },
    {
        id: "JS5316",
        mapGrades,
        requirement: rBba,
        weighting: wBuisAndMgmt,
    },
    {
        id: "JS5317",
        mapGrades,
        requirement: rBba,
        weighting: wBuisAndMgmt,
    },
    {
        id: "JS5318",
        mapGrades,
        requirement: rBba,
        weighting: wBuisAndMgmt,
    },
    {
        id: "JS5331",
        mapGrades,
        requirement: rBba,
        weighting: wFin,
    },
    {
        id: "JS5332",
        mapGrades,
        requirement: rBba,
        weighting: wFin,
    },
    {
        id: "JS5411",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 2,
                [Subject.CS]: 1,
            }),
            minimumOne(categoryASubjects, 3),
            minimumOne([...categoryASubjects, ...categoryCSubjects], 3),
        ),
        weighting: hkustSequence(
            { allowCategoryB: true },
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Chi]: 1.5,
                }),
            ),
            select(choose(Subject.Eng, Subject.Chi), chooseBest(3)),
        ),
    },
    {
        id: "JS5412",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
            }),
            minimumOne(categoryASubjects, 3),
            minimumOne(categoryASubjects, 3),
        ),
        weighting: hkustSequence(
            { allowCategoryB: true },
            discardCategoryC,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                }),
            ),
            select(choose(Subject.Eng, Subject.Maths), chooseBest(3)),
        ),
    },
    {
        id: "JS5711",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
            }),
            minimumOne(
                [
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Phys,
                    Subject.DAT,
                    Subject.ICT,
                ],
                3,
            ),
            minimumOne(categoryASubjects, 3),
        ),
        weighting: hkustSequence(
            { allowCategoryB: true },
            discardCategoryC,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                }),
            ),
            select(
                choose(Subject.Eng, Subject.Maths),
                sequence(
                    modify(
                        multiply({
                            [Subject.Bio]: 2,
                            [Subject.Chem]: 2,
                            [Subject.Phys]: 2,
                            [Subject.DAT]: 2,
                        }),
                    ),
                    chooseSome(
                        1,
                        Subject.Bio,
                        Subject.Chem,
                        Subject.Phys,
                        Subject.DAT,
                        Subject.ICT,
                    ),
                ),
                sequence(
                    modify(
                        multiply({
                            [Subject.M1]: 1.5,
                            [Subject.M2]: 1.5,
                        }),
                    ),
                    chooseBest(2),
                ),
            ),
        ),
    },
    {
        id: "JS5811",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 4,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
            }),
            minimumOne([Subject.Bio, Subject.Chem], 3),
            minimumOne(categoryASubjects, 3),
        ),
        weighting: hkustSequence(
            { allowCategoryB: true },
            discardCategoryC,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                }),
            ),
            select(
                choose(Subject.Eng, Subject.Maths),
                sequence(
                    modify(
                        multiply({
                            [Subject.Bio]: 1.5,
                            [Subject.Chem]: 1.5,
                        }),
                    ),
                    chooseSome(1, Subject.Bio, Subject.Chem),
                ),
                chooseBest(2),
            ),
        ),
    },
    {
        id: "JS5812",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 4,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
            }),
            minimumOne(categoryASubjects, 3),
            minimumOne([...categoryASubjects, ...categoryCSubjects], 3),
        ),
        weighting: hkustSequence(
            { allowCategoryB: true },
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                }),
            ),
            select(choose(Subject.Eng, Subject.Maths), chooseBest(3)),
        ),
    },
    {
        id: "JS5813",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 4,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
            }),
            minimumOne(
                [
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Phys,
                    Subject.Econ,
                    Subject.M1,
                    Subject.M2,
                ],
                3,
            ),
            minimumOne(categoryASubjects, 3),
        ),
        weighting: hkustSequence(
            { allowCategoryB: true },
            discardCategoryC,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                }),
            ),
            select(
                choose(Subject.Eng, Subject.Maths),
                sequence(
                    modify(
                        multiply({
                            [Subject.M1]: 2,
                            [Subject.M2]: 2,
                            [Subject.Bio]: 1.5,
                            [Subject.Chem]: 1.5,
                            [Subject.Phys]: 1.5,
                            [Subject.Econ]: 1.5,
                        }),
                    ),
                    chooseSome(
                        1,
                        Subject.Bio,
                        Subject.Chem,
                        Subject.Phys,
                        Subject.Econ,
                        Subject.M1,
                        Subject.M2,
                    ),
                ),
                chooseBest(2),
            ),
        ),
    },
    {
        id: "JS5814",
        mapGrades,
        requirement: rBba,
        weighting: hkustSequence(
            { allowCategoryB: false },
            discardCategoryC,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                }),
            ),
            select(choose(Subject.Eng, Subject.Maths), chooseBest(3)),
        ),
    },
    {
        id: "JS5822",
        mapGrades,
        requirement: rBba,
        weighting: wFin,
    },
    {
        id: "JS5901",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 4,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
            }),
            minimumOne(
                [Subject.Bio, Subject.Chem, Subject.Phys, Subject.ICT],
                3,
            ),
            minimumOne(categoryASubjects, 3),
        ),
        weighting: wEngg,
    },
]
