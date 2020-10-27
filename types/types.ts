export interface CloudService {
    provider: string,
    displayName: string,
    logo: string,
    useIf: Array<string>,
    doNotUseIf: Array<string>,
    colorScheme?: string
}

export interface CloudServicesSearchResponse {
    meta: {
        nextCursor: boolean
    },
    services: CloudService[]
}

export interface CloudProvider {
    displayName: string
    name: string,
    selected: boolean,
}