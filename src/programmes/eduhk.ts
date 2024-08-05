import { modify, or, select, sequence } from "../calculations"
import { minimum, minimumOne, requireMultiple } from "../requirements"
import {
    categoryASubjects,
    categoryBSubjects,
    categoryCSubjects,
    passFailSubjects,
    Subject,
} from "../subjects"
import { Programme } from "../types"
import { chooseBest, discardCS, multiply, scaleSubjects } from "../weightings"

const eduhkCoreReq = minimum({
    [Subject.Chi]: 3,
    [Subject.Eng]: 3,
    [Subject.Maths]: 2,
    [Subject.CS]: 1,
})

const eduhkElectiveReq = or(
    minimumOne(categoryASubjects, 2),
    minimumOne(categoryBSubjects, 2),
    minimumOne(categoryCSubjects, 1),
    minimumOne(passFailSubjects, 1),
)

const eduhkCommonReq = select(
    eduhkCoreReq,
    requireMultiple(2, eduhkElectiveReq),
)

const eduhkConfig = sequence(
    scaleSubjects(categoryBSubjects, {
        3: 4,
        2: 3,
        1: 0,
    }),
    scaleSubjects(categoryCSubjects, {
        5: 7,
        4: 6,
        3: 5,
        2: 4,
        1: 3,
    }),
    scaleSubjects([Subject.CS], { 1: 2 }),
)

export const eduhkProgrammes: Programme[] = [
    {
        id: "JS8105",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
            modify(
                multiply({
                    [Subject.Chi]: 1.5,
                    [Subject.Eng]: 1.5,
                    [Subject.ChiLit]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8222",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                    [Subject.EngLit]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8234",
        requirement: eduhkCommonReq,
        weighting: sequence(eduhkConfig, chooseBest(5)),
    },
    {
        id: "JS8246",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.CS]: 1,
            }),
            or(
                select(
                    minimum({ [Subject.Maths]: 3 }),
                    minimumOne([Subject.M1, Subject.M2], 2),
                ),
                select(minimum({ [Subject.Maths]: 5 }), eduhkElectiveReq),
            ),
            eduhkElectiveReq,
        ),
        weighting: sequence(
            discardCS,
            eduhkConfig,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
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
        id: "JS8325",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
            modify(
                multiply({
                    [Subject.PE]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8361",
        requirement: select(
            eduhkCoreReq,
            minimumOne(
                [Subject.ICT, Subject.Bio, Subject.Chem, Subject.Phys],
                2,
            ),
            eduhkElectiveReq,
        ),
        weighting: sequence(
            discardCS,
            eduhkConfig,
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
        id: "JS8371",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
            modify(
                multiply({
                    [Subject.BAFS]: 1.2,
                    [Subject.Apl703]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8381",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
            modify(
                multiply({
                    [Subject.Hist]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8404",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
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
        id: "JS8428",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
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
        id: "JS8430",
        requirement: select(
            eduhkCoreReq,
            minimumOne([Subject.Bio, Subject.Chem, Subject.Phys], 4),
            eduhkElectiveReq,
        ),
        weighting: sequence(
            discardCS,
            eduhkConfig,
            modify(
                multiply({
                    [Subject.Bio]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8507",
        requirement: select(
            minimum({
                [Subject.Chi]: 2,
                [Subject.Eng]: 2,
            }),
            requireMultiple(3, eduhkElectiveReq),
        ),
        weighting: sequence(
            eduhkConfig,
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
        id: "JS8600",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
            modify(
                multiply({
                    [Subject.Chi]: 1.5,
                    [Subject.ChiLit]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8612",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                    [Subject.EngLit]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8636",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
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
        id: "JS8648",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
            modify(
                multiply({
                    [Subject.VA]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8651",
        requirement: eduhkCommonReq,
        weighting: sequence(discardCS, eduhkConfig, chooseBest(5)),
    },
    {
        id: "JS8663",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
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
        id: "JS8675",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
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
        id: "JS8687",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
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
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8702",
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
            eduhkConfig,
            modify(
                multiply({
                    [Subject.Maths]: 1.5,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Geog]: 1.5,
                    [Subject.Phys]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8714",
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
            eduhkConfig,
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
                    [Subject.Apl722]: 1.5,
                    [Subject.Apl706]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8726",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
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
                    [Subject.Apl669]: 1.5,
                    [Subject.Apl707]: 1.5,
                    [Subject.Apl708]: 1.5,
                    [Subject.Apl681]: 1.5,
                    [Subject.Apl662]: 1.5,
                    [Subject.Apl674]: 1.5,
                    [Subject.Apl627]: 1.5,
                    [Subject.Apl660]: 1.5,
                    [Subject.Apl691]: 1.5,
                    [Subject.Apl713]: 1.5,
                    [Subject.Apl722]: 1.5,
                    [Subject.Apl714]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS8801",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
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
        id: "JS8813",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
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
        id: "JS8825",
        requirement: eduhkCommonReq,
        weighting: sequence(
            discardCS,
            eduhkConfig,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                    [Subject.EngLit]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
]
