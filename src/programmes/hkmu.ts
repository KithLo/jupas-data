import { modify, select, sequence } from "../calculations"
import {
    createMapGrades,
    mapCatA_Normal_X1,
    mapCatB_432,
    mapCatC_65432,
    mapPassFail,
} from "../mapGrades"
import { minimum, minimumOne, requireMultiple } from "../requirements"
import {
    categoryASubjects,
    categoryBSubjects,
    categoryCSubjects,
    passFailSubjects,
    Subject,
} from "../subjects"
import { Programme } from "../types"
import { chooseBest, multiply } from "../weightings"

const muRequirement = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 2,
        [Subject.CS]: 1,
    }),
    requireMultiple(
        2,
        minimumOne(
            [...categoryASubjects, ...categoryBSubjects, ...categoryCSubjects],
            2,
        ),
    ),
)

const mapGrades = createMapGrades([
    [categoryASubjects, mapCatA_Normal_X1],
    [categoryBSubjects, mapCatB_432],
    [categoryCSubjects, mapCatC_65432],
    [passFailSubjects, mapPassFail],
])

export const hkmuProgrammes: Programme[] = [
    {
        id: "JS9009",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9010",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9011",
        mapGrades,
        requirement: muRequirement,
        weighting: sequence(
            modify(multiply({ [Subject.Chi]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9013",
        mapGrades,
        requirement: muRequirement,
        weighting: sequence(
            modify(multiply({ [Subject.Chi]: 1.5, [Subject.Eng]: 1.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9016",
        mapGrades,
        requirement: muRequirement,
        weighting: sequence(
            modify(multiply({ [Subject.Chi]: 1.5, [Subject.Eng]: 1.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9019",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9220",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9223",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9230",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9240",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9262",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9266",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9280",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9291",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9294",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9520",
        mapGrades,
        requirement: muRequirement,
        weighting: sequence(
            modify(multiply({ [Subject.Chi]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9530",
        mapGrades,
        requirement: muRequirement,
        weighting: sequence(
            modify(multiply({ [Subject.Eng]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9540",
        mapGrades,
        requirement: muRequirement,
        weighting: sequence(
            modify(multiply({ [Subject.Eng]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9550",
        mapGrades,
        requirement: muRequirement,
        weighting: sequence(
            modify(multiply({ [Subject.Chi]: 2, [Subject.ChiLit]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9560",
        mapGrades,
        requirement: muRequirement,
        weighting: sequence(
            modify(multiply({ [Subject.Chi]: 2, [Subject.ChiLit]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9580",
        mapGrades,
        requirement: muRequirement,
        weighting: sequence(
            modify(multiply({ [Subject.Apl704]: 2, [Subject.Apl665]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9719",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9720",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9731",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9732",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
    {
        id: "JS9733",
        mapGrades,
        requirement: muRequirement,
        weighting: chooseBest(5),
    },
]
