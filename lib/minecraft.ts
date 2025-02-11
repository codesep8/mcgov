async function uuidTousername(uuid: String) {
    let data = await fetch(`https://api.mojang.com/user/profile/${uuid}`, { next: { revalidate: 21600 } });
    if (data.status == 200) {
        return await data.json()
    } else {
        return false
    }
        
    
}

async function usernameTouuid(username: String) {
    let data = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`, { next: { revalidate: 21600 } })
    if (data.status == 200) {
        return await data.json()
    } else {
        return false
    }
}

export {
    uuidTousername,
    usernameTouuid
}