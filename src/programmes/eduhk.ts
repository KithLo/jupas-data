import { modify, or, select, sequence } from "../calculations"
import {
    createMapGrades,
    mapCatA_Normal,
    mapCatB_430,
    mapCatC_eduhk,
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
import { chooseBest, discardCS, multiply } from "../weightings"

const mapGrades = createMapGrades([
    [categoryASubjects, mapCatA_Normal],
    [categoryBSubjects, mapCatB_430],
    [categoryCSubjects, mapCatC_eduhk],
    [passFailSubjects, mapPassFail],
])

const eduhkCoreReq = minimum({
    [Subject.Chi]: 3,
    [Subject.Eng]: 3,
    [Subject.Maths]: 2,
    [Subject.CS]: 2,
})

const eduhkElectiveReq = or(
    minimumOne(categoryASubjects, 2),
    minimumOne(categoryBSubjects, 3),
    minimumOne(categoryCSubjects, 3),
    minimumOne(passFailSubjects, 2),
)

const eduhkCommonReq = select(
    eduhkCoreReq,
    requireMultiple(2, eduhkElectiveReq),
)

export const eduhkProgrammes: Programme[] = [
    {
        id: "JS8001",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Music]: 1.5,
                    [Subject.Apl710]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8002",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.VA]: 1.5,
                    [Subject.Apl668]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8003",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Chi]: 1.5,
                    [Subject.Eng]: 1.5,
                    [Subject.ChiLit]: 1.5,
                    [Subject.ICT]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8004",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                    [Subject.ICT]: 1.5,
                    [Subject.EngLit]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8005",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.ChiHist]: 1.5,
                    [Subject.Hist]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8006",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Chi]: 1.5,
                    [Subject.Eng]: 1.5,
                    [Subject.Apl704]: 1.5,
                    [Subject.Apl665]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8007",
        mapGrades,
        requirement: select(
            eduhkCoreReq,
            minimumOne([Subject.Econ, Subject.BAFS], 3),
            eduhkElectiveReq,
        ),
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.BAFS]: 1.5,
                    [Subject.Econ]: 1.5,
                    [Subject.Apl703]: 1.5,
                    [Subject.Apl720]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8008",
        mapGrades,
        requirement: select(
            eduhkCoreReq,
            minimumOne(
                [Subject.ICT, Subject.Bio, Subject.Chem, Subject.Phys],
                3,
            ),
            eduhkElectiveReq,
        ),
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                    [Subject.ICT]: 1.5,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                    [Subject.Apl669]: 1.5,
                    [Subject.Apl722]: 1.5,
                    [Subject.Apl684]: 1.5,
                    [Subject.Apl706]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8009",
        mapGrades,
        requirement: select(
            eduhkCoreReq,
            minimumOne(
                [
                    Subject.ICT,
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Phys,
                    Subject.M1,
                    Subject.M2,
                ],
                2,
            ),
            eduhkElectiveReq,
        ),
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                    [Subject.Phys]: 1.5,
                    [Subject.Apl722]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8010",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.PE]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8011",
        mapGrades,
        requirement: select(
            eduhkCoreReq,
            minimumOne([Subject.Bio, Subject.Chem, Subject.Phys], 4),
            eduhkElectiveReq,
        ),
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Chem]: 1.5,
                    [Subject.Bio]: 1.3,
                    [Subject.Phys]: 1.2,
                    [Subject.Maths]: 1.1,
                    [Subject.M1]: 1.1,
                    [Subject.M2]: 1.1,
                    [Subject.Geog]: 1.1,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8012",
        mapGrades,
        requirement: select(
            eduhkCoreReq,
            minimumOne([Subject.Geog, Subject.THS], 3),
            eduhkElectiveReq,
        ),
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                    [Subject.Geog]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8013",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.ChiHist]: 1.5,
                    [Subject.Econ]: 1.5,
                    [Subject.Geog]: 1.5,
                    [Subject.Hist]: 1.5,
                    [Subject.Apl704]: 1.5,
                    [Subject.Apl665]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8507",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 2,
                [Subject.Eng]: 2,
            }),
            requireMultiple(3, eduhkElectiveReq),
        ),
        weighting: sequence(
            modify(
                multiply({
                    [Subject.Chi]: 1.5,
                    [Subject.Eng]: 1.5,
                    [Subject.Apl704]: 1.5,
                    [Subject.Apl665]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8651",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(discardCS, chooseBest(5)),
    },
    {
        id: "JS8663",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Chi]: 1.5,
                    [Subject.Eng]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8674",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Chi]: 1.5,
                    [Subject.Eng]: 1.5,
                    [Subject.ICT]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8675",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                    [Subject.ICT]: 1.5,
                    [Subject.EngLit]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8685",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Music]: 1.5,
                    [Subject.Apl710]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8686",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.VA]: 1.5,
                    [Subject.Apl668]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8687",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Chi]: 1.5,
                    [Subject.Eng]: 1.5,
                    [Subject.ChiHist]: 1.5,
                    [Subject.DAT]: 1.5,
                    [Subject.Hist]: 1.5,
                    [Subject.VA]: 1.5,
                    [Subject.Apl710]: 1.5,
                    [Subject.Apl599]: 1.5,
                    [Subject.Apl677]: 1.5,
                    [Subject.Apl718]: 1.5,
                    [Subject.Apl711]: 1.5,
                    [Subject.Apl702]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8688",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(discardCS, chooseBest(5)),
    },
    {
        id: "JS8702",
        mapGrades,
        requirement: select(
            eduhkCoreReq,
            minimumOne(
                [Subject.Bio, Subject.Chem, Subject.Phys, Subject.Geog],
                2,
            ),
            eduhkElectiveReq,
        ),
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Bio]: 1.6,
                    [Subject.Chem]: 1.6,
                    [Subject.Geog]: 1.2,
                    [Subject.Maths]: 1.2,
                    [Subject.M1]: 1.2,
                    [Subject.M2]: 1.2,
                    [Subject.Phys]: 1.1,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8714",
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
                    Subject.ICT,
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Phys,
                    Subject.M1,
                    Subject.M2,
                ],
                2,
            ),
            eduhkElectiveReq,
        ),
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                    [Subject.DAT]: 1.5,
                    [Subject.ICT]: 1.5,
                    [Subject.Apl669]: 1.5,
                    [Subject.Apl707]: 1.5,
                    [Subject.Apl720]: 1.5,
                    [Subject.Apl693]: 1.5,
                    [Subject.Apl730]: 1.5,
                    [Subject.Apl722]: 1.5,
                    [Subject.Apl684]: 1.5,
                    [Subject.Apl727]: 1.5,
                    [Subject.Apl714]: 1.5,
                    [Subject.Apl706]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8726",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Bio]: 2,
                    [Subject.PE]: 2,
                    [Subject.Chi]: 1.5,
                    [Subject.Eng]: 1.5,
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                    [Subject.DAT]: 1.5,
                    [Subject.ICT]: 1.5,
                    [Subject.Apl662]: 1.5,
                    [Subject.Apl674]: 1.5,
                    [Subject.Apl627]: 1.5,
                    [Subject.Apl660]: 1.5,
                    [Subject.Apl691]: 1.5,
                    [Subject.Apl669]: 1.5,
                    [Subject.Apl713]: 1.5,
                    [Subject.Apl722]: 1.5,
                    [Subject.Apl714]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8727",
        mapGrades,
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            modify(
                multiply({
                    [Subject.Chi]: 1.5,
                    [Subject.Eng]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
]
