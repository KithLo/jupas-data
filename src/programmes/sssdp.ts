import { modify, select, sequence } from "../calculations"
import {
    createMapGrades,
    mapCatA_Normal,
    mapCatA_Normal_X1,
    mapCatB_430,
    mapCatB_432,
    mapCatC_33322,
    mapCatC_54321,
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
import {
    choose,
    chooseBest,
    discardCategoryB,
    discardCategoryC,
    discardCS,
    multiply,
    multiplyAll,
    w3C2X,
} from "../weightings"

const basicWeighting = discardCS

const basicMapGrades = createMapGrades([
    [categoryASubjects, mapCatA_Normal],
    [categoryBSubjects, mapCatB_432],
    [categoryCSubjects, mapCatC_54321],
    [passFailSubjects, mapPassFail],
])

const sfuWeighting = sequence(discardCS, discardCategoryC, chooseBest(5))

const sfuMapGrades = createMapGrades([
    [categoryASubjects, mapCatA_Normal_X1],
    [categoryBSubjects, mapCatB_432],
    [passFailSubjects, mapPassFail],
])

const hsuhkWeighting = discardCS

const hsuhkMapGrades = basicMapGrades

const twcWeighting = sequence(discardCS, discardCategoryC, chooseBest(5))

const twcMapGrades = createMapGrades([
    [categoryASubjects, mapCatA_Normal],
    [categoryBSubjects, mapCatB_432],
    [passFailSubjects, mapPassFail],
])

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

const muConfig = sequence()

const muMapGrades = createMapGrades([
    [categoryASubjects, mapCatA_Normal_X1],
    [categoryBSubjects, mapCatB_432],
    [categoryCSubjects, mapCatC_65432],
    [passFailSubjects, mapPassFail],
])

const theiConfig = w3C2X

const theiMapGrades = createMapGrades([
    [categoryASubjects, mapCatA_Normal],
    [categoryBSubjects, mapCatB_432],
    [categoryCSubjects, mapCatC_33322],
    [passFailSubjects, mapPassFail],
])

const uowchkConfig = sequence(discardCS, chooseBest(5))

const uowchkMapGrades = basicMapGrades

const hksyuConfig = sequence(discardCS, chooseBest(5))

const hksyuMapGrades = createMapGrades([
    [categoryASubjects, mapCatA_Normal],
    [categoryBSubjects, mapCatB_430],
    [categoryCSubjects, mapCatC_54321],
    [passFailSubjects, mapPassFail],
])

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
        mapGrades: sfuMapGrades,
        requirement: basicRequirement,
        weighting: sequence(discardCategoryB, sfuWeighting),
    },
    {
        id: "JSSA02",
        mapGrades: sfuMapGrades,
        requirement: basicRequirement,
        weighting: sfuWeighting,
    },
    {
        id: "JSSA03",
        mapGrades: sfuMapGrades,
        requirement: basicRequirement,
        weighting: sequence(discardCategoryB, sfuWeighting),
    },
    {
        id: "JSSA04",
        mapGrades: sfuMapGrades,
        requirement: basicRequirement,
        weighting: sfuWeighting,
    },
    {
        id: "JSSA05",
        mapGrades: sfuMapGrades,
        requirement: basicRequirement,
        weighting: sfuWeighting,
    },
    {
        id: "JSSA06",
        mapGrades: sfuMapGrades,
        requirement: basicRequirement,
        weighting: sfuWeighting,
    },
    {
        id: "JSSC02",
        mapGrades: basicMapGrades,
        requirement: basicRequirement,
        weighting: basicWeighting,
    },
    {
        id: "JSSH01",
        mapGrades: hsuhkMapGrades,
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
        mapGrades: hsuhkMapGrades,
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
        mapGrades: hsuhkMapGrades,
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
        mapGrades: hsuhkMapGrades,
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
        mapGrades: hsuhkMapGrades,
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
        mapGrades: hsuhkMapGrades,
        requirement: basicRequirement,
        weighting: sequence(hsuhkWeighting, chooseBest(5)),
    },
    {
        id: "JSST01",
        mapGrades: twcMapGrades,
        requirement: basicRequirement,
        weighting: twcWeighting,
    },
    {
        id: "JSST02",
        mapGrades: twcMapGrades,
        requirement: basicRequirement,
        weighting: twcWeighting,
    },
    {
        id: "JSST03",
        mapGrades: twcMapGrades,
        requirement: basicRequirement,
        weighting: twcWeighting,
    },
    {
        id: "JSST04",
        mapGrades: twcMapGrades,
        requirement: basicRequirement,
        weighting: twcWeighting,
    },
    {
        id: "JSST05",
        mapGrades: twcMapGrades,
        requirement: basicRequirement,
        weighting: twcWeighting,
    },
    {
        id: "JSST06",
        mapGrades: twcMapGrades,
        requirement: basicRequirement,
        weighting: twcWeighting,
    },
    {
        id: "JSST07",
        mapGrades: twcMapGrades,
        requirement: basicRequirement,
        weighting: twcWeighting,
    },
    {
        id: "JSSU12",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(
            muConfig,
            modify(multiply({ [Subject.Chi]: 1.5, [Subject.Eng]: 1.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JSSU14",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU15",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU18",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU40",
        mapGrades: muMapGrades,
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
        mapGrades: muMapGrades,
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
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU61",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU67",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU68",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU69",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU70",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU72",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU77",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU78",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU79",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU90",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU93",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU95",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU96",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSU97",
        mapGrades: muMapGrades,
        requirement: muRequirement,
        weighting: sequence(muConfig, chooseBest(5)),
    },
    {
        id: "JSSV01",
        mapGrades: theiMapGrades,
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV02",
        mapGrades: theiMapGrades,
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV03",
        mapGrades: theiMapGrades,
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV04",
        mapGrades: theiMapGrades,
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV05",
        mapGrades: theiMapGrades,
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV07",
        mapGrades: theiMapGrades,
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV08",
        mapGrades: theiMapGrades,
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV09",
        mapGrades: theiMapGrades,
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSV10",
        mapGrades: theiMapGrades,
        requirement: basicRequirement,
        weighting: theiConfig,
    },
    {
        id: "JSSW01",
        mapGrades: uowchkMapGrades,
        requirement: basicRequirement,
        weighting: uowchkConfig,
    },
    {
        id: "JSSW02",
        mapGrades: uowchkMapGrades,
        requirement: basicRequirement,
        weighting: uowchkConfig,
    },
    {
        id: "JSSY01",
        mapGrades: hksyuMapGrades,
        requirement: basicRequirement,
        weighting: hksyuConfig,
    },
]
