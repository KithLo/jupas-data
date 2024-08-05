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
    discardCategoryBExcept,
    discardCS,
    multiply,
    multiplyAll,
    scaleSubjects,
} from "../weightings"

const polyuConfig = sequence(
    discardCS,
    scaleSubjects(categoryASubjects, {
        7: 8.5,
        6: 7,
        5: 5.5,
    }),
    scaleSubjects(categoryBSubjects, {
        3: 4,
        2: 3,
        1: 0,
    }),
)

const polyuCore = minimum({
    [Subject.Chi]: 3,
    [Subject.Eng]: 3,
    [Subject.Maths]: 2,
    [Subject.CS]: 1,
})

const polyuGeneralElective = minimumOne(
    [...categoryASubjects, ...categoryCSubjects],
    3,
)

const polyuElective = (...categoryB: Subject[]) =>
    categoryB.length === 0
        ? polyuGeneralElective
        : or(polyuGeneralElective, minimumOne(categoryB, 2))

const multiply10 = (...subjects: Subject[]) =>
    multiply(subjects.reduce((acc, val) => ({ ...acc, [val]: 10 }), {}))

const multiply7 = (...subjects: Subject[]) =>
    multiply(subjects.reduce((acc, val) => ({ ...acc, [val]: 7 }), {}))

const multiply5 = (...subjects: Subject[]) =>
    multiply(subjects.reduce((acc, val) => ({ ...acc, [val]: 5 }), {}))

const js3010Apl = [
    Subject.Apl704,
    Subject.Apl665,
    Subject.Apl627,
    Subject.Apl592,
    Subject.Apl618,
    Subject.Apl660,
]

const js3050Apl = [
    Subject.Apl703,
    Subject.Apl662,
    Subject.Apl669,
    Subject.Apl693,
    Subject.Apl707,
    Subject.Apl674,
    Subject.Apl627,
    Subject.Apl676,
    Subject.Apl702,
    Subject.Apl610,
    Subject.Apl668,
    Subject.Apl681,
    Subject.Apl660,
    Subject.Apl708,
    Subject.Apl691,
    Subject.Apl706,
    Subject.Apl677,
]

const js3180Apl = [
    Subject.Apl722,
    Subject.Apl720,
    Subject.Apl684,
    Subject.Apl693,
    Subject.Apl683,
    Subject.Apl706,
]

const js3240Apl = [
    Subject.Apl662,
    Subject.Apl665,
    Subject.Apl676,
    Subject.Apl691,
    Subject.Apl616,
]

const js3557Apl = [
    Subject.Apl703,
    Subject.Apl722,
    Subject.Apl662,
    Subject.Apl640,
    Subject.Apl684,
    Subject.Apl669,
    Subject.Apl693,
    Subject.Apl683,
    Subject.Apl668,
    Subject.Apl717,
    Subject.Apl672,
    Subject.Apl681,
    Subject.Apl691,
    Subject.Apl713,
    Subject.Apl706,
]

const js3569Apl = [
    Subject.Apl662,
    Subject.Apl669,
    Subject.Apl693,
    Subject.Apl676,
    Subject.Apl702,
    Subject.Apl668,
    Subject.Apl681,
    Subject.Apl660,
    Subject.Apl691,
]

const js3571Apl = [
    Subject.Apl720,
    Subject.Apl662,
    Subject.Apl640,
    Subject.Apl693,
    Subject.Apl718,
    Subject.Apl615,
    Subject.Apl672,
    Subject.Apl681,
    Subject.Apl691,
]

const js3910Apl = [
    Subject.Apl627,
    Subject.Apl712,
    Subject.Apl592,
    Subject.Apl615,
    Subject.Apl660,
]

export const polyuProgrammes: Programme[] = [
    {
        id: "JS3011",
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3010Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3010Apl),
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Eng,
                    Subject.Maths,
                ),
                multiply7(
                    Subject.Chi,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                    Subject.Apl660,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3020",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(Subject.Eng, Subject.Maths),
                multiply7(
                    Subject.Bio,
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.Chi,
                    Subject.Econ,
                    Subject.ICT,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3030",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.Econ,
                    Subject.Eng,
                    Subject.ICT,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ),
                multiply7(Subject.Chi),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3050",
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3050Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3050Apl),
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.ChiHist,
                    Subject.Econ,
                    Subject.Geog,
                    Subject.VA,
                ),
                multiply7(
                    Subject.Chi,
                    Subject.DAT,
                    Subject.Eng,
                    Subject.Hist,
                    Subject.ICT,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                    Subject.TLFCT,
                    Subject.TLFST,
                    Subject.Apl676,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3060",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(Subject.Eng, Subject.Maths),
                multiply7(
                    Subject.Bio,
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.ChiHist,
                    Subject.Chi,
                    Subject.ChiLit,
                    Subject.Econ,
                    Subject.Geog,
                    Subject.Hist,
                    Subject.EngLit,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3070",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(Subject.Eng, Subject.Maths),
                multiply7(
                    Subject.Bio,
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.ChiHist,
                    Subject.Chi,
                    Subject.ChiLit,
                    Subject.Econ,
                    Subject.Geog,
                    Subject.Hist,
                    Subject.EngLit,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3080",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(Subject.Eng, Subject.Maths),
                multiply7(
                    Subject.Bio,
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.ChiHist,
                    Subject.Chi,
                    Subject.ChiLit,
                    Subject.Econ,
                    Subject.Geog,
                    Subject.Hist,
                    Subject.EngLit,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3100",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(Subject.Eng),
                multiply7(
                    Subject.Bio,
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.ChiHist,
                    Subject.Chi,
                    Subject.ChiLit,
                    Subject.DAT,
                    Subject.Econ,
                    Subject.ERS,
                    Subject.Geog,
                    Subject.HMSC,
                    Subject.Hist,
                    Subject.ICT,
                    Subject.EngLit,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                    Subject.THS,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3110",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(Subject.Eng, Subject.Maths, Subject.Phys),
                multiply7(
                    Subject.Bio,
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.Chi,
                    Subject.DAT,
                    Subject.Econ,
                    Subject.Geog,
                    Subject.HMSC,
                    Subject.ICT,
                    Subject.M1,
                    Subject.M2,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3120",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Chi,
                    Subject.Econ,
                    Subject.Eng,
                    Subject.Geog,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ),
                multiply7(Subject.DAT, Subject.ICT),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3130",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.Eng,
                    Subject.Geog,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ),
                multiply7(
                    Subject.Bio,
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.ChiHist,
                    Subject.Chi,
                    Subject.ChiLit,
                    Subject.DAT,
                    Subject.Econ,
                    Subject.ERS,
                    Subject.HMSC,
                    Subject.Hist,
                    Subject.EngLit,
                    Subject.Music,
                    Subject.PE,
                    Subject.TLFCT,
                    Subject.TLFST,
                    Subject.THS,
                    Subject.VA,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3140",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.Chem,
                    Subject.Eng,
                    Subject.ICT,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ),
                multiply7(Subject.Bio, Subject.Chi),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3150",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ),
                multiply7(Subject.Chi, Subject.Eng),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3170",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Eng,
                    Subject.ICT,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ),
                multiply7(
                    Subject.BAFS,
                    Subject.Chi,
                    Subject.ChiLit,
                    Subject.DAT,
                    Subject.Econ,
                    Subject.EngLit,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3180",
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3180Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3180Apl),
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Eng,
                    Subject.ICT,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                    Subject.Apl722,
                    Subject.Apl684,
                    Subject.Apl683,
                    Subject.Apl706,
                ),
                multiply7(
                    Subject.Chi,
                    Subject.DAT,
                    Subject.Apl720,
                    Subject.Apl693,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3240",
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3240Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3240Apl),
            polyuConfig,
            modify(
                multiply10(Subject.Chi, Subject.Eng),
                multiply7(
                    Subject.BAFS,
                    Subject.ChiHist,
                    Subject.ChiLit,
                    Subject.DAT,
                    Subject.ERS,
                    Subject.Geog,
                    Subject.HMSC,
                    Subject.Hist,
                    Subject.ICT,
                    Subject.EngLit,
                    Subject.Maths,
                    Subject.Music,
                    Subject.THS,
                    Subject.VA,
                    ...categoryCSubjects,
                ),
                multiplyAll(5),
            ),
            select(choose(Subject.Chi, Subject.Eng), chooseBest(3)),
        ),
    },
    {
        id: "JS3250",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(multiplyAll(7)),
            chooseBest(5),
        ),
    },
    {
        id: "JS3290",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Eng,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ),
                multiply7(Subject.Chi),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3310",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(multiply10(Subject.Eng), multiplyAll(7)),
            chooseBest(5),
        ),
    },
    {
        id: "JS3320",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.ChiHist,
                    Subject.Chi,
                    Subject.ChiLit,
                    Subject.Eng,
                    Subject.Hist,
                ),
                multiply7(Subject.Maths),
                multiplyAll(5),
            ),
            select(choose(Subject.Chi, Subject.Eng), chooseBest(3)),
        ),
    },
    {
        id: "JS3330",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(Subject.Chi, Subject.Eng, Subject.Maths),
                multiply5(
                    Subject.DAT,
                    Subject.Music,
                    Subject.PE,
                    Subject.TLFCT,
                    Subject.TLFST,
                    Subject.VA,
                ),
                multiplyAll(7),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3337",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.Chi,
                    Subject.Eng,
                    Subject.Maths,
                ),
                multiply5(...categoryCSubjects),
                multiplyAll(7),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3478",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Chi,
                    Subject.Eng,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                ),
                multiply7(Subject.Phys),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3557",
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3557Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3557Apl),
            polyuConfig,
            modify(
                multiply10(Subject.Eng, Subject.Maths),
                multiply7(Subject.Chi),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3569",
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3569Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3569Apl),
            polyuConfig,
            modify(
                multiply10(
                    Subject.Chi,
                    Subject.DAT,
                    Subject.Eng,
                    Subject.ICT,
                    Subject.Maths,
                    Subject.VA,
                    Subject.Apl702,
                    Subject.Apl668,
                    Subject.Apl681,
                ),
                multiply7(
                    Subject.BAFS,
                    Subject.Econ,
                    Subject.Hist,
                    Subject.Music,
                    Subject.TLFCT,
                    Subject.TLFST,
                    Subject.THS,
                    Subject.Apl669,
                    Subject.Apl693,
                    Subject.Apl676,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3571",
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3571Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3571Apl),
            polyuConfig,
            modify(
                multiply10(Subject.Eng, Subject.Maths),
                multiply7(Subject.Chi),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3612",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Chi,
                    Subject.Eng,
                    Subject.Maths,
                    Subject.Phys,
                ),
                multiply7(Subject.M1, Subject.M2),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3624",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(Subject.Bio, Subject.Chi, Subject.Eng, Subject.Phys),
                multiply7(
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.ChiHist,
                    Subject.ChiLit,
                    Subject.DAT,
                    Subject.Econ,
                    Subject.Geog,
                    Subject.HMSC,
                    Subject.Hist,
                    Subject.ICT,
                    Subject.EngLit,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3636",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(Subject.Bio, Subject.Chi, Subject.Eng, Subject.Phys),
                multiply7(
                    Subject.Chem,
                    Subject.HMSC,
                    Subject.Maths,
                    Subject.PE,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3648",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.Chi,
                    Subject.Eng,
                    Subject.Maths,
                ),
                multiply5(...categoryCSubjects),
                multiplyAll(7),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3741",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.Chem,
                    Subject.DAT,
                    Subject.Eng,
                    Subject.ICT,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ),
                multiply7(Subject.Chi),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3868",
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.Econ,
                    Subject.Eng,
                    Subject.ICT,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ),
                multiplyAll(7),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3910",
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3910Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3910Apl),
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Eng,
                    Subject.Maths,
                ),
                multiply7(
                    Subject.Chi,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                    Subject.Apl660,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
]
