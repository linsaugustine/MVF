import { User, Repo, Final } from "../Types/Types"

export default class GitAPI {
    private userName: string = ""
    private userEndpoint = "https://api.github.com/users/$"
    private repoEndpoint = "https://api.github.com/users/$/repos"

    constructor (userName: string) {
        this.userName = userName
    }

    private setErrorResponse = (code: number, message: string) => {
        return new Response(
            JSON.stringify({
                code,
                message
            })
        )
    }

    private handleApiError = (err: any) => {
        //log err
        return this.setErrorResponse(400, "Api call failed")
    }

    private handleParseError = (err: any) => {
        //log err
        return this.setErrorResponse(400, "Json parsing failed")
    }

    private getUserRepositoriesCount = async(): Promise<number> => {
        const url = this.userEndpoint.replace("$", this.userName)
        const result: User = await (await fetch(url).catch(this.handleApiError)).json().catch(this.handleParseError)
        return result?.public_repos ? result.public_repos : 0
    }

    private getUserRepositories = async(repoCount: number): Promise<Final[]> => {
        const perPage = 100
        const pages = Math.ceil(repoCount/perPage)
        const url = this.repoEndpoint.replace("$", this.userName)
        const languages: Final[] = []
        const result: Repo[] = []

        for (let i = 1; i <= pages; i++) {
            const endPoint = `${url}?page=${i}&per_page=${perPage}`
            const responseData =  await (await fetch(endPoint).catch(this.handleApiError)).json().catch(this.handleParseError)
            result.push(...responseData)
        }

        if (result.length > 0) {
            result.map(item => {
                const existing = languages.find(ln => ln.language === item.language)
                if (existing) {
                    existing.count = existing.count + 1
                } else {
                    languages.push({language: item.language, count: 1})
                }
            })

            return languages
        }

        return languages
    }

    getUserLanguages = async (): Promise<Final[]> => {
        const userRepoCount = await this.getUserRepositoriesCount()
        return userRepoCount > 0 ? await this.getUserRepositories(userRepoCount) : []
    }
}
