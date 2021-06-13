import { useState } from 'react'
import './SearchForm.scss';
import GitAPI from "../API/GitApi"
import { Final } from "../Types/Types"
import LanguageBars from "./LanguageBars"

const SearchForm = () => {
    const [userName, setUserName] = useState("")
    const [languages, setLanguages] = useState<Final[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
      }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const userLan = new GitAPI(userName)
        const result: Final[] = await userLan.getUserLanguages()
        if (result) {
            setLanguages(result)
        }
    }
    
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>
                GitHub User Name:
                <input type="text" value={userName} onChange={handleChange} />
                </label>
                <input type="submit" className="button" value="Submit" />
            </form>
            {languages?.length > 0 ? <LanguageBars languages={languages} /> : <div className="no-repo">No repos found</div>}
        </div>
        )
}

export default SearchForm