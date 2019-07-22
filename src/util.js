export function getRedirectPath({type,avatar}) {
    //根据用户信息 返回跳转地址
    //user.type /boss /seeker
    //avatar /bossinfo /seekerinfo
    let url=(type==='boss')?'/boss':'/seeker'
    if(!avatar)
    {
        url+='info'
    }
    return url

}
export function getChatId(userId,charId) {

  return [userId,charId].sort().join('_')  
    
}