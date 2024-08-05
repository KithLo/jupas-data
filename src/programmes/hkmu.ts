import { modify, or, select, sequence } from "../calculations"
import { minimum, minimumOne, requireMultiple } from "../requirements"
import {
    categoryASubjects,
    categoryBSubjects,
    categoryCSubjects,
    Subject,
} from "../subjects"
import { Programme } from "../types"
import { chooseBest, multiply, scaleSubjects } from "../weightings"

const muRequirement = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 2,
        [Subject.CS]: 1,
    }),
    requireMultiple(
        2,
        or(
            minimumOne(categoryASubjects, 2),
            minimumOne(categoryBSubjects, 1),
            minimumOne(categoryCSubjects, 1),
        ),
    ),
)

const muConfig = sequence(
    scaleSubjects(categoryASubjects, { 1: 0 }),
    scaleSubjects(categoryBSubjects, {
        3: 4,
        2: 3,
        1: 2,
    }),
    scaleSubjects(categoryCSubjects, {
        5: 6,
        4: 5,
        3: 4,
        2: 3,
        1: 2,
    }),
    scaleSubjects([Subject.CS], { 1: 2 }),
)

export const hkmuProgrammes: Programme[] = [
    {
        id: "JS9009",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9010",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9011",
        requirement: muRequirement,
        weighting: sequence(
            muConfig,
            modify(multiply({ [Subject.Chi]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9013",
        requirement: muRequirement,
        weighting: sequence(
            muConfig,
            modify(multiply({ [Subject.Chi]: 1.5, [Subject.Eng]: 1.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9016",
        requirement: muRequirement,
        weighting: sequence(
            muConfig,
            modify(multiply({ [Subject.Chi]: 1.5, [Subject.Eng]: 1.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9019",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9220",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9223",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9230",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9240",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9262",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9266",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9280",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9291",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9294",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9520",
        requirement: muRequirement,
        weighting: sequence(
            muConfig,
            modify(multiply({ [Subject.Chi]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9530",
        requirement: muRequirement,
        weighting: sequence(
            muConfig,
            modify(multiply({ [Subject.Eng]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9540",
        requirement: muRequirement,
        weighting: sequence(
            muConfig,
            modify(multiply({ [Subject.Eng]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9550",
        requirement: muRequirement,
        weighting: sequence(
            muConfig,
            modify(multiply({ [Subject.Chi]: 2, [Subject.ChiLit]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9560",
        requirement: muRequirement,
        weighting: sequence(
            muConfig,
            modify(multiply({ [Subject.Chi]: 2, [Subject.ChiLit]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9580",
        requirement: muRequirement,
        weighting: sequence(
            muConfig,
            modify(multiply({ [Subject.Apl704]: 2, [Subject.Apl665]: 2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS9719",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9720",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9731",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9732",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JS9733",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
]
