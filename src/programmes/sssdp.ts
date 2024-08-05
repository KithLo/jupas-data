import { modify, or, select, sequence } from "../calculations"
import { minimum, minimumOne, requireMultiple } from "../requirements"
import {
    categoryASubjects,
    categoryBSubjects,
    categoryCSubjects,
    Subject,
} from "../subjects"
import { Programme } from "../types"
import {
    choose,
    chooseBest,
    discardCategoryB,
    discardCategoryC,
    discardCS,
    multiply,
    multiplyAll,
    scaleSubjects,
    w3C2X,
} from "../weightings"

const basicWeighting = sequence(
    discardCS,
    scaleSubjects(categoryBSubjects, {
        3: 4,
        2: 3,
        1: 2,
    }),
)

const sfuWeighting = sequence(
    discardCS,
    discardCategoryC,
    scaleSubjects(categoryASubjects, {
        1: 0,
    }),
    scaleSubjects(categoryBSubjects, {
        3: 4,
        2: 3,
        1: 2,
    }),
    chooseBest(5),
)

const hsuhkWeighting = sequence(
    discardCS,
    scaleSubjects(categoryBSubjects, {
        3: 4,
        2: 3,
        1: 2,
    }),
)

const twcWeighting = sequence(
    discardCS,
    discardCategoryC,
    scaleSubjects(categoryBSubjects, {
        3: 4,
        2: 3,
        1: 2,
    }),
    chooseBest(5),
)

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

const theiConfig = sequence(
    scaleSubjects(categoryBSubjects, {
        3: 4,
        2: 3,
        1: 2,
    }),
    scaleSubjects(categoryCSubjects, {
        5: 3,
        4: 3,
        3: 3,
        2: 2,
        1: 2,
    }),
    scaleSubjects([Subject.CS], { 1: 2 }),
    w3C2X,
)

const uowchkConfig = sequence(
    discardCS,
    scaleSubjects(categoryBSubjects, {
        3: 4,
        2: 3,
        1: 2,
    }),
    chooseBest(5),
)

const hksyuConfig = sequence(
    discardCS,
    scaleSubjects(categoryBSubjects, {
        3: 4,
        2: 3,
        1: 0,
    }),
    chooseBest(5),
)

const basicRequirement = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 2,
        [Subject.CS]: 1,
    }),
    minimumOne(categoryASubjects, 2),
)

export const sssdpProgrammes: Programme[] = [
    {
        id: "JSSA01",
        requirement: basicRequirement,
        weighting: sequence(discardCategoryB, sfuWeighting),
    },
    {
        id: "JSSA02",
        requirement: basicRequirement,
        weighting: sfuWeighting,
    },
    {
        id: "JSSA03",
        requirement: basicRequirement,
        weighting: sequence(discardCategoryB, sfuWeighting),
    },
    {
        id: "JSSA04",
        requirement: basicRequirement,
        weighting: sfuWeighting,
    },
    {
        id: "JSSA05",
        requirement: basicRequirement,
        weighting: sfuWeighting,
    },
    {
        id: "JSSA06",
        requirement: basicRequirement,
        weighting: sfuWeighting,
    },
    {
        id: "JSSC02",
        requirement: basicRequirement,
        weighting: basicWeighting,
    },
    {
        id: "JSSH01",
        requirement: basicRequirement,
        weighting: sequence(
            hsuhkWeighting,
            discardCategoryB,
            discardCategoryC,
            modify(
                multiply({
                    [Subject.Chi]: 7,
                    [Subject.Eng]: 10,
                    [Subject.Maths]: 10,
                    [Subject.Bio]: 7,
                    [Subject.BAFS]: 10,
                    [Subject.Chem]: 7,
                    [Subject.Econ]: 10,
                    [Subject.Geog]: 10,
                    [Subject.ICT]: 10,
                    [Subject.M1]: 10,
                    [Subject.M2]: 10,
                    [Subject.Phys]: 10,
                }),
                multiplyAll(5),
            ),
            select(choose(Subject.Eng, Subject.Maths), chooseBest(3)),
        ),
    },
    {
        id: "JSSH02",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
            }),
            minimumOne(categoryASubjects, 2),
        ),
        weighting: sequence(
            hsuhkWeighting,
            discardCategoryB,
            discardCategoryC,
            modify(
                multiply({
                    [Subject.Chi]: 7,
                    [Subject.Eng]: 10,
                    [Subject.Maths]: 10,
                    [Subject.Bio]: 7,
                    [Subject.BAFS]: 10,
                    [Subject.Chem]: 7,
                    [Subject.Econ]: 10,
                    [Subject.ICT]: 7,
                    [Subject.M1]: 10,
                    [Subject.M2]: 10,
                    [Subject.Phys]: 10,
                }),
                multiplyAll(5),
            ),
            select(choose(Subject.Eng, Subject.Maths), chooseBest(3)),
        ),
    },
    {
        id: "JSSH03",
        requirement: basicRequirement,
        weighting: sequence(
            hsuhkWeighting,
            modify(
                multiply({
                    [Subject.Chi]: 7,
                    [Subject.Eng]: 7,
                    [Subject.Maths]: 10,
                    [Subject.Bio]: 7,
                    [Subject.BAFS]: 10,
                    [Subject.Chem]: 7,
                    [Subject.Econ]: 10,
                    [Subject.ICT]: 10,
                    [Subject.M1]: 10,
                    [Subject.M2]: 10,
                    [Subject.Phys]: 10,
                }),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JSSH04",
        requirement: basicRequirement,
        weighting: sequence(
            hsuhkWeighting,
            discardCategoryB,
            discardCategoryC,
            select(choose(Subject.Maths), chooseBest(4)),
        ),
    },
    {
        id: "JSSH05",
        requirement: basicRequirement,
        weighting: sequence(
            hsuhkWeighting,
            modify(
                multiply({
                    [Subject.Chi]: 7,
                    [Subject.Eng]: 10,
                    [Subject.Maths]: 10,
                    [Subject.Bio]: 7,
                    [Subject.BAFS]: 10,
                    [Subject.Chem]: 7,
                    [Subject.DAT]: 7,
                    [Subject.Econ]: 10,
                    [Subject.Geog]: 10,
                    [Subject.ICT]: 10,
                    [Subject.M1]: 10,
                    [Subject.M2]: 10,
                    [Subject.Phys]: 10,
                }),
                multiplyAll(5),
            ),
            select(choose(Subject.Eng, Subject.Maths), chooseBest(3)),
        ),
    },
    {
        id: "JSSH06",
        requirement: basicRequirement,
        weighting: sequence(hsuhkWeighting, chooseBest(5)),
    },
    {
        id: "JSST01",
        requirement: basicRequirement,
        weighting: twcWeighting,
    },
    {
        id: "JSST02",
        requirement: basicRequirement,
        weighting: twcWeighting,
    },
    {
        id: "JSST03",
        requirement: basicRequirement,
        weighting: twcWeighting,
    },
    {
        id: "JSST04",
        requirement: basicRequirement,
        weighting: twcWeighting,
    },
    {
        id: "JSST05",
        requirement: basicRequirement,
        weighting: twcWeighting,
    },
    {
        id: "JSST06",
        requirement: basicRequirement,
        weighting: twcWeighting,
    },
    {
        id: "JSST07",
        requirement: basicRequirement,
        weighting: twcWeighting,
    },
    {
        id: "JSSU12",
        requirement: muRequirement,
        weighting: sequence(
            muConfig,
            modify(multiply({ [Subject.Chi]: 1.5, [Subject.Eng]: 1.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JSSU14",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU15",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU18",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU40",
        requirement: muRequirement,
        weighting: sequence(
            muConfig,
            modify(
                multiply({
                    [Subject.Bio]: 1.2,
                    [Subject.Chem]: 1.2,
                    [Subject.HMSC]: 1.2,
                    [Subject.Phys]: 1.2,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JSSU50",
        requirement: muRequirement,
        weighting: sequence(
            muConfig,
            modify(
                multiply({
                    [Subject.Bio]: 1.2,
                    [Subject.Chem]: 1.2,
                    [Subject.HMSC]: 1.2,
                    [Subject.Phys]: 1.2,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JSSU55",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU61",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU67",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU68",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU69",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU70",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU72",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU77",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU78",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU79",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU90",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU95",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU96",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU97",
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSV01",
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV02",
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV03",
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV04",
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV05",
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV07",
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV08",
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV09",
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV10",
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSW01",
        requirement: basicRequirement,
        weighting: uowchkConfig,
    },
    {
        id: "JSSW02",
        requirement: basicRequirement,
        weighting: uowchkConfig,
    },
    {
        id: "JSSY01",
        requirement: basicRequirement,
        weighting: hksyuConfig,
    },
]
