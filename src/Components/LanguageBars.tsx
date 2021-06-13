import React from 'react'
import { Final } from "../Types/Types"
import './LanguageBars.scss';

interface InputProps {
    languages: Final[]
}

const LanguageBars: React.FunctionComponent<InputProps> = (props) => {
    const sortedLanguages = props.languages.sort((a,b) =>  b.count - a.count)
    const favouriteLanguage = sortedLanguages[0].count

    return (
       <div className="bar-container">
       {sortedLanguages.map(item => {
           const className = favouriteLanguage === item.count ? "fav" : "no-fav"
           return <div 
                    key={`${item.language}${item.count}`} 
                    className={className} 
                    style={{width: `${100 + item.count * 25}px`}}>
                        {item.language === null || "" ? "Not Specified" : item.language} : {item.count}
                </div>
       })}
       </div>
    )
}

export default LanguageBars