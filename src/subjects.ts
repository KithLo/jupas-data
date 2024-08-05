export enum Subject {
    // Category A Subjects
    /** Chinese Language */
    Chi = "Chi",
    /** English Language */
    Eng = "Eng",
    /** Mathematics */
    Maths = "Maths",
    /** Mathematics Extended Module 1 */
    M1 = "M1",
    /** Mathematics Extended Module 2 */
    M2 = "M2",
    /** Chinese Literature */
    ChiLit = "ChiLit",
    /** Literature in English */
    EngLit = "EngLit",
    /** Chinese History */
    ChiHist = "ChiHist",
    /** Economics */
    Econ = "Econ",
    /** Ethics and Religious Studies */
    ERS = "ERS",
    /** Geography */
    Geog = "Geog",
    /** History */
    Hist = "Hist",
    /** Tourism and Hospitality Studies */
    THS = "THS",
    /** Biology */
    Bio = "Bio",
    /** Chemistry */
    Chem = "Chem",
    /** Physics */
    Phys = "Phys",
    /** Business, Accounting and Financial Studies */
    BAFS = "BAFS",
    /** Design and Applied Technology */
    DAT = "DAT",
    /** Health Management and Social Care */
    HMSC = "HMSC",
    /** Information and Communication Technology */
    ICT = "ICT",
    /** Technology and Living (Fashion, Clothing and Textiles) */
    TLFCT = "TLFCT",
    /** Technology and Living (Food Science and Technology) */
    TLFST = "TLFST",
    /** Music */
    Music = "Music",
    /** Visual Arts */
    VA = "VA",
    /** Physical Education */
    PE = "PE",

    // pass or fail subjects
    /** Citizenship and Social Development */
    CS = "CS",

    // Applied learning subjects
    /** Fashion Image Design */
    Apl676 = "Apl676",
    /** Interior Design */
    Apl668 = "Apl668",
    /** Jewellery Design in Digital Age */
    Apl717 = "Apl717",
    /** Computer Game and Animation Design */
    Apl669 = "Apl669",
    /** Digital Comic Design and Production */
    Apl707 = "Apl707",
    /** Popular Music Production */
    Apl710 = "Apl710",
    /** Taking a Chance on Dance */
    Apl599 = "Apl599",
    /** The Essentials of Theatre Arts */
    Apl677 = "Apl677",
    /** Digital Media and Radio Production */
    Apl711 = "Apl711",
    /** Film and Transmedia */
    Apl702 = "Apl702",
    /** Digital Brand Communication */
    Apl718 = "Apl718",
    /** Multimedia Storytelling */
    Apl719 = "Apl719",
    /** PR and Multimedia Communication */
    Apl708 = "Apl708",
    /** Accounting for e-Business */
    Apl703 = "Apl703",
    /** AI in Business */
    Apl720 = "Apl720",
    /** Data Application for Business */
    Apl693 = "Apl693",
    /** Marketing and Online Promotion */
    Apl681 = "Apl681",
    /** Law Enforcement in Hong Kong */
    Apl672 = "Apl672",
    /** Modern Southeast Asian Cuisine */
    Apl721 = "Apl721",
    /** Pâtisserie and Café Operations */
    Apl688 = "Apl688",
    /** Western Cuisine */
    Apl616 = "Apl616",
    /** Airport Passenger Terminal Operations */
    Apl709 = "Apl709",
    /** Hospitality Services in Practice */
    Apl611 = "Apl611",
    /** Hotel Operations */
    Apl615 = "Apl615",
    /** Child Care and Development */
    Apl704 = "Apl704",
    /** Child Care and Education */
    Apl665 = "Apl665",
    /** Fundamental Cosmetology */
    Apl610 = "Apl610",
    /** Food Innovation and Science */
    Apl712 = "Apl712",
    /** Animal Care */
    Apl689 = "Apl689",
    /** Foundation in Chinese Medicine */
    Apl592 = "Apl592",
    /** Health Care Practice */
    Apl618 = "Apl618",
    /** Medical Laboratory Science */
    Apl660 = "Apl660",
    /** Rehabilitation Care Practice */
    Apl713 = "Apl713",
    /** Applied Psychology */
    Apl662 = "Apl662",
    /** Practical Psychology */
    Apl691 = "Apl691",
    /** Exercise and Fitness Coaching */
    Apl674 = "Apl674",
    /** Exercise Science and Health Fitness */
    Apl627 = "Apl627",
    /** Electrical and Energy Engineering */
    Apl683 = "Apl683",
    /** AI and Robotics */
    Apl722 = "Apl722",
    /** Computer Forensic Technology */
    Apl684 = "Apl684",
    /** eSports Technology */
    Apl714 = "Apl714",
    /** Tech Basics */
    Apl706 = "Apl706",
    /** Aviation Studies */
    Apl640 = "Apl640",
    /** Railway Studies */
    Apl698 = "Apl698",
    /** English Communication */
    Apl715 = "Apl715",
    /** English for Business Services */
    Apl723 = "Apl723",
    /** English for Service Professionals */
    Apl716 = "Apl716",
    /** Chinese in Business Service */
    Apl695 = "Apl695",
    /** Chinese in Practical Context */
    Apl700 = "Apl700",
    /** Practical Chinese */
    Apl699 = "Apl699",
    /** Korean Language and Culture */
    Apl725 = "Apl725",
    /** Practical Translation (CHI-ENG) */
    Apl726 = "Apl726",

    // Other languages subjects
    French = "French",
    German = "German",
    Hindi = "Hindi",
    Japanese = "Japanese",
    Spanish = "Spanish",
    Urdu = "Urdu",
}

export const aplDesignStudies = [Subject.Apl676, Subject.Apl668, Subject.Apl717]

export const aplMediaArts = [Subject.Apl669, Subject.Apl707, Subject.Apl710]

export const aplPerformingArts = [Subject.Apl599, Subject.Apl677]

export const aplFilmsTvAndBroadcasting = [Subject.Apl711, Subject.Apl702]

export const aplMediaProductionAndPublicRelations = [
    Subject.Apl718,
    Subject.Apl719,
    Subject.Apl708,
]

export const aplAccountAndFinance = [Subject.Apl703]

export const aplBuisinessStudies = [
    Subject.Apl720,
    Subject.Apl693,
    Subject.Apl681,
]

export const aplLegalStudies = [Subject.Apl672]

export const aplFoodServicesAndManagement = [
    Subject.Apl721,
    Subject.Apl668,
    Subject.Apl616,
]

export const aplHospitalityServices = [
    Subject.Apl709,
    Subject.Apl611,
    Subject.Apl615,
]

export const aplPersonalAndCommunityServices = [
    Subject.Apl704,
    Subject.Apl665,
    Subject.Apl610,
]

export const aplFoodScience = [Subject.Apl712]

export const aplMedicalScienceAndHealthCare = [
    Subject.Apl689,
    Subject.Apl592,
    Subject.Apl618,
    Subject.Apl660,
    Subject.Apl713,
]

export const aplPsychology = [Subject.Apl662, Subject.Apl691]

export const aplSports = [Subject.Apl674, Subject.Apl627]

export const aplCivilElectricalAndMechanicalEngineering = [Subject.Apl683]

export const aplInformationEngineering = [
    Subject.Apl722,
    Subject.Apl684,
    Subject.Apl714,
    Subject.Apl706,
]

export const aplServicesEngineering = [Subject.Apl640, Subject.Apl698]

export const aplVocationalEnglish = [
    Subject.Apl715,
    Subject.Apl723,
    Subject.Apl716,
]

export const aplChinese = [Subject.Apl695, Subject.Apl700, Subject.Apl699]

export const aplOthers = [Subject.Apl725, Subject.Apl726]

const _coreSubjects = [
    Subject.Chi,
    Subject.Eng,
    Subject.Maths,
    Subject.CS,
] as const

export type CoreSubject = (typeof _coreSubjects)[number]

export const coreSubjects = _coreSubjects as unknown as Subject[]

export const categoryASubjects = [
    Subject.Chi,
    Subject.Eng,
    Subject.Maths,
    Subject.M1,
    Subject.M2,
    Subject.ChiLit,
    Subject.EngLit,
    Subject.ChiHist,
    Subject.Econ,
    Subject.ERS,
    Subject.Geog,
    Subject.Hist,
    Subject.THS,
    Subject.Bio,
    Subject.Chem,
    Subject.Phys,
    Subject.BAFS,
    Subject.DAT,
    Subject.HMSC,
    Subject.ICT,
    Subject.TLFCT,
    Subject.TLFST,
    Subject.Music,
    Subject.VA,
    Subject.PE,
]

export const categoryBSubjects = [
    ...aplDesignStudies,
    ...aplMediaArts,
    ...aplPerformingArts,
    ...aplFilmsTvAndBroadcasting,
    ...aplMediaProductionAndPublicRelations,
    ...aplAccountAndFinance,
    ...aplBuisinessStudies,
    ...aplLegalStudies,
    ...aplFoodServicesAndManagement,
    ...aplHospitalityServices,
    ...aplPersonalAndCommunityServices,
    ...aplFoodScience,
    ...aplMedicalScienceAndHealthCare,
    ...aplPsychology,
    ...aplSports,
    ...aplCivilElectricalAndMechanicalEngineering,
    ...aplInformationEngineering,
    ...aplServicesEngineering,
    ...aplVocationalEnglish,
    ...aplChinese,
    ...aplOthers,
]

export const categoryCSubjects = [
    Subject.French,
    Subject.German,
    Subject.Hindi,
    Subject.Japanese,
    Subject.Spanish,
    Subject.Urdu,
]

export const passFailSubjects = [Subject.CS]

export const subjects = Object.values(Subject)

export const conflictingSubjects: [Subject[], Subject[]][] = [
    [[Subject.M2], [Subject.M1]],
    [[Subject.Chi], aplChinese],
]
