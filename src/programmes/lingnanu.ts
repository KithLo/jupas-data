import { modify, select, sequence } from "../calculations"
import { minimum, minimumOne } from "../requirements"
import { categoryASubjects, categoryCSubjects, Subject } from "../subjects"
import { Calculation, Programme } from "../types"
import {
    chooseBest,
    discardCategoryB,
    discardCS,
    multiply,
    multiplySome,
} from "../weightings"

const lingnanuConfig = (...calculations: Calculation[]) =>
    sequence(
        discardCS,
        discardCategoryB,
        modify(...calculations),
        chooseBest(5),
    )

const elec2 = minimumOne(
    [...categoryASubjects, ...categoryCSubjects], // 4 or D
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
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Bio]: 1.25,
                [Subject.BAFS]: 1.25,
                [Subject.DAT]: 1.25,
                [Subject.Econ]: 1.25,
                [Subject.Geog]: 1.5,
                [Subject.HMSC]: 1.25,
                [Subject.TLFCT]: 1.25,
                [Subject.TLFST]: 1.25,
                [Subject.THS]: 1.25,
            }),
        ),
    },
    {
        id: "JS7133",
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
        id: "JS7200",
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 1.5,
            }),
        ),
    },
    {
        id: "JS7204",
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
        id: "JS7216",
        requirement: r332_22,
        weighting: lingnanuConfig(
            multiply({
                [Subject.Eng]: 2,
                [Subject.Maths]: 1.5,
            }),
        ),
    },
    {
        id: "JS7225",
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
        id: "JS7503",
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
