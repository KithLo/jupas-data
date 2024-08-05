import { evaulate, modify, or, select, sequence } from "../calculations"
import { minimum, minimumOne, requireMultiple } from "../requirements"
import {
    aplCivilElectricalAndMechanicalEngineering,
    aplDesignStudies,
    aplFilmsTvAndBroadcasting,
    aplInformationEngineering,
    aplMediaArts,
    aplMediaProductionAndPublicRelations,
    aplPerformingArts,
    aplPsychology,
    aplServicesEngineering,
    Subject,
    categoryASubjects,
    categoryCSubjects,
} from "../subjects"
import { Programme } from "../types"
import {
    choose,
    chooseSome,
    discardCategoryB,
    discardCS,
    multiply,
    multiplySome,
    chooseBest,
    w3C2X,
    scaleSubjects,
    avoid,
    discardCategoryBExcept,
} from "../weightings"

const validSubjects = [...categoryASubjects, ...categoryCSubjects]

const multiplyScience = modify(
    multiply({
        [Subject.Eng]: 2,
        [Subject.Maths]: 2.5,
    }),
    multiplySome(1, {
        [Subject.Bio]: 2.5,
        [Subject.Chem]: 2.5,
        [Subject.Phys]: 2.5,
    }),
    multiplySome(1, {
        [Subject.Bio]: 1.5,
        [Subject.Chem]: 1.5,
        [Subject.Phys]: 1.5,
        [Subject.Geog]: 1.5,
        [Subject.M1]: 1.5,
        [Subject.M2]: 1.5,
    }),
)

const r334_33 = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 4,
        [Subject.CS]: 1,
    }),
    minimumOne(validSubjects, 3),
    minimumOne(validSubjects, 3),
)

const r333_33 = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 3,
        [Subject.CS]: 1,
    }),
    minimumOne(validSubjects, 3),
    minimumOne(validSubjects, 3),
)

const r332_33 = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 2,
        [Subject.CS]: 1,
    }),
    minimumOne(validSubjects, 3),
    minimumOne(validSubjects, 3),
)

const mediaApl = [
    ...aplDesignStudies,
    ...aplMediaArts,
    ...aplPerformingArts,
    ...aplFilmsTvAndBroadcasting,
    ...aplMediaProductionAndPublicRelations,
    ...aplPsychology,
    ...aplCivilElectricalAndMechanicalEngineering,
    ...aplInformationEngineering,
    ...aplServicesEngineering,
    Subject.Apl693,
]

const r332_33_media = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 2,
        [Subject.CS]: 1,
    }),
    requireMultiple(
        2,
        or(minimumOne(validSubjects, 3), minimumOne(mediaApl, 2)),
    ),
)

const wMedia = sequence(
    discardCS,
    discardCategoryBExcept(...mediaApl),
    scaleSubjects(mediaApl, { 3: 4, 2: 3, 1: 0 }),
)

const r352_33 = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 5,
        [Subject.Maths]: 2,
        [Subject.CS]: 1,
    }),
    minimumOne(validSubjects, 3),
    minimumOne(validSubjects, 3),
)

const r353_33 = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 5,
        [Subject.Maths]: 3,
        [Subject.CS]: 1,
    }),
    minimumOne(validSubjects, 3),
    minimumOne(validSubjects, 3),
)

const r332_33_sci = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 3,
        [Subject.CS]: 1,
    }),
    minimumOne([Subject.Bio, Subject.Chem, Subject.Phys], 3),
    minimumOne(validSubjects, 3),
)

const r333_33_sci = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 3,
        [Subject.CS]: 1,
    }),
    minimumOne([Subject.Bio, Subject.Chem, Subject.Phys], 3),
    minimumOne(validSubjects, 3),
)

const rSciIctM12 = minimumOne(
    [
        Subject.Bio,
        Subject.Chem,
        Subject.Phys,
        Subject.ICT,
        Subject.M1,
        Subject.M2,
    ],
    3,
)

const bioSciApl = [Subject.Apl660]

const rBioSci = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 3,
        [Subject.CS]: 1,
    }),
    minimumOne([Subject.Bio, Subject.Chem], 3),
    minimumOne(
        [
            Subject.Bio,
            Subject.BAFS,
            Subject.Chem,
            Subject.DAT,
            Subject.ICT,
            Subject.M1,
            Subject.M2,
            Subject.Phys,
            ...bioSciApl,
        ],
        3,
    ),
)

const wBioSci = sequence(
    discardCS,
    discardCategoryBExcept(...bioSciApl),
    scaleSubjects(bioSciApl, { 3: 4, 2: 0, 1: 0 }),
    modify(
        multiply({
            [Subject.Eng]: 2,
            [Subject.Maths]: 1.5,
            [Subject.Bio]: 2,
            [Subject.Chem]: 2,
            [Subject.BAFS]: 1.5,
            [Subject.DAT]: 1.5,
            [Subject.ICT]: 1.5,
            [Subject.M1]: 1.5,
            [Subject.M2]: 1.5,
            [Subject.Phys]: 1.5,
        }),
    ),
    w3C2X,
)

export const cityuProgrammes: Programme[] = [
    {
        id: "JS1000",
        requirement: r334_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1001",
        requirement: r333_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1002",
        requirement: r333_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Maths), chooseBest(4)),
        ),
    },
    {
        id: "JS1005",
        requirement: r333_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Maths), chooseBest(4)),
        ),
    },
    {
        id: "JS1007",
        requirement: r333_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                }),
            ),
            w3C2X,
        ),
    },
    {
        id: "JS1012",
        requirement: r333_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Maths), chooseBest(4)),
        ),
    },
    {
        id: "JS1013",
        requirement: r333_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Maths), chooseBest(4)),
        ),
    },
    {
        id: "JS1014",
        requirement: r333_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Maths), chooseBest(4)),
        ),
    },
    {
        id: "JS1017",
        requirement: r333_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1018",
        requirement: r333_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1019",
        requirement: r333_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1025",
        requirement: r333_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1026",
        requirement: r333_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1027",
        requirement: r333_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1041",
        requirement: r332_33_media,
        weighting: sequence(
            wMedia,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                }),
            ),
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS1042",
        requirement: r332_33_media,
        weighting: sequence(
            wMedia,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                }),
            ),
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS1043",
        requirement: r332_33_media,
        weighting: sequence(
            wMedia,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 1.5,
                }),
            ),
            select(choose(Subject.Eng, Subject.Maths), chooseBest(3)),
        ),
    },
    {
        id: "JS1044",
        requirement: r332_33_media,
        weighting: sequence(
            wMedia,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                }),
            ),
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS1051",
        requirement: r332_33_sci,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            multiplyScience,
            select(
                choose(Subject.Eng, Subject.Maths),
                chooseSome(1, Subject.Bio, Subject.Chem, Subject.Phys),
                chooseBest(2),
            ),
        ),
    },
    {
        id: "JS1052",
        requirement: r333_33_sci,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            multiplyScience,
            select(
                choose(Subject.Eng, Subject.Maths),
                chooseSome(1, Subject.Bio, Subject.Chem, Subject.Phys),
                chooseBest(2),
            ),
        ),
    },
    {
        id: "JS1061",
        requirement: r352_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS1062",
        requirement: r353_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                }),
            ),
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS1071",
        requirement: r333_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                }),
            ),
            w3C2X,
        ),
    },
    {
        id: "JS1072",
        requirement: r333_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                }),
            ),
            w3C2X,
        ),
    },
    {
        id: "JS1074",
        requirement: r333_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                }),
            ),
            w3C2X,
        ),
    },
    {
        id: "JS1102",
        requirement: r332_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS1103",
        requirement: r332_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Chi]: 2,
                    [Subject.Eng]: 2,
                    [Subject.ChiHist]: 1.5,
                    [Subject.ChiLit]: 1.5,
                    [Subject.Hist]: 1.5,
                    [Subject.VA]: 1.5,
                }),
            ),
            w3C2X,
        ),
    },
    {
        id: "JS1104",
        requirement: r332_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2.5,
                    [Subject.EngLit]: 1.5,
                }),
            ),
            w3C2X,
        ),
    },
    {
        id: "JS1106",
        requirement: r332_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Chi]: 1.25,
                    [Subject.Eng]: 1.25,
                }),
            ),
            select(choose(Subject.Eng), chooseBest(3)),
        ),
    },
    {
        id: "JS1108",
        requirement: r332_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                }),
            ),
            select(choose(Subject.Eng), chooseBest(3)),
        ),
    },
    {
        id: "JS1109",
        requirement: r332_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Chi]: 1.5,
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 1.5,
                }),
            ),
            w3C2X,
        ),
    },
    {
        id: "JS1110",
        requirement: r332_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                }),
            ),
            select(choose(Subject.Eng), chooseBest(3)),
        ),
    },
    {
        id: "JS1111",
        requirement: r332_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                }),
            ),
            select(choose(Subject.Eng), chooseBest(3)),
        ),
    },
    {
        id: "JS1112",
        requirement: r332_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                }),
            ),
            select(choose(Subject.Eng), chooseBest(3)),
        ),
    },
    {
        id: "JS1113",
        requirement: r332_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                }),
            ),
            select(choose(Subject.Eng), chooseBest(3)),
        ),
    },
    {
        id: "JS1122",
        requirement: r352_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1123",
        requirement: r352_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS1200",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 2,
                [Subject.CS]: 1,
            }),
            requireMultiple(
                2,
                minimumOne(
                    [
                        Subject.Bio,
                        Subject.Chem,
                        Subject.Econ,
                        Subject.M1,
                        Subject.M2,
                        Subject.Phys,
                    ],
                    3,
                ),
            ),
        ),
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2.5,
                }),
                multiplySome(1, {
                    [Subject.Bio]: 2.5,
                    [Subject.Chem]: 2.5,
                    [Subject.Econ]: 2.5,
                    [Subject.M1]: 2.5,
                    [Subject.M2]: 2.5,
                    [Subject.Phys]: 2.5,
                }),
            ),
            select(choose(Subject.Eng), chooseBest(3)),
        ),
    },
    {
        id: "JS1201",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
                [Subject.Phys]: 3,
            }),
            minimumOne(categoryASubjects, 3),
        ),
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Chi]: 1.5,
                    [Subject.Eng]: 2.5,
                    [Subject.Maths]: 2.5,
                    [Subject.M1]: 2.5,
                    [Subject.M2]: 2.5,
                    [Subject.Phys]: 2.5,
                }),
            ),
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS1202",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.CS]: 1,
                [Subject.Chem]: 3,
            }),
            or(
                select(
                    minimumOne([Subject.Maths], 3),
                    minimumOne(validSubjects, 3),
                ),
                select(
                    minimumOne([Subject.Maths], 2),
                    minimumOne(
                        [
                            Subject.Bio,
                            Subject.BAFS,
                            Subject.DAT,
                            Subject.ICT,
                            Subject.Phys,
                        ],
                        3,
                    ),
                ),
            ),
        ),
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 1.5,
                    [Subject.Chem]: 2,
                }),
            ),
            chooseBest(4),
        ),
    },
    {
        id: "JS1204",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
            }),
            rSciIctM12,
            minimumOne(validSubjects, 3),
        ),
        weighting: sequence(discardCS, discardCategoryB, chooseBest(5)),
    },
    {
        id: "JS1205",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
            }),
            rSciIctM12,
            minimumOne(validSubjects, 3),
        ),
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                    [Subject.ICT]: 2,
                    [Subject.M1]: 2,
                    [Subject.M2]: 2,
                    [Subject.Phys]: 2,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                }),
            ),
            select(choose(Subject.Eng, Subject.Maths), chooseBest(3)),
        ),
    },
    {
        id: "JS1206",
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
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.ICT,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ],
                3,
            ),
            minimumOne(validSubjects, 3),
        ),
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2.5,
                    [Subject.M1]: 2,
                    [Subject.M2]: 2,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                }),
            ),
            select(choose(Subject.Maths), chooseBest(3)),
        ),
    },
    {
        id: "JS1207",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 2,
                [Subject.CS]: 1,
            }),
            minimumOne(
                [
                    Subject.Chem,
                    Subject.DAT,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ],
                3,
            ),
            minimumOne(validSubjects, 3),
        ),
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                    [Subject.Phys]: 2,
                    [Subject.Chem]: 1.5,
                    [Subject.DAT]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                }),
            ),
            select(choose(Subject.Maths), chooseBest(4)),
        ),
    },
    {
        id: "JS1208",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 2,
                [Subject.CS]: 1,
            }),
            minimumOne(
                [
                    Subject.Chem,
                    Subject.DAT,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ],
                3,
            ),
            minimumOne(validSubjects, 3),
        ),
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 1.25,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                    [Subject.Phys]: 2,
                }),
            ),
            select(choose(Subject.Maths), chooseBest(3)),
        ),
    },
    {
        id: "JS1210",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 2,
                [Subject.CS]: 1,
            }),
            minimumOne([Subject.Chem, Subject.DAT, Subject.Phys], 3),
            minimumOne(validSubjects, 3),
        ),
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                    [Subject.Maths]: 2,
                    [Subject.Phys]: 2,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                }),
            ),
            select(choose(Subject.Maths), chooseBest(4)),
        ),
    },
    {
        id: "JS1211",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 2,
                [Subject.CS]: 1,
            }),
            minimumOne([Subject.Bio, Subject.Chem, Subject.Phys], 3),
            minimumOne(validSubjects, 3),
        ),
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                    [Subject.Bio]: 2,
                    [Subject.Chem]: 2,
                    [Subject.M1]: 2,
                    [Subject.M2]: 2,
                    [Subject.Phys]: 2,
                }),
            ),
            evaulate(
                select(avoid(Subject.Maths), chooseBest(5)),
                select(avoid(Subject.M1, Subject.M2), chooseBest(5)),
            ),
        ),
    },
    {
        id: "JS1216",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 2,
                [Subject.CS]: 1,
            }),
            minimumOne(
                [
                    Subject.Bio,
                    Subject.Chem,
                    Subject.DAT,
                    Subject.Econ,
                    Subject.ICT,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ],
                3,
            ),
            minimumOne(validSubjects, 3),
        ),
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                    [Subject.ICT]: 2,
                    [Subject.M1]: 2,
                    [Subject.M2]: 2,
                    [Subject.Phys]: 2,
                    [Subject.Chem]: 1.5,
                    [Subject.DAT]: 1.5,
                }),
            ),
            select(choose(Subject.Eng, Subject.Maths), chooseBest(3)),
        ),
    },
    {
        id: "JS1217",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
            }),
            requireMultiple(
                2,
                minimumOne(
                    [
                        Subject.Bio,
                        Subject.Chem,
                        Subject.DAT,
                        Subject.ICT,
                        Subject.M1,
                        Subject.M2,
                        Subject.Phys,
                    ],
                    3,
                ),
            ),
        ),
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                    [Subject.Bio]: 2,
                    [Subject.Chem]: 2,
                    [Subject.DAT]: 2,
                    [Subject.ICT]: 2,
                    [Subject.M1]: 2,
                    [Subject.M2]: 2,
                    [Subject.Phys]: 2,
                }),
            ),
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS1220",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 5,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
            }),
            minimumOne(
                [
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ],
                3,
            ),
            minimumOne(validSubjects, 3),
        ),
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                }),
            ),
            select(choose(Subject.Eng, Subject.Maths), chooseBest(2)),
        ),
    },
    {
        id: "JS1221",
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 4,
                [Subject.CS]: 1,
            }),
            rSciIctM12,
            minimumOne(validSubjects, 3),
        ),
        weighting: sequence(discardCS, discardCategoryB, chooseBest(5)),
    },
    {
        id: "JS1801",
        requirement: minimum({
            [Subject.Chi]: 3,
            [Subject.Eng]: 5,
            [Subject.Maths]: 3,
            [Subject.CS]: 1,
            [Subject.Bio]: 3,
            [Subject.Chem]: 3,
        }),
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(
                choose(Subject.Eng, Subject.Maths, Subject.Bio, Subject.Chem),
                chooseBest(1),
            ),
        ),
    },
    {
        id: "JS1805",
        requirement: rBioSci,
        weighting: wBioSci,
    },
    {
        id: "JS1806",
        requirement: rBioSci,
        weighting: wBioSci,
    },
    {
        id: "JS1807",
        requirement: rBioSci,
        weighting: wBioSci,
    },
]
