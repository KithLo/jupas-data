import { mapObjIndexed } from "rambda"
import { modify, optional, or, select, sequence } from "../calculations"
import {
    createMapGrades,
    mapCatA_Scaled,
    mapCatB_430,
    mapCatC_polyu,
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
    discardCategoryBExcept,
    discardCS,
    multiply,
    multiplyAll,
} from "../weightings"

const mapGrades = createMapGrades([
    [categoryASubjects, mapCatA_Scaled],
    [categoryBSubjects, mapCatB_430],
    [categoryCSubjects, mapCatC_polyu],
    [passFailSubjects, mapPassFail],
])

const polyuConfig = discardCS

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
        : or(polyuGeneralElective, minimumOne(categoryB, 3))

const multiply10 = (...subjects: Subject[]) =>
    multiply(subjects.reduce((acc, val) => ({ ...acc, [val]: 10 }), {}))

const multiply7 = (...subjects: Subject[]) =>
    multiply(subjects.reduce((acc, val) => ({ ...acc, [val]: 7 }), {}))

const multiply5 = (...subjects: Subject[]) =>
    multiply(subjects.reduce((acc, val) => ({ ...acc, [val]: 5 }), {}))

const bonusSubject = optional(
    sequence(
        discardCS,
        chooseBest(1),
        mapObjIndexed((value) => (value >= 3 ? value : 0)),
    ),
)

const js3005Apl = [Subject.Apl722, Subject.Apl683, Subject.Apl706]

const js3008Apl = [
    Subject.Apl627,
    Subject.Apl712,
    Subject.Apl592,
    Subject.Apl618,
    Subject.Apl615,
    Subject.Apl660,
]

const js3011Apl = [Subject.Apl627, Subject.Apl618, Subject.Apl660]

const js3050Apl = [
    Subject.Apl703,
    Subject.Apl720,
    Subject.Apl731,
    Subject.Apl662,
    Subject.Apl669,
    Subject.Apl693,
    Subject.Apl718,
    Subject.Apl707,
    Subject.Apl732,
    Subject.Apl674,
    Subject.Apl627,
    Subject.Apl676,
    Subject.Apl702,
    Subject.Apl610,
    Subject.Apl618,
    Subject.Apl725,
    Subject.Apl668,
    Subject.Apl717,
    Subject.Apl681,
    Subject.Apl660,
    Subject.Apl719,
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

const js3236Apl = [
    Subject.Apl703,
    Subject.Apl722,
    Subject.Apl662,
    Subject.Apl640,
    Subject.Apl684,
    Subject.Apl669,
    Subject.Apl693,
    Subject.Apl683,
    Subject.Apl618,
    Subject.Apl668,
    Subject.Apl717,
    Subject.Apl672,
    Subject.Apl681,
    Subject.Apl691,
    Subject.Apl713,
    Subject.Apl706,
]

const js3237Apl = [
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

const js3240Apl = [
    Subject.Apl715,
    Subject.Apl723,
    Subject.Apl716,
    Subject.Apl662,
    Subject.Apl665,
    Subject.Apl728,
    Subject.Apl729,
    Subject.Apl676,
    Subject.Apl691,
    Subject.Apl726,
    Subject.Apl616,
]

const js3255Apl = [
    Subject.Apl627,
    Subject.Apl712,
    Subject.Apl592,
    Subject.Apl618,
    Subject.Apl615,
    Subject.Apl660,
]

const js3290Apl = [Subject.Apl618]

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

const js3741Apl = [Subject.Apl722]

export const polyuProgrammes: Programme[] = [
    {
        id: "JS3000",
        mapGrades,
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            select(sequence(multiplyAll(7), chooseBest(5)), bonusSubject),
        ),
    },
    {
        id: "JS3003",
        mapGrades,
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
        id: "JS3004",
        mapGrades,
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            select(
                sequence(
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
                            Subject.Chi,
                            Subject.DAT,
                            Subject.Econ,
                            Subject.ICT,
                        ),
                        multiplyAll(5),
                    ),
                    chooseBest(5),
                ),
                bonusSubject,
            ),
        ),
    },
    {
        id: "JS3005",
        mapGrades,
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3005Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3005Apl),
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.BAFS,
                    Subject.Chem,
                    Subject.DAT,
                    Subject.Econ,
                    Subject.Eng,
                    Subject.ICT,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                    ...js3005Apl,
                ),
                multiply7(
                    Subject.Chi,
                    Subject.ChiLit,
                    Subject.Geog,
                    Subject.EngLit,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3006",
        mapGrades,
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
        id: "JS3007",
        mapGrades,
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            select(
                sequence(
                    modify(
                        multiply10(Subject.Chi, Subject.Eng),
                        multiply5(Subject.Music, Subject.PE, Subject.VA),
                        multiplyAll(7),
                    ),
                    chooseBest(5),
                ),
                bonusSubject,
            ),
        ),
    },
    {
        id: "JS3008",
        mapGrades,
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3008Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3008Apl),
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
                multiply7(Subject.Chi, Subject.Apl660),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3011",
        mapGrades,
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3011Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3011Apl),
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Eng,
                    Subject.Maths,
                    Subject.Phys,
                ),
                multiply7(Subject.Chi, Subject.M1, Subject.M2, Subject.Apl660),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3030",
        mapGrades,
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
        mapGrades,
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3050Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3050Apl),
            polyuConfig,
            select(
                sequence(
                    modify(
                        multiply10(
                            Subject.Bio,
                            Subject.BAFS,
                            Subject.Chem,
                            Subject.ChiHist,
                            Subject.Econ,
                            Subject.Geog,
                            Subject.Hist,
                            Subject.TLFCT,
                            Subject.VA,
                        ),
                        multiply7(
                            Subject.Chi,
                            Subject.DAT,
                            Subject.Eng,
                            Subject.ICT,
                            Subject.Maths,
                            Subject.M1,
                            Subject.M2,
                            Subject.Phys,
                            Subject.TLFST,
                            Subject.Apl693,
                            Subject.Apl676,
                            Subject.Apl676,
                            Subject.Apl717,
                            Subject.Apl681,
                        ),
                        multiplyAll(5),
                    ),
                    chooseBest(5),
                ),
                bonusSubject,
            ),
        ),
    },
    {
        id: "JS3060",
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        id: "JS3130",
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        mapGrades,
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
        id: "JS3211",
        mapGrades,
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
        reference: "JS3110",
    },
    {
        id: "JS3214",
        mapGrades,
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            select(
                sequence(
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
                            Subject.Hist,
                            Subject.EngLit,
                            Subject.Maths,
                            Subject.M1,
                            Subject.M2,
                            Subject.Music,
                            Subject.Phys,
                            Subject.THS,
                            Subject.VA,
                        ),
                        multiplyAll(5),
                    ),
                    chooseBest(5),
                ),
                bonusSubject,
            ),
        ),
    },
    {
        id: "JS3220",
        mapGrades,
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
        id: "JS3223",
        mapGrades,
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
        id: "JS3236",
        mapGrades,
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3236Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3236Apl),
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
                    Subject.DAT,
                    Subject.Econ,
                    ...categoryCSubjects,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3237",
        mapGrades,
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3237Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3237Apl),
            polyuConfig,
            modify(
                multiply10(
                    Subject.BAFS,
                    Subject.Econ,
                    Subject.Eng,
                    Subject.ICT,
                    Subject.Maths,
                ),
                multiply7(
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Chi,
                    Subject.DAT,
                    Subject.Geog,
                    Subject.Phys,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3240",
        mapGrades,
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3240Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3240Apl),
            polyuConfig,
            select(
                sequence(
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
                bonusSubject,
            ),
        ),
    },
    {
        id: "JS3241",
        mapGrades,
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            select(
                sequence(
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
                bonusSubject,
            ),
        ),
    },
    {
        id: "JS3242",
        mapGrades,
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            select(
                sequence(
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
                bonusSubject,
            ),
        ),
    },
    {
        id: "JS3250",
        mapGrades,
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(multiplyAll(7)),
            chooseBest(5),
        ),
    },
    {
        id: "JS3255",
        mapGrades,
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3255Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3255Apl),
            polyuConfig,
            modify(
                multiply10(
                    Subject.Bio,
                    Subject.Chem,
                    Subject.Eng,
                    Subject.Maths,
                ),
                multiply7(Subject.Chi, Subject.M1, Subject.M2, Subject.Phys),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3290",
        mapGrades,
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3290Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3290Apl),
            polyuConfig,
            select(
                sequence(
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
                bonusSubject,
            ),
        ),
    },
    {
        id: "JS3310",
        mapGrades,
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
        mapGrades,
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            select(
                sequence(
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
                    chooseBest(5),
                ),
                bonusSubject,
            ),
        ),
    },
    {
        id: "JS3337",
        mapGrades,
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
        id: "JS3375",
        mapGrades,
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
        reference: "JS3120",
    },
    {
        id: "JS3478",
        mapGrades,
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            select(
                sequence(
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
                bonusSubject,
            ),
        ),
    },
    {
        id: "JS3569",
        mapGrades,
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
                    Subject.Apl669,
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
                    Subject.Apl693,
                    Subject.Apl676,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3612",
        mapGrades,
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
        mapGrades,
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
                    Subject.Phys,
                ),
                multiply7(
                    Subject.BAFS,
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
        mapGrades,
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
                    Subject.Phys,
                ),
                multiply7(Subject.HMSC, Subject.PE),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3648",
        mapGrades,
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
        id: "JS3739",
        mapGrades,
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            modify(
                multiply10(
                    Subject.Chem,
                    Subject.Eng,
                    Subject.Maths,
                    Subject.M1,
                    Subject.M2,
                    Subject.Phys,
                ),
                multiply7(
                    Subject.Bio,
                    Subject.Chi,
                    Subject.DAT,
                    Subject.Econ,
                    Subject.Geog,
                    Subject.ICT,
                ),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3741",
        mapGrades,
        requirement: select(
            polyuCore,
            requireMultiple(2, polyuElective(...js3741Apl)),
        ),
        weighting: sequence(
            discardCategoryBExcept(...js3741Apl),
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
                    ...js3741Apl,
                ),
                multiply7(Subject.Chi),
                multiplyAll(5),
            ),
            chooseBest(5),
        ),
    },
    {
        id: "JS3789",
        mapGrades,
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            select(
                sequence(
                    modify(
                        multiply10(Subject.Eng),
                        multiply5(
                            Subject.Music,
                            Subject.PE,
                            Subject.TLFCT,
                            Subject.TLFST,
                            Subject.VA,
                            ...categoryCSubjects,
                        ),
                        multiplyAll(7),
                    ),
                    chooseBest(5),
                ),
                bonusSubject,
            ),
        ),
    },
    {
        id: "JS3791",
        mapGrades,
        requirement: select(polyuCore, requireMultiple(2, polyuElective())),
        weighting: sequence(
            discardCategoryB,
            polyuConfig,
            select(
                sequence(
                    modify(
                        multiply10(
                            Subject.Eng,
                            Subject.Maths,
                            Subject.M1,
                            Subject.M2,
                            Subject.Phys,
                        ),
                        multiply5(
                            Subject.Music,
                            Subject.PE,
                            Subject.TLFCT,
                            Subject.TLFST,
                            Subject.VA,
                            ...categoryCSubjects,
                        ),
                        multiplyAll(7),
                    ),
                    chooseBest(5),
                ),
                bonusSubject,
            ),
        ),
        reference: "JS3100",
    },
    {
        id: "JS3868",
        mapGrades,
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
]
