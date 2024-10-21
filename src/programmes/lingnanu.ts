import { modify, select, sequence } from "../calculations"
import {
    createMapGrades,
    mapCatA_Normal,
    mapCatC_lingnanu,
    mapPassFail,
} from "../mapGrades"
import { minimum, minimumOne } from "../requirements"
import {
    categoryASubjects,
    categoryCSubjects,
    passFailSubjects,
    Subject,
} from "../subjects"
import { Calculation, Programme } from "../types"
import {
    chooseBest,
    discardCategoryB,
    discardCS,
    multiply,
    multiplySome,
} from "../weightings"

const mapGrades = createMapGrades([
    [categoryASubjects, mapCatA_Normal],
    [categoryCSubjects, mapCatC_lingnanu],
    [passFailSubjects, mapPassFail],
])

const lingnanuConfig = (...calculations: Calculation[]) =>
    sequence(
        discardCS,
        discardCategoryB,
        modify(...calculations),
        chooseBest(5),
    )

const elec2 = minimumOne(
    [...categoryASubjects, ...categoryCSubjects], // 2 or D
    2,
)

const r332_22 = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 2,
        [Subject.CS]: 1,
    }),
    elec2,
    elec2,
)

const r333_22 = select(
    minimum({
        [Subject.Chi]: 3,
        [Subject.Eng]: 3,
        [Subject.Maths]: 3,
        [Subject.CS]: 1,
    }),
    elec2,
    elec2,
)

export const lingnanuProgrammes: Programme[] = [
    {
        id: "JS7101",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Chi]: 1.5,
                [Subject.Eng]: 1.5,
            }),
            multiplySome(1, {
                [Subject.ChiHist]: 1.5,
                [Subject.ChiLit]: 1.5,
            }),
        ),
    },
    {
        id: "JS7123",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 1.5,
                [Subject.M1]: 1.5,
                [Subject.M2]: 1.5,
                [Subject.Bio]: 1.25,
                [Subject.BAFS]: 1.25,
                [Subject.Chem]: 1.25,
                [Subject.DAT]: 1.25,
                [Subject.Econ]: 1.25,
                [Subject.Geog]: 1.5,
                [Subject.HMSC]: 1.25,
                [Subject.ICT]: 1.25,
                [Subject.Phys]: 1.25,
                [Subject.TLFCT]: 1.25,
                [Subject.TLFST]: 1.25,
                [Subject.THS]: 1.25,
            }),
        ),
    },
    {
        id: "JS7133",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Chi]: 1.5,
                [Subject.Eng]: 1.5,
                [Subject.ICT]: 1.5,
                [Subject.VA]: 1.5,
            }),
        ),
    },
    {
        id: "JS7204",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Chi]: 1.5,
                [Subject.Eng]: 2,
                [Subject.ChiLit]: 1.5,
                [Subject.EngLit]: 1.5,
            }),
        ),
    },
    {
        id: "JS7211",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 2,
                [Subject.M1]: 1.5,
                [Subject.M2]: 1.5,
                [Subject.BAFS]: 1.5,
            }),
        ),
    },
    {
        id: "JS7212",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 2,
                [Subject.M1]: 1.5,
                [Subject.M2]: 1.5,
                [Subject.ICT]: 1.5,
            }),
        ),
    },
    {
        id: "JS7213",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 2,
                [Subject.M1]: 1.5,
                [Subject.M2]: 1.5,
                [Subject.BAFS]: 1.5,
                [Subject.Econ]: 1.5,
                [Subject.ICT]: 1.5,
            }),
        ),
    },
    {
        id: "JS7214",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 2,
                [Subject.M1]: 1.5,
                [Subject.M2]: 1.5,
                [Subject.BAFS]: 1.5,
                [Subject.Econ]: 1.5,
                [Subject.ICT]: 1.5,
            }),
        ),
    },
    {
        id: "JS7215",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 2,
                [Subject.M1]: 1.5,
                [Subject.M2]: 1.5,
                [Subject.BAFS]: 1.5,
                [Subject.Econ]: 1.5,
                [Subject.ICT]: 1.5,
            }),
        ),
    },
    {
        id: "JS7216",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 2,
                [Subject.M1]: 1.5,
                [Subject.M2]: 1.5,
                [Subject.Econ]: 1.5,
                [Subject.ICT]: 1.5,
            }),
        ),
    },
    {
        id: "JS7225",
        mapGrades,
        requirement: r333_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 2,
                [Subject.M1]: 2,
                [Subject.M2]: 2,
                [Subject.Chem]: 2,
                [Subject.ICT]: 2,
                [Subject.Phys]: 1.25,
            }),
        ),
    },
    {
        id: "JS7301",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 1.5,
                [Subject.M1]: 1.5,
                [Subject.M2]: 1.5,
                [Subject.Econ]: 1.5,
            }),
        ),
    },
    {
        id: "JS7302",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 1.5,
                [Subject.M1]: 1.5,
                [Subject.M2]: 1.5,
                [Subject.ChiHist]: 1.5,
                [Subject.Geog]: 1.5,
                [Subject.Hist]: 1.5,
            }),
        ),
    },
    {
        id: "JS7303",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 1.5,
            }),
        ),
    },
    {
        id: "JS7304",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 1.5,
            }),
        ),
    },
    {
        id: "JS7305",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 1.5,
                [Subject.ERS]: 1.5,
                [Subject.HMSC]: 1.5,
            }),
        ),
    },
    {
        id: "JS7306",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 1.5,
                [Subject.M1]: 1.5,
                [Subject.M2]: 1.5,
            }),
        ),
    },
    {
        id: "JS7307",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 1.5,
                [Subject.M1]: 1.5,
                [Subject.M2]: 1.5,
                [Subject.ICT]: 1.5,
            }),
        ),
    },
    {
        id: "JS7503",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Chi]: 1.5,
                [Subject.Eng]: 2.5,
                [Subject.EngLit]: 1.5,
            }),
        ),
    },
    {
        id: "JS7606",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Chi]: 1.5,
                [Subject.Eng]: 2,
            }),
        ),
    },
    {
        id: "JS7709",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Chi]: 1.5,
                [Subject.Eng]: 2,
                [Subject.ChiHist]: 1.2,
                [Subject.Hist]: 1.2,
            }),
        ),
    },
    {
        id: "JS7802",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Chi]: 1.5,
                [Subject.Eng]: 2,
                [Subject.Maths]: 1.5,
            }),
        ),
    },
    {
        id: "JS7905",
        mapGrades,
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Chi]: 2,
                [Subject.Eng]: 2,
                [Subject.ICT]: 1.5,
                [Subject.VA]: 1.5,
            }),
        ),
    },
]
