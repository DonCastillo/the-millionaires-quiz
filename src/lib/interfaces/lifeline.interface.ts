import type { LifelineName } from "$lib/constants/lifeline.constants"

export default interface LifelineInterface {
    name: string,
    type: LifelineName,
    icon: string,
    description: string,
    used: boolean
}