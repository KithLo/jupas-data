import { difference, omit } from "rambda"
import { modify, or, select, sequence } from "../calculations"
import {
    createMapGrades,
    mapCatA_Normal,
    mapCatA_Scaled,
    mapCatC_cuhk,
    mapCatC_cuhk_medic,
    mapPassFail,
} from "../mapGrades"
import { minimum, minimumOne, unknownRequirement } from "../requirements"
import {
    categoryASubjects,
    categoryCSubjects,
    passFailSubjects,
    Subject,
} from "../subjects"
import { Programme } from "../types"
import {
    choose,
    chooseBest,
    chooseSome,
    chooseWorstOf,
    discardCategoryB,
    discardCS,
    multiply,
    multiplySome,
    w3C2X,
    unknownWeighting,
} from "../weightings"

const mapGrades = createMapGrades([
    [categoryASubjects, mapCatA_Scaled],
    [categoryCSubjects, mapCatC_cuhk],
    [passFailSubjects, mapPassFail],
])

const mapGradesMedic = createMapGrades([
    [categoryASubjects, mapCatA_Normal],
    [categoryCSubjects, mapCatC_cuhk_medic],
    [passFailSubjects, mapPassFail],
])

const cuhkConfig = discardCS

const catA3 = minimumOne(
    difference(categoryASubjects, [Subject.M1, Subject.M2]),
    3,
)
const catAorC3 = minimumOne([...categoryASubjects, ...categoryCSubjects], 3)

const r332_33 = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 2,
        [Subject.CS]: 1,
    }),
    catA3,
    catAorC3,
)

const r333_33 = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 3,
        [Subject.CS]: 1,
    }),
    catA3,
    catAorC3,
)

const r453_33 = select(
    minimum({
        [Subject.Chi]: 4,
        [Subject.Eng]: 5.5,
        [Subject.Maths]: 3,
        [Subject.CS]: 1,
    }),
    catA3,
    catAorC3,
)

const r432_33 = select(
    minimum({
        [Subject.Chi]: 4,
        [Subject.Eng]: 3,
        [Subject.Maths]: 2,
        [Subject.CS]: 1,
    }),
    catA3,
    catAorC3,
)

const r342_33 = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 4,
        [Subject.Maths]: 2,
        [Subject.CS]: 1,
    }),
    catA3,
    catAorC3,
)

const r334_33 = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 4,
        [Subject.CS]: 1,
    }),
    catA3,
    catAorC3,
)

const r344_33 = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 4,
        [Subject.Maths]: 4,
        [Subject.CS]: 1,
    }),
    catA3,
    catAorC3,
)

const r345_33 = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 4,
        [Subject.Maths]: 5.5,
        [Subject.CS]: 1,
    }),
    catA3,
    catAorC3,
)

const rMedic = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 4,
        [Subject.Maths]: 3,
        [Subject.CS]: 1,
    }),
    minimumOne([Subject.Bio, Subject.Chem], 3),
    minimumOne(
        difference(
            [...categoryASubjects, ...categoryCSubjects],
            [Subject.M1, Subject.M2],
        ),
        3,
    ),
)

const wMedic = sequence(
    discardCS,
    discardCategoryB,
    omit([Subject.M1, Subject.M2]),
    select(
        choose(Subject.Chi, Subject.Eng, Subject.Maths),
        chooseSome(1, Subject.Bio, Subject.Chem),
        chooseBest(2),
    ),
)

export const cuhkProgrammes: Programme[] = [
    {
        id: "JS4006",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4018",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Chi]: 1.2 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS4032",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Eng]: 1.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS4044",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4056",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4068",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4070",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4082",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4094",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            cuhkConfig,
            select(choose(Subject.Chi, Subject.Eng), chooseBest(3)),
        ),
    },
    {
        id: "JS4100",
        mapGrades,
        requirement: unknownRequirement,
        weighting: unknownWeighting,
    },
    {
        id: "JS4109",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4111",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4123",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4136",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Eng]: 1.25 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS4202",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4214",
        mapGrades,
        requirement: r453_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4226",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4238",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.CS]: 1,
            }),
            or(
                select(
                    minimum({
                        [Subject.Maths]: 5.5,
                    }),
                    catA3,
                    catAorC3,
                ),
                select(
                    minimum({
                        [Subject.Maths]: 3,
                    }),
                    minimumOne([Subject.M1, Subject.M2], 5),
                    catA3,
                ),
            ),
        ),
        weighting: sequence(
            cuhkConfig,
            select(
                choose(Subject.Eng),
                chooseSome(1, Subject.Maths, Subject.M1, Subject.M2),
                chooseBest(3),
            ),
        ),
    },
    {
        id: "JS4240",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4252",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({ [Subject.Eng]: 2, [Subject.Maths]: 2 }),
                multiplySome(1, {
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                    [Subject.Econ]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4254",
        mapGrades,
        requirement: r453_33,
        weighting: sequence(
            cuhkConfig,
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS4264",
        mapGrades,
        requirement: r453_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Eng]: 2, [Subject.Chi]: 1.5 })),
            w3C2X,
        ),
    },
    {
        id: "JS4276",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({ [Subject.Eng]: 2, [Subject.Maths]: 2 }),
                multiplySome(1, {
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                    [Subject.Econ]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4320",
        mapGrades,
        requirement: unknownRequirement,
        weighting: unknownWeighting,
    },
    {
        id: "JS4329",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4331",
        mapGrades,
        requirement: r432_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Chi]: 2 })),
            select(choose(Subject.Chi), chooseBest(4)),
        ),
    },
    {
        id: "JS4343",
        mapGrades,
        requirement: r342_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Eng]: 2 })),
            select(choose(Subject.Eng), chooseBest(4)),
        ),
    },
    {
        id: "JS4361",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 4,
                [Subject.Maths]: 2,
                [Subject.CS]: 1,
            }),
            minimumOne([Subject.M1, Subject.M2], 3),
            catA3,
        ),
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({ [Subject.Maths]: 2 }),
                multiplySome(1, { [Subject.M1]: 2, [Subject.M2]: 2 }),
                multiplySome(1, { [Subject.Chi]: 1.5, [Subject.Eng]: 1.5 }),
                multiplySome(1, {
                    [Subject.Phys]: 1.5,
                    [Subject.Econ]: 1.5,
                    [Subject.ICT]: 1.5,
                }),
            ),
            select(
                choose(Subject.Maths),
                chooseSome(1, Subject.M1, Subject.M2),
                chooseBest(3),
            ),
        ),
    },
    {
        id: "JS4372",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4386",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(
            cuhkConfig,
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
                    [Subject.BAFS]: 1.5,
                    [Subject.Econ]: 1.5,
                    [Subject.Geog]: 1.5,
                    [Subject.TLFST]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4408",
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
                    Subject.M1,
                    Subject.M2,
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Phys,
                    Subject.DAT,
                    Subject.ICT,
                ],
                3,
            ),
            catAorC3,
        ),
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                    [Subject.Phys]: 1.5,
                    [Subject.Bio]: 1.25,
                    [Subject.Chem]: 1.25,
                    [Subject.DAT]: 1.25,
                    [Subject.ICT]: 1.25,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4412",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 4,
                [Subject.CS]: 1,
            }),
            minimumOne(
                [
                    Subject.M1,
                    Subject.M2,
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Phys,
                    Subject.ICT,
                ],
                3,
            ),
            catAorC3,
        ),
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 1.75,
                    [Subject.M2]: 1.75,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                    [Subject.DAT]: 1.5,
                    [Subject.ICT]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4416",
        mapGrades,
        requirement: r344_33,
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Maths]: 2,
                    [Subject.M1]: 2,
                    [Subject.M2]: 2,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                    [Subject.Econ]: 1.5,
                    [Subject.ICT]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4428",
        mapGrades,
        requirement: r334_33,
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Eng]: 1.25,
                    [Subject.Chi]: 1.25,
                    [Subject.Maths]: 1.75,
                    [Subject.M1]: 1.75,
                    [Subject.M2]: 1.75,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                    [Subject.BAFS]: 1.5,
                    [Subject.Econ]: 1.5,
                    [Subject.ICT]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4434",
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
                    Subject.M1,
                    Subject.M2,
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Phys,
                    Subject.ICT,
                ],
                3,
            ),
            catAorC3,
        ),
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                    [Subject.Phys]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4446",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 4,
                [Subject.CS]: 1,
            }),
            minimumOne(
                [
                    Subject.M1,
                    Subject.M2,
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Phys,
                ],
                3,
            ),
            catAorC3,
        ),
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Maths]: 2,
                    [Subject.M1]: 1.75,
                    [Subject.M2]: 1.75,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                    [Subject.DAT]: 1.5,
                    [Subject.ICT]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4458",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                    [Subject.BAFS]: 1.5,
                    [Subject.Econ]: 1.5,
                    [Subject.ICT]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4460",
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
                    Subject.M1,
                    Subject.M2,
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Phys,
                ],
                3,
            ),
            catAorC3,
        ),
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                }),
                multiplySome(1.5, {
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4462",
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
                    Subject.M1,
                    Subject.M2,
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Phys,
                    Subject.DAT,
                    Subject.ICT,
                ],
                3,
            ),
            catAorC3,
        ),
        weighting: sequence(
            cuhkConfig,
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
                    [Subject.Econ]: 1.2,
                    [Subject.Geog]: 1.2,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4468",
        mapGrades,
        requirement: r345_33,
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Eng]: 1.25,
                    [Subject.Chi]: 1.25,
                    [Subject.Maths]: 1.75,
                    [Subject.M1]: 1.75,
                    [Subject.M2]: 1.75,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                    [Subject.ICT]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4501",
        mapGrades: mapGradesMedic,
        requirement: rMedic,
        weighting: wMedic,
    },
    {
        id: "JS4502",
        mapGrades: mapGradesMedic,
        requirement: rMedic,
        weighting: wMedic,
    },
    {
        id: "JS4513",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            cuhkConfig,
            modify(
                multiplySome(1, {
                    [Subject.Bio]: 1.2,
                    [Subject.Chem]: 1.2,
                    [Subject.Phys]: 1.2,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4525",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4537",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4542",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4550",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
            }),
            minimumOne([Subject.Bio, Subject.Chem], 3),
            catA3,
        ),
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Eng]: 1.5,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                }),
            ),
            select(
                choose(Subject.Chi, Subject.Eng, Subject.Maths),
                chooseSome(1, Subject.Bio, Subject.Chem),
                chooseBest(1),
            ),
        ),
    },
    {
        id: "JS4601",
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
                    Subject.M1,
                    Subject.M2,
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Phys,
                ],
                3,
            ),
            catA3,
        ),
        weighting: sequence(
            cuhkConfig,
            modify(
                // Avoid multipling the worst of eng and maths
                chooseWorstOf(1, Subject.Eng, Subject.Maths),
                multiplySome(3, {
                    [Subject.Eng]: 1.5,
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 2,
                    [Subject.M2]: 2,
                    [Subject.Bio]: 2,
                    [Subject.Chem]: 2,
                    [Subject.Phys]: 2,
                    [Subject.Econ]: 1.5,
                    [Subject.Geog]: 1.5,
                    [Subject.ICT]: 1.5,
                    [Subject.TLFST]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4648",
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
                    Subject.M1,
                    Subject.M2,
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Phys,
                    Subject.Geog,
                ],
                3,
            ),
            catA3,
        ),
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Eng]: 2,
                    [Subject.Maths]: 2,
                    [Subject.M1]: 2,
                    [Subject.M2]: 2,
                    [Subject.Bio]: 2,
                    [Subject.Chem]: 2,
                    [Subject.Phys]: 2,
                    [Subject.Geog]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4682",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 4,
                [Subject.CS]: 1,
            }),
            minimumOne(
                [
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Phys,
                    Subject.Econ,
                    Subject.Geog,
                    Subject.ICT,
                    Subject.TLFST,
                ],
                3,
            ),
            minimumOne([Subject.M1, Subject.M2], 4),
        ),
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.M1]: 3.5, [Subject.M2]: 3.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS4690",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 4,
                [Subject.CS]: 1,
                [Subject.Phys]: 4,
            }),
            minimumOne(
                [
                    Subject.M1,
                    Subject.M2,
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Econ,
                    Subject.Geog,
                    Subject.ICT,
                    Subject.TLFST,
                ],
                3,
            ),
        ),
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                    [Subject.Phys]: 2,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4719",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 3,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
            }),
            minimumOne([Subject.M1, Subject.M2], 3),
            catA3,
        ),
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Maths]: 2,
                    [Subject.M1]: 2,
                    [Subject.M2]: 2,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4725",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 4,
                [Subject.Maths]: 3,
                [Subject.CS]: 1,
            }),
            minimumOne([Subject.Bio, Subject.Chem], 3),
            catAorC3,
        ),
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4733",
        mapGrades,
        requirement: select(
            minimum({
                [Subject.Chi]: 3,
                [Subject.Eng]: 4,
                [Subject.Maths]: 5.5,
                [Subject.CS]: 1,
            }),
            minimumOne([Subject.M1, Subject.M2], 5),
            minimumOne(categoryASubjects, 4),
        ),
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Maths]: 2,
                    [Subject.M1]: 2,
                    [Subject.M2]: 2,
                    [Subject.Bio]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Phys]: 1.5,
                    [Subject.ICT]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4750",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 2,
                    [Subject.M2]: 2,
                    [Subject.Phys]: 2,
                    [Subject.Geog]: 2,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4760",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({
                    [Subject.Maths]: 1.5,
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                }),
                multiplySome(1, {
                    [Subject.Phys]: 1.5,
                    [Subject.Econ]: 1.5,
                    [Subject.BAFS]: 1.5,
                    [Subject.ICT]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4801",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Eng]: 1.3 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS4812",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Eng]: 1.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS4824",
        mapGrades,
        requirement: r333_33,
        weighting: sequence(
            cuhkConfig,
            modify(
                multiply({ [Subject.Maths]: 1.5 }),
                multiplySome(1, {
                    [Subject.M1]: 1.5,
                    [Subject.M2]: 1.5,
                    [Subject.Chem]: 1.5,
                    [Subject.Econ]: 1.5,
                    [Subject.Phys]: 1.5,
                }),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS4836",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Eng]: 1.5, [Subject.Geog]: 1.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS4838",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4848",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Eng]: 1.5, [Subject.Chi]: 1.25 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS4850",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Eng]: 1.3, [Subject.Chi]: 1.3 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS4858",
        mapGrades,
        requirement: r342_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Eng]: 1.3 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS4862",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Eng]: 1.5, [Subject.Maths]: 1.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS4874",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4886",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Eng]: 1.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS4892",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Eng]: 1.5 })),
            chooseBest(5),
        ),
    },
    {
        id: "JS4893",
        mapGrades,
        requirement: r332_33,
        weighting: sequence(cuhkConfig, chooseBest(5)),
    },
    {
        id: "JS4903",
        mapGrades,
        requirement: r453_33,
        weighting: sequence(
            cuhkConfig,
            modify(multiply({ [Subject.Eng]: 2 })),
            w3C2X,
        ),
    },
]
