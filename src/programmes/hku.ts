import { modify, optional, select, sequence } from "../calculations"
import { minimum, minimumOne, requireMultiple } from "../requirements"
import { categoryASubjects, categoryCSubjects, Subject } from "../subjects"
import { Programme } from "../types"
import {
    choose,
    chooseBest,
    chooseSome,
    discardCategoryB,
    discardCategoryC,
    discardCS,
    maxCount,
    multiply,
    multiplyAll,
    multiplySome,
    scaleSubjects,
} from "../weightings"

const hkuConfig = sequence(
    discardCS,
    discardCategoryB,
    scaleSubjects(categoryASubjects, {
        7: 8.5,
        6: 7,
        5: 5.5,
        1: 0,
    }),
    scaleSubjects(categoryCSubjects, {
        5: 7,
        4: 5.5,
        3: 4,
        2: 2.5,
    }),
)

const hkuElectiveReq = minimumOne(
    [...categoryASubjects, ...categoryCSubjects], // 3 or C
    3,
)

const hku332 = minimum({
    [Subject.Chi]: 3,
    [Subject.Eng]: 3,
    [Subject.Maths]: 2,
    [Subject.CS]: 1,
})

const hku342 = minimum({
    [Subject.Chi]: 3,
    [Subject.Eng]: 4,
    [Subject.Maths]: 2,
    [Subject.CS]: 1,
})

const hku343 = minimum({
    [Subject.Chi]: 3,
    [Subject.Eng]: 4,
    [Subject.Maths]: 3,
    [Subject.CS]: 1,
})

const hku454 = minimum({
    [Subject.Chi]: 4,
    [Subject.Eng]: 5,
    [Subject.Maths]: 4,
    [Subject.CS]: 1,
})

const hku452 = minimum({
    [Subject.Chi]: 4,
    [Subject.Eng]: 5,
    [Subject.Maths]: 2,
    [Subject.CS]: 1,
})

const hku354 = minimum({
    [Subject.Chi]: 3,
    [Subject.Eng]: 5,
    [Subject.Maths]: 4,
    [Subject.CS]: 1,
})

const hku453 = minimum({
    [Subject.Chi]: 4,
    [Subject.Eng]: 5,
    [Subject.Maths]: 3,
    [Subject.CS]: 1,
})

const hku344 = minimum({
    [Subject.Chi]: 3,
    [Subject.Eng]: 4,
    [Subject.Maths]: 4,
    [Subject.CS]: 1,
})

const hku334 = minimum({
    [Subject.Chi]: 3,
    [Subject.Eng]: 3,
    [Subject.Maths]: 4,
    [Subject.CS]: 1,
})

const hku333 = minimum({
    [Subject.Chi]: 3,
    [Subject.Eng]: 3,
    [Subject.Maths]: 3,
    [Subject.CS]: 1,
})

const hku352 = minimum({
    [Subject.Chi]: 3,
    [Subject.Eng]: 5,
    [Subject.Maths]: 2,
    [Subject.CS]: 1,
})

const catCorM12 = maxCount(1, Subject.M1, Subject.M2, ...categoryCSubjects)

const artWeighting = sequence(
    hkuConfig,
    catCorM12,
    modify(
        multiply({
            [Subject.Chi]: 1.5,
            [Subject.Eng]: 1.5,
        }),
    ),
    select(choose(Subject.Eng), chooseBest(4)),
)

const extraSubject2 = optional(sequence(chooseBest(1), multiplyAll(0.2)))
const extraSubject5 = optional(sequence(chooseBest(1), multiplyAll(0.5)))

const bba5 = sequence(
    discardCategoryC,
    hkuConfig,
    modify(
        multiply({
            [Subject.Eng]: 1.5,
            [Subject.Maths]: 1.5,
        }),
    ),
    select(choose(Subject.Eng, Subject.Maths), chooseBest(3), extraSubject2),
)

const bba6 = sequence(
    discardCategoryC,
    hkuConfig,
    modify(
        multiply({
            [Subject.Eng]: 1.5,
            [Subject.Maths]: 1.5,
        }),
    ),
    select(choose(Subject.Eng, Subject.Maths), chooseBest(4), extraSubject2),
)

const engg = sequence(
    hkuConfig,
    select(choose(Subject.Eng, Subject.Maths), chooseBest(3)),
)

export const hkuProgrammes: Programme[] = [
    {
        id: "JS6004",
        requirement: select(hku332, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(hkuConfig, catCorM12, chooseBest(5)),
    },
    {
        id: "JS6016",
        requirement: select(hku332, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(hkuConfig, catCorM12, chooseBest(5)),
    },
    {
        id: "JS6028",
        requirement: select(hku332, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(hkuConfig, catCorM12, chooseBest(5)),
    },
    {
        id: "JS6042",
        requirement: select(hku332, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(hkuConfig, catCorM12, chooseBest(5)),
    },
    {
        id: "JS6054",
        requirement: select(hku332, hkuElectiveReq, hkuElectiveReq),
        weighting: artWeighting,
    },
    {
        id: "JS6066",
        requirement: select(hku332, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(
            hkuConfig,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                }),
            ),
            catCorM12,
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS6078",
        requirement: select(
            hku453,
            hkuElectiveReq,
            hkuElectiveReq,
            hkuElectiveReq,
        ),
        weighting: sequence(
            discardCategoryC,
            hkuConfig,
            select(choose(Subject.Eng), chooseBest(5)),
        ),
    },
    {
        id: "JS6080",
        requirement: select(hku332, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(
            hkuConfig,
            modify(
                multiply({
                    [Subject.Chi]: 1.5,
                }),
            ),
            catCorM12,
            select(choose(Subject.Chi), chooseBest(4)),
        ),
    },
    {
        id: "JS6092",
        requirement: select(hku332, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(
            hkuConfig,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                    [Subject.Chi]: 1.2,
                }),
            ),
            catCorM12,
            select(choose(Subject.Chi, Subject.Eng), chooseBest(3)),
        ),
    },
    {
        id: "JS6107",
        requirement: select(
            hku343,
            minimumOne([Subject.Bio, Subject.Chem], 3),
            hkuElectiveReq,
        ),
        weighting: sequence(
            discardCategoryC,
            hkuConfig,
            modify(
                multiplySome(1, {
                    [Subject.Bio]: 1.3,
                    [Subject.Chem]: 1.3,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS6119",
        requirement: select(
            hku332,
            minimumOne([Subject.Bio, Subject.Chem, Subject.Phys], 3),
            hkuElectiveReq,
        ),
        weighting: sequence(
            discardCategoryC,
            hkuConfig,
            modify(
                multiply({
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                }),
            ),
            select(
                choose(Subject.Eng, Subject.Maths),
                chooseSome(1, Subject.Bio, Subject.Chem, Subject.Phys),
                chooseBest(2),
            ),
        ),
    },
    {
        id: "JS6157",
        requirement: select(hku342, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(discardCategoryC, hkuConfig, chooseBest(5)),
    },
    {
        id: "JS6212",
        requirement: select(hku352, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(
            hkuConfig,
            modify(multiply({ [Subject.Eng]: 1.5 })),
            catCorM12,
            chooseBest(5),
        ),
    },
    {
        id: "JS6224",
        requirement: select(
            hku344,
            minimumOne([Subject.M1, Subject.M2], 4),
            hkuElectiveReq,
        ),
        weighting: sequence(
            discardCategoryC,
            hkuConfig,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                    [Subject.M1]: 2,
                    [Subject.M2]: 2,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.ICT]: 1.5,
                    [Subject.Phys]: 1.5,
                }),
            ),
            select(
                choose(Subject.Eng, Subject.Maths),
                chooseSome(1, Subject.M1, Subject.M2),
                chooseBest(2),
            ),
        ),
    },
    {
        id: "JS6236",
        requirement: select(hku342, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(hkuConfig, catCorM12, chooseBest(5)),
    },
    {
        id: "JS6248",
        requirement: select(hku343, hkuElectiveReq, hkuElectiveReq),
        weighting: engg,
    },
    {
        id: "JS6250",
        requirement: select(hku342, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(hkuConfig, catCorM12, chooseBest(5)),
    },
    {
        id: "JS6262",
        requirement: select(
            hku333,
            minimumOne([Subject.M1, Subject.M2], 3),
            hkuElectiveReq,
        ),
        weighting: engg,
    },
    {
        id: "JS6286",
        requirement: select(hku333, hkuElectiveReq, hkuElectiveReq),
        weighting: artWeighting,
    },
    {
        id: "JS6406",
        requirement: select(
            hku453,
            hkuElectiveReq,
            hkuElectiveReq,
            hkuElectiveReq,
        ),
        weighting: sequence(
            discardCategoryC,
            hkuConfig,
            select(choose(Subject.Eng), chooseBest(5)),
        ),
    },
    {
        id: "JS6418",
        requirement: select(hku332, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(
            hkuConfig,
            catCorM12,
            select(chooseBest(5), extraSubject5),
        ),
    },
    {
        id: "JS6456",
        requirement: select(
            hku342,
            minimumOne([Subject.Chem], 3),
            hkuElectiveReq,
            hkuElectiveReq,
        ),
        weighting: sequence(discardCategoryC, hkuConfig, chooseBest(6)),
    },
    {
        id: "JS6468",
        requirement: select(hku332, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(
            hkuConfig,
            catCorM12,
            select(chooseBest(5), extraSubject5),
        ),
    },
    {
        id: "JS6470",
        requirement: select(
            hku344,
            minimumOne([Subject.Bio, Subject.Chem], 3),
            hkuElectiveReq,
            hkuElectiveReq,
        ),
        weighting: sequence(discardCategoryC, hkuConfig, chooseBest(6)),
    },
    {
        id: "JS6482",
        requirement: select(
            hku332,
            minimumOne([Subject.Bio, Subject.Chem, Subject.Phys], 3),
            hkuElectiveReq,
        ),
        weighting: sequence(
            hkuConfig,
            catCorM12,
            select(chooseBest(5), extraSubject5),
        ),
    },
    {
        id: "JS6494",
        requirement: select(
            hku342,
            minimumOne([Subject.Chem], 3),
            hkuElectiveReq,
            hkuElectiveReq,
        ),
        weighting: sequence(discardCategoryC, hkuConfig, chooseBest(6)),
    },
    {
        id: "JS6688",
        requirement: select(
            hku334,
            requireMultiple(
                2,
                minimumOne(
                    [
                        Subject.Bio,
                        Subject.Chem,
                        Subject.Phys,
                        Subject.M1,
                        Subject.M2,
                    ],
                    3,
                ),
            ),
        ),
        weighting: sequence(
            discardCategoryC,
            hkuConfig,
            modify(
                multiply({
                    [Subject.M1]: 1.2,
                    [Subject.M2]: 1.2,
                    [Subject.Bio]: 1.2,
                    [Subject.Chem]: 1.2,
                    [Subject.Phys]: 1.2,
                }),
            ),
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
        id: "JS6705",
        requirement: select(hku332, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(hkuConfig, catCorM12, chooseBest(5)),
    },
    {
        id: "JS6717",
        requirement: select(hku332, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(hkuConfig, catCorM12, chooseBest(5)),
    },
    {
        id: "JS6729",
        requirement: select(
            hku334,
            minimumOne([Subject.M1, Subject.M2], 4),
            hkuElectiveReq,
        ),
        weighting: sequence(
            discardCategoryC,
            hkuConfig,
            modify(
                multiply({
                    [Subject.Eng]: 1.2,
                    [Subject.Maths]: 1.2,
                    [Subject.M1]: 1.2,
                    [Subject.M2]: 1.2,
                }),
            ),
            select(
                choose(Subject.Eng, Subject.Maths),
                chooseSome(1, Subject.M1, Subject.M2),
                chooseBest(2),
            ),
        ),
    },
    {
        id: "JS6731",
        requirement: select(hku332, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(hkuConfig, catCorM12, chooseBest(5)),
    },
    {
        id: "JS6755",
        requirement: select(hku343, hkuElectiveReq, hkuElectiveReq),
        weighting: bba5,
    },
    {
        id: "JS6767",
        requirement: select(hku343, hkuElectiveReq, hkuElectiveReq),
        weighting: bba5,
    },
    {
        id: "JS6781",
        requirement: select(hku343, hkuElectiveReq, hkuElectiveReq),
        weighting: bba5,
    },
    {
        id: "JS6793",
        requirement: select(
            hku343,
            minimumOne(
                [Subject.Bio, Subject.Chem, Subject.ICT, Subject.Phys],
                3,
            ),
            hkuElectiveReq,
        ),
        weighting: bba5,
    },
    {
        id: "JS6808",
        requirement: select(
            hku454,
            hkuElectiveReq,
            hkuElectiveReq,
            hkuElectiveReq,
        ),
        weighting: bba6,
    },
    {
        id: "JS6810",
        requirement: select(
            hku453,
            hkuElectiveReq,
            hkuElectiveReq,
            hkuElectiveReq,
        ),
        weighting: sequence(discardCategoryC, hkuConfig, chooseBest(6)),
    },
    {
        id: "JS6822",
        requirement: select(hku332, hkuElectiveReq, hkuElectiveReq),
        weighting: sequence(hkuConfig, catCorM12, chooseBest(5)),
    },
    {
        id: "JS6846",
        requirement: select(
            hku343,
            minimumOne(
                [
                    Subject.Bio,
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.Econ,
                    Subject.ICT,
                    Subject.Phys,
                ],
                3,
            ),
            hkuElectiveReq,
        ),
        weighting: bba5,
    },
    {
        id: "JS6858",
        requirement: select(
            hku452,
            minimumOne([Subject.Bio, Subject.Chem, Subject.Phys], 3),
            hkuElectiveReq,
        ),
        weighting: sequence(
            discardCategoryC,
            hkuConfig,
            select(
                sequence(choose(Subject.Eng), multiplyAll(2)),
                sequence(
                    chooseSome(1, Subject.Maths, Subject.M1, Subject.M2),
                    multiplyAll(2),
                ),
                sequence(
                    chooseSome(1, Subject.Bio, Subject.Chem, Subject.Phys),
                    multiplyAll(2),
                ),
                chooseBest(3),
            ),
        ),
    },
    {
        id: "JS6860",
        requirement: select(
            hku343,
            hkuElectiveReq,
            hkuElectiveReq,
            hkuElectiveReq,
        ),
        weighting: bba6,
    },
    {
        id: "JS6884",
        requirement: select(
            hku343,
            minimumOne([Subject.M1, Subject.M2], 3),
            hkuElectiveReq,
        ),
        weighting: sequence(
            discardCategoryC,
            hkuConfig,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                    [Subject.Maths]: 1.25,
                    [Subject.M1]: 1.25,
                    [Subject.M2]: 1.25,
                }),
            ),
            select(
                choose(Subject.Eng, Subject.Maths),
                chooseSome(1, Subject.M1, Subject.M2),
                chooseBest(3),
                extraSubject2,
            ),
        ),
    },
    {
        id: "JS6896",
        requirement: select(
            hku354,
            hkuElectiveReq,
            hkuElectiveReq,
            hkuElectiveReq,
        ),
        weighting: bba6,
    },
    {
        id: "JS6901",
        requirement: select(
            hku332,
            minimumOne([Subject.Bio, Subject.Chem, Subject.Phys], 3),
            hkuElectiveReq,
        ),
        weighting: sequence(
            discardCategoryC,
            hkuConfig,
            modify(
                multiply({
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                }),
            ),
            select(
                choose(Subject.Eng, Subject.Maths),
                chooseSome(1, Subject.Bio, Subject.Chem, Subject.Phys),
                chooseBest(2),
            ),
        ),
    },
    {
        id: "JS6925",
        requirement: select(
            hku333,
            minimumOne([Subject.Bio, Subject.Chem, Subject.Phys], 3),
            hkuElectiveReq,
        ),
        weighting: engg,
    },
    {
        id: "JS6937",
        requirement: select(
            hku344,
            minimumOne([Subject.Bio, Subject.Chem, Subject.Phys], 3),
            hkuElectiveReq,
        ),
        weighting: engg,
    },
    {
        id: "JS6949",
        requirement: select(
            hku342,
            minimumOne([Subject.Bio, Subject.Chem], 3),
            hkuElectiveReq,
            hkuElectiveReq,
        ),
        weighting: sequence(discardCategoryC, hkuConfig, chooseBest(6)),
    },
    {
        id: "JS6951",
        requirement: select(
            hku333,
            minimumOne([Subject.Bio, Subject.Chem, Subject.Phys], 3),
            hkuElectiveReq,
        ),
        weighting: engg,
    },
    {
        id: "JS6963",
        requirement: select(
            hku333,
            minimumOne([Subject.Bio, Subject.Chem, Subject.Phys], 3),
            hkuElectiveReq,
        ),
        weighting: engg,
    },
]
