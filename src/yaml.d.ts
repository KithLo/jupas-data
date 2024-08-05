/* eslint-disable import/no-default-export */

declare module "./statistics/*.yml" {
    const content: Record<
        string,
        { UQ: number | null; M: number | null; LQ: number | null }
    >
    export default content
}

declare module "./studyAreas/*.yml" {
    const content: Record<string, string[]>
    export default content
}
