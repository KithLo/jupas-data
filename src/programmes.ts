import { isNotNil, pickBy } from "rambda"
import { Institution } from "./institutions"
import { cityuProgrammes } from "./programmes/cityu"
import { cuhkProgrammes } from "./programmes/cuhk"
import { eduhkProgrammes } from "./programmes/eduhk"
import { hkbuProgrammes } from "./programmes/hkbu"
import { hkmuProgrammes } from "./programmes/hkmu"
import { hkuProgrammes } from "./programmes/hku"
import { hkustProgrammes } from "./programmes/hkust"
import { lingnanuProgrammes } from "./programmes/lingnanu"
import { polyuProgrammes } from "./programmes/polyu"
import { sssdpProgrammes } from "./programmes/sssdp"
import cityuStatistics from "./statistics/cityu.yml"
import cityuAltStatistics from "./statistics/cityu_last.yml"
import cuhkStatistics from "./statistics/cuhk.yml"
import eduhkStatistics from "./statistics/eduhk.yml"
import hkbuStatistics from "./statistics/hkbu.yml"
import hkmuStatistics from "./statistics/hkmu.yml"
import hkuStatistics from "./statistics/hku.yml"
import hkustStatistics from "./statistics/hkust.yml"
import lingnanuStatistics from "./statistics/lingnanu.yml"
import polyuStatistics from "./statistics/polyu.yml"
import sssdpStatistics from "./statistics/sssdp.yml"
import cityuStudyAreas from "./studyAreas/cityu.yml"
import cuhkStudyAreas from "./studyAreas/cuhk.yml"
import eduhkStudyAreas from "./studyAreas/eduhk.yml"
import hkbuStudyAreas from "./studyAreas/hkbu.yml"
import hkmuStudyAreas from "./studyAreas/hkmu.yml"
import hkuStudyAreas from "./studyAreas/hku.yml"
import hkustStudyAreas from "./studyAreas/hkust.yml"
import lingnanuStudyAreas from "./studyAreas/lingnanu.yml"
import polyuStudyAreas from "./studyAreas/polyu.yml"
import sssdpStudyAreas from "./studyAreas/sssdp.yml"
import { Programme } from "./types"

function combine(
    programmes: Programme[],
    studyAreas: any,
    statistics: any,
    altStatistics?: any,
) {
    return programmes.map((programme) => ({
        ...programme,
        studyAreas: studyAreas[programme.id] || [],
        statistics: pickBy(isNotNil, statistics[programme.id] || {}),
        altStatistics: pickBy(isNotNil, altStatistics?.[programme.id] || {}),
    }))
}

export const programmes = {
    [Institution.CUHK]: combine(cuhkProgrammes, cuhkStudyAreas, cuhkStatistics),
    [Institution.CityU]: combine(
        cityuProgrammes,
        cityuStudyAreas,
        cityuStatistics,
        cityuAltStatistics,
    ),
    [Institution.EdUHK]: combine(
        eduhkProgrammes,
        eduhkStudyAreas,
        eduhkStatistics,
    ),
    [Institution.HKBU]: combine(hkbuProgrammes, hkbuStudyAreas, hkbuStatistics),
    [Institution.HKMU]: combine(hkmuProgrammes, hkmuStudyAreas, hkmuStatistics),
    [Institution.HKU]: combine(hkuProgrammes, hkuStudyAreas, hkuStatistics),
    [Institution.HKUST]: combine(
        hkustProgrammes,
        hkustStudyAreas,
        hkustStatistics,
    ),
    [Institution.LingnanU]: combine(
        lingnanuProgrammes,
        lingnanuStudyAreas,
        lingnanuStatistics,
    ),
    [Institution.PolyU]: combine(
        polyuProgrammes,
        polyuStudyAreas,
        polyuStatistics,
    ),
    [Institution.SSSDP]: combine(
        sssdpProgrammes,
        sssdpStudyAreas,
        sssdpStatistics,
    ),
}
