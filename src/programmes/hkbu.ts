import { difference } from "rambda"
import { modify, or, select, sequence } from "../calculations"
import {
    createMapGrades,
    mapCatA_Normal,
    mapCatB_430,
    mapCatC_hkbu,
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
import { Programme } from "../types"
import {
    chooseBest,
    discardCategoryB,
    discardCategoryBExcept,
    discardCategoryC,
    discardCS,
    multiply,
} from "../weightings"

const mapGrades = createMapGrades([
    [categoryASubjects, mapCatA_Normal],
    [categoryBSubjects, mapCatB_430],
    [categoryCSubjects, mapCatC_hkbu],
    [passFailSubjects, mapPassFail],
])

const hkbuConfig = discardCS

const r332 = minimum({
    [Subject.Chi]: 3,
    [Subject.Eng]: 3,
    [Subject.Maths]: 2,
    [Subject.CS]: 1,
})

const catMA3 = minimumOne(categoryASubjects, 3)
const catA3 = minimumOne(
    difference(categoryASubjects, [Subject.M1, Subject.M2]),
    3,
)
const catMAC3 = minimumOne([...categoryASubjects, ...categoryCSubjects], 3)
const catMAB3 = or(catMA3, minimumOne(categoryBSubjects, 2))
const catMABC3 = or(catMAC3, minimumOne(categoryBSubjects, 2))

const js2020Apl = [
    Subject.Apl662,
    Subject.Apl691,
    Subject.Apl718,
    Subject.Apl702,
    Subject.Apl708,
    Subject.Apl669,
    Subject.Apl707,
    Subject.Apl677,
    Subject.Apl719,
]

const js2025Apl = [
    Subject.Apl723,
    Subject.Apl665,
    Subject.Apl662,
    Subject.Apl691,
]

const js2310Apl = [
    Subject.Apl669,
    Subject.Apl676,
    Subject.Apl707,
    Subject.Apl710,
    Subject.Apl702,
    Subject.Apl708,
    Subject.Apl715,
    Subject.Apl716,
    Subject.Apl718,
    Subject.Apl719,
    Subject.Apl723,
    Subject.Apl726,
    Subject.Apl725,
    Subject.Apl693,
    Subject.Apl672,
    Subject.Apl681,
    Subject.Apl720,
    Subject.Apl662,
    Subject.Apl691,
    Subject.Apl712,
    Subject.Apl713,
    Subject.Apl684,
    Subject.Apl706,
    Subject.Apl714,
    Subject.Apl722,
]

const js2370Apl = [
    Subject.Apl668,
    Subject.Apl669,
    Subject.Apl677,
    Subject.Apl718,
    Subject.Apl719,
    Subject.Apl720,
    Subject.Apl714,
    Subject.Apl722,
]

const js2620Apl = [Subject.Apl674, Subject.Apl627]

const js2330Apl = [
    Subject.Apl668,
    Subject.Apl669,
    Subject.Apl676,
    Subject.Apl677,
    Subject.Apl707,
    Subject.Apl702,
    Subject.Apl708,
    Subject.Apl711,
    Subject.Apl719,
]

export const hkbuProgrammes: Programme[] = [
    {
        id: "JS2020",
        mapGrades,
        requirement: select(r332, catA3, or(catMAC3, minimumOne(js2020Apl, 2))),
        weighting: sequence(
            discardCategoryBExcept(...js2020Apl),
            hkbuConfig,
            chooseBest(5),
        ),
    },
    {
        id: "JS2025",
        mapGrades,
        requirement: select(r332, catA3, or(catMAC3, minimumOne(js2025Apl, 2))),
        weighting: sequence(
            discardCategoryBExcept(...js2025Apl),
            hkbuConfig,
            chooseBest(5),
        ),
    },
    {
        id: "JS2060",
        mapGrades,
        requirement: select(r332, catA3, catMABC3),
        weighting: sequence(hkbuConfig, chooseBest(5)),
    },
    {
        id: "JS2110",
        mapGrades,
        requirement: select(r332, catA3, catMAB3),
        weighting: sequence(
            hkbuConfig,
            modify(multiply({ [Subject.Eng]: 1.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS2120",
        mapGrades,
        requirement: select(r332, catA3, catMAB3),
        weighting: sequence(
            hkbuConfig,
            modify(multiply({ [Subject.Eng]: 1.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS2310",
        mapGrades,
        requirement: select(r332, catA3, or(catMAC3, minimumOne(js2310Apl, 2))),
        weighting: sequence(
            hkbuConfig,
            discardCategoryBExcept(...js2310Apl),
            modify(multiply({ [Subject.Chi]: 1.25, [Subject.Eng]: 1.25 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS2330",
        mapGrades,
        requirement: select(r332, catA3, or(catMAC3, minimumOne(js2330Apl, 2))),
        weighting: sequence(
            hkbuConfig,
            discardCategoryBExcept(...js2330Apl),
            modify(multiply({ [Subject.Chi]: 1.25, [Subject.Eng]: 1.25 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS2340",
        mapGrades,
        requirement: select(r332, catA3, catMABC3),
        weighting: sequence(hkbuConfig, chooseBest(5)),
    },
    {
        id: "JS2370",
        mapGrades,
        requirement: select(r332, catA3, or(catMAC3, minimumOne(js2370Apl, 2))),
        weighting: sequence(
            hkbuConfig,
            discardCategoryBExcept(...js2370Apl),
            modify(
                multiply({
                    [Subject.Eng]: 1.25,
                    [Subject.Maths]: 1.1,
                    [Subject.VA]: 1.15,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS2410",
        mapGrades,
        requirement: select(
            r332,
            minimumOne([Subject.Bio, Subject.Chem], 3),
            catMA3,
        ),
        weighting: sequence(
            hkbuConfig,
            discardCategoryB,
            discardCategoryC,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                    [Subject.Maths]: 1.5,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS2420",
        mapGrades,
        requirement: select(r332, minimumOne([Subject.Chem], 3), catMA3),
        weighting: sequence(
            hkbuConfig,
            discardCategoryB,
            discardCategoryC,
            modify(
                multiply({
                    [Subject.Chi]: 1.5,
                    [Subject.Eng]: 1.5,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS2510",
        mapGrades,
        requirement: select(r332, catA3, catMABC3),
        weighting: sequence(hkbuConfig, chooseBest(5)),
    },
    {
        id: "JS2610",
        mapGrades,
        requirement: select(r332, catA3, catMAC3),
        weighting: sequence(
            hkbuConfig,
            discardCategoryB,
            modify(multiply({ [Subject.Eng]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS2620",
        mapGrades,
        requirement: select(r332, catA3, or(catMA3, minimumOne(js2620Apl, 2))),
        weighting: sequence(
            hkbuConfig,
            discardCategoryC,
            discardCategoryBExcept(...js2620Apl),
            modify(
                multiply({
                    [Subject.Eng]: 1.25,
                    [Subject.Maths]: 1.1,
                    [Subject.VA]: 1.15,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS2660",
        mapGrades,
        requirement: select(r332, catA3, catMABC3),
        weighting: sequence(
            hkbuConfig,
            modify(multiply({ [Subject.Eng]: 2, [Subject.HMSC]: 1.1 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS2810",
        mapGrades,
        requirement: select(r332, catA3, catMABC3),
        weighting: sequence(hkbuConfig, chooseBest(5)),
    },
    {
        id: "JS2910",
        mapGrades,
        requirement: select(r332, catA3, catMABC3),
        weighting: sequence(hkbuConfig, chooseBest(5)),
    },
    {
        id: "JS2920",
        mapGrades,
        requirement: select(r332, catA3, catMABC3),
        weighting: sequence(
            hkbuConfig,
            modify(multiply({ [Subject.Maths]: 1.2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS2930",
        mapGrades,
        requirement: select(r332, catA3, catMABC3),
        weighting: sequence(hkbuConfig, chooseBest(5)),
    },
    {
        id: "JS2940",
        mapGrades,
        requirement: select(r332, catA3, catMABC3),
        weighting: sequence(hkbuConfig, chooseBest(5)),
    },
    {
        id: "JS2950",
        mapGrades,
        requirement: select(r332, catA3, catMABC3),
        weighting: sequence(hkbuConfig, chooseBest(5)),
    },
]
