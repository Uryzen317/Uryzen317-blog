import Image from "next/image";

export default function ({ id, title, desc, lang, createdAt, updatedAt, updatedBy, device, likes, viwes, icon, author /* just username */ }) {
    // time interceptors
    createdAt = new Date(createdAt);
    createdAt = `${createdAt.getFullYear()}/${createdAt.getMonth()}/${createdAt.getDate()}-${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;

    if (updatedAt) {
        updatedAt = new Date(updatedAt);
        updatedAt = `${updatedAt.getFullYear()}/${updatedAt.getMonth()}/${updatedAt.getDate()}-${updatedAt.getHours()}:${updatedAt.getMinutes()}:${updatedAt.getSeconds()}`;
    }

    // name interceptors
    let usernameFirstLetter = author.username.split('')[0].toUpperCase();
    author.username = author.username.split('');
    author.username.shift();
    author.username = usernameFirstLetter + author.username.join('')

    if (updatedBy?.username) {
        let updatedByFirstLetter = updatedBy.username.split('')[0].toUpperCase();
        updatedBy.username = updatedBy.username.split('');
        updatedBy.username.shift();
        updatedBy.username = updatedByFirstLetter + updatedBy.username.join('')
    }

    return (
        <div className="post-container">
            <div className="header min-h-6 bg-gray-900 w-full p-1">
                <p className="text-gray-400 text-sm">Written by {author.username} | in [{lang}] | at {createdAt} | on {device} {updatedAt ? (`| updated at ${updatedAt} | by ${updatedBy.username}`) : ('')}</p>
            </div>
            <div className="body h-24 bg-gray-700 w-full p-2 flex gap-2">
                <Image className="w-32 h-20 border-2 border-gray-900" src={`http://localhost:3001/download/${icon}`} width={100} height={100} alt={title}></Image>
                <div className="details-section">
                    <p className="text-gray-200 text-xl">{title.toUpperCase()}</p>
                    <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: desc }}></p>
                </div>
            </div>
        </div>
    )
}