import { evaulate, modify, or, select, sequence } from "../calculations"
import {
    createMapGrades,
    mapCatA_Scaled,
    mapCatB_430,
    mapCatC_cityu,
    mapPassFail,
} from "../mapGrades"
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
    categoryBSubjects,
    passFailSubjects,
    aplMedicalScienceAndHealthCare,
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

const mapGrades = createMapGrades([
    [categoryASubjects, mapCatA_Scaled],
    [categoryBSubjects, mapCatB_430],
    [categoryCSubjects, mapCatC_cityu],
    [passFailSubjects, mapPassFail],
])

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
    ...aplMedicalScienceAndHealthCare,
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
    requireMultiple(2, minimumOne([...validSubjects, ...mediaApl], 3)),
)

const wMedia = sequence(discardCS, discardCategoryBExcept(...mediaApl))

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
    or(
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
            ],
            3,
        ),
        minimumOne(bioSciApl, 4),
    ),
)

const wBioSci = sequence(
    discardCS,
    discardCategoryBExcept(...bioSciApl),
    scaleSubjects(bioSciApl, { 3: 0 }),
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
        mapGrades,
        requirement: r334_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1001",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1002",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Maths), chooseBest(4)),
        ),
    },
    {
        id: "JS1005",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Maths), chooseBest(4)),
        ),
    },
    {
        id: "JS1007",
        mapGrades,
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
        mapGrades,
        requirement: r333_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Maths), chooseBest(4)),
        ),
    },
    {
        id: "JS1013",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Maths), chooseBest(4)),
        ),
    },
    {
        id: "JS1014",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Maths), chooseBest(4)),
        ),
    },
    {
        id: "JS1017",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1018",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1019",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1025",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1026",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1027",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(discardCS, discardCategoryB, w3C2X),
    },
    {
        id: "JS1040",
        mapGrades,
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
        id: "JS1041",
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        id: "JS1050",
        mapGrades,
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
        id: "JS1051",
        mapGrades,
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
        mapGrades,
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
        id: "JS1053",
        mapGrades,
        requirement: r333_33_sci,
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
                    [Subject.Phys]: 2.5,
                }),
                multiplySome(1, {
                    [Subject.Econ]: 2.5,
                    [Subject.BAFS]: 2.5,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                    [Subject.Geog]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
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
        id: "JS1061",
        mapGrades,
        requirement: r352_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS1062",
        mapGrades,
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
        id: "JS1070",
        mapGrades,
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
        id: "JS1071",
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        id: "JS1100",
        mapGrades,
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
        id: "JS1102",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS1103",
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                }),
            ),
            select(choose(Subject.Eng), w3C2X),
        ),
    },
    {
        id: "JS1109",
        mapGrades,
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
        id: "JS1111",
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        id: "JS1123",
        mapGrades,
        requirement: r352_33,
        weighting: sequence(
            discardCS,
            discardCategoryB,
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS1200",
        mapGrades,
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
            chooseBest(4),
        ),
    },
    {
        id: "JS1201",
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        id: "JS1218",
        mapGrades,
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
        id: "JS1219",
        mapGrades,
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
                    [Subject.Bio]: 2,
                    [Subject.Chem]: 2,
                    [Subject.DAT]: 2,
                    [Subject.Econ]: 2,
                    [Subject.ICT]: 2,
                    [Subject.M1]: 2,
                    [Subject.M2]: 2,
                    [Subject.Phys]: 2,
                }),
            ),
            select(choose(Subject.Eng, Subject.Maths), chooseBest(3)),
        ),
    },
    {
        id: "JS1221",
        mapGrades,
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
        mapGrades,
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
        mapGrades,
        requirement: rBioSci,
        weighting: wBioSci,
    },
    {
        id: "JS1806",
        mapGrades,
        requirement: rBioSci,
        weighting: wBioSci,
    },
    {
        id: "JS1807",
        mapGrades,
        requirement: rBioSci,
        weighting: wBioSci,
    },
]
