// 接口汇总
//服务器地址
// const server = 'http://47.100.237.163:8092/'; //正式地址
const server = 'http://192.168.1.98:8080/'; //汪老师地址



// 七牛
const qiniuH='http://picture.jiudianhunyan.com/'//正式地址
// const qiniuH='http://test.huashenghl.com/'//测式地址


// 登录
const userLogin = 'user/login'; 
// 登出
const scLogout = 'sc/logout'; 




// 用户信息
const userGetUserList = 'user/getUserList'; //查询
const userAddUser = 'user/addUser'; //添加
const userDelUser = 'user/delUser'; //删除 
const userUpdUser = 'user/updUser'; //修改

// 资源管理
const resourceGetParentDirectory = 'resource/getParentDirectory'; //修改
const resourceGetResourceList = 'resource/getResourceList'; //查询
const resourceAddResource = 'resource/addResource'; //添加
const resourceDelResource = 'resource/delResource'; //删除 
const resourceUpdResource = 'resource/updResource'; //修改


// 角色 and角色资源授权
const roleGetRoleList = 'role/getRoleList'; //查询角色资源权限
const roleResourceGetResourceByRoleId = 'roleResource/getResourceByRoleId'; //查询。角色资源权限
const roleResourceAddRoleResource = 'roleResource/addRoleResource'; //添加
const roleResourceDelRoleResource = 'roleResource/delRoleResource'; //删除 

// 授权
const powerGetPower = 'userPower/getPowerByUserId'; //查询
const userPowerAddUserPower = 'userPower/addUserPower'; //添加权限
const userPowerDelUserPower = 'userPower/delUserPower'; //删除权限

// 查询城市
const provinceGetProvinceList = 'province/getProvinceList'; //查询省级
const cityGetCityList = 'city/getCityList'; //查询省级
const cityUpdCity = 'city/updCity'; //城市开启关闭


// 酒店管理
const hotelsGetHotelsList = 'hotels/getHotelsList'; //查询
const hotelsAddHotels = 'hotels/addHotels'; //添加
const hotelsDelHotels = 'hotels/delHotels'; //删除 
const hotelsUpdHotels = 'hotels/updHotels'; //修改

// 已经录入的城市
const cityGetCityListByOpen = 'city/getCityListByOpen'; //查询

// 轮播图管理
const bannerGetBannerList = 'banner/getBannerList'; //查询
const bannerAddBanner = 'banner/addBanner'; //添加
const bannerDelBanner = 'banner/delBanner'; //删除 
const bannerUpdBanner = 'banner/updBanner'; //修改

// 上热门审核
const auditGetAuditList = 'audit/getAuditList'; //查询
const auditAddAudit = 'audit/addAudit'; //添加||在酒店管理中添加
const auditUpdAudit = 'audit/updAudit'; //修改

// 热门酒店推荐
const hotHotelsGetHotHotelsList = 'hotHotels/getHotHotelsList'; //查询
const hotHotelsUpdHotHotels = 'hotHotels/updHotHotels'; //修改

// 热门酒店四大详情1
const hotelsPictureGetHotelsPictureList = 'hotelsPicture/getHotelsPictureList'; //查询
const hotelsPictureAddHotelsPicture = 'hotelsPicture/addHotelsPicture'; //添加
const hotelsPictureDelHotelsPicture = 'hotelsPicture/delHotelsPicture'; //删除 
const hotelsPictureUpdHotelsPicture = 'hotelsPicture/updHotelsPicture'; //修改

// 热门酒店四大详情1
const banquetHallGetBanquetHallList = 'banquetHall/getBanquetHallList'; //查询
const banquetHallAddBanquetHall = 'banquetHall/addBanquetHall'; //添加
const banquetHallDelBanquetHall = 'banquetHall/delBanquetHall'; //删除 
const banquetHallUpdBanquetHall = 'banquetHall/updBanquetHall'; //修改

// 宴会厅详情四大详情2
const hallPictureGetHallPictureList = 'hallPicture/getHallPictureList'; //查询
const hallPictureAddHallPicture = 'hallPicture/addHallPicture'; //添加
const hallPictureDelHallPicture = 'hallPicture/delHallPicture'; //删除 
const hallPictureUpdHallPicture = 'hallPicture/updHallPicture'; //修改

// 婚宴菜单四大详情3
const weddingMenuGetWeddingMenuList = 'weddingMenu/getWeddingMenuList'; //查询
const weddingMenuAddWeddingMenu = 'weddingMenu/addWeddingMenu'; //添加
const weddingMenuDelWeddingMenu = 'weddingMenu/delWeddingMenu'; //删除 
const weddingMenuUpdWeddingMenu = 'weddingMenu/updWeddingMenu'; //修改

// 酒店介绍 四大详情4
const hotelIntroductionGetHotelIntroduction = 'hotelIntroduction/getHotelIntroduction'; //查询
const hotelIntroductionAddHotelIntroduction = 'hotelIntroduction/addHotelIntroduction'; //添加
const hotelIntroductionDelHotelIntroduction = 'hotelIntroduction/delHotelIntroduction'; //删除 
const hotelIntroductionUpdHotelIntroduction = 'hotelIntroduction/updHotelIntroduction'; //修改

// 策划案例

const planCaseAddPlanCase = 'planCase/addPlanCase'; //添加
const planCaseDelPlanCase = 'planCase/delPlanCase'; //删除 
const planCaseUpdPlanCase = 'planCase/updPlanCase'; //修改
const planCaseGetPlanCaseList = 'planCase/getPlanCaseList'; //查询

// 策划案例详情

const casePictureAddCasePicture = 'casePicture/addCasePicture'; //添加
const casePictureDelCasePicture = 'casePicture/delCasePicture'; //删除 
const casePictureUpdCasePicture = 'casePicture/updCasePicture'; //修改
const casePictureGetCasePictureList = 'casePicture/getCasePictureList'; //查询

// 审核类型
const dictionaryGetAuditType = 'dictionary/getAuditType'; //查询

// 热门策划案例
const hotPlanCaseGetHotPlanCaseList = 'hotPlanCase/getHotPlanCaseList'; //查询
const hotPlanCaseUpdHotPlanCase = 'hotPlanCase/updHotPlanCase'; //修改

// 酒店三步查
const consultationDataGetConsultationDataList = 'consultationData/getConsultationDataList'; //查询

// 友情链接
const friendshipLinksAddFriendshipLinks = 'friendshipLinks/addFriendshipLinks'; //增加
const friendshipLinksDelFriendshipLinks = 'friendshipLinks/delFriendshipLinks'; //删除
const friendshipLinksSelFriendshipLinks = 'friendshipLinks/selFriendshipLinks'; //查询

// 广告图
const homepageAdsAddHomepageAds = 'homepageAds/addHomepageAds'; //增加
const homepageAdsDelHomepageAds = 'homepageAds/delHomepageAds'; //删除
const homepageAdsSelHomepageAds = 'homepageAds/selHomepageAds'; //查询



export default{

    server:server,

    
    qiniuH:qiniuH,

    userLogin:userLogin,

    scLogout:scLogout,
    



    userGetUserList:userGetUserList,
    userAddUser:userAddUser,
    userDelUser:userDelUser,
    userUpdUser:userUpdUser,

    resourceGetParentDirectory:resourceGetParentDirectory,
    resourceGetResourceList:resourceGetResourceList,
    resourceAddResource:resourceAddResource,
    resourceDelResource:resourceDelResource,
    resourceUpdResource:resourceUpdResource,

    roleGetRoleList:roleGetRoleList,
    roleResourceGetResourceByRoleId:roleResourceGetResourceByRoleId,
    roleResourceAddRoleResource:roleResourceAddRoleResource,
    roleResourceDelRoleResource:roleResourceDelRoleResource,

    powerGetPower:powerGetPower,
    userPowerAddUserPower:userPowerAddUserPower,
    userPowerDelUserPower:userPowerDelUserPower,

    provinceGetProvinceList:provinceGetProvinceList,
    cityGetCityList:cityGetCityList,
    cityUpdCity:cityUpdCity,

    hotelsGetHotelsList:hotelsGetHotelsList,
    hotelsAddHotels:hotelsAddHotels,
    hotelsDelHotels:hotelsDelHotels,
    hotelsUpdHotels:hotelsUpdHotels,

    cityGetCityListByOpen:cityGetCityListByOpen,

    bannerGetBannerList:bannerGetBannerList,
    bannerAddBanner:bannerAddBanner,
    bannerDelBanner:bannerDelBanner,
    bannerUpdBanner:bannerUpdBanner,

    auditGetAuditList:auditGetAuditList,
    auditAddAudit:auditAddAudit,
    auditUpdAudit:auditUpdAudit,

    hotHotelsGetHotHotelsList:hotHotelsGetHotHotelsList,
    hotHotelsUpdHotHotels:hotHotelsUpdHotHotels,

    hotelsPictureGetHotelsPictureList:hotelsPictureGetHotelsPictureList,
    hotelsPictureAddHotelsPicture:hotelsPictureAddHotelsPicture,
    hotelsPictureDelHotelsPicture:hotelsPictureDelHotelsPicture,
    hotelsPictureUpdHotelsPicture:hotelsPictureUpdHotelsPicture,

    banquetHallGetBanquetHallList:banquetHallGetBanquetHallList,
    banquetHallAddBanquetHall:banquetHallAddBanquetHall,
    banquetHallDelBanquetHall:banquetHallDelBanquetHall,
    banquetHallUpdBanquetHall:banquetHallUpdBanquetHall,

    hallPictureGetHallPictureList:hallPictureGetHallPictureList,
    hallPictureAddHallPicture:hallPictureAddHallPicture,
    hallPictureDelHallPicture:hallPictureDelHallPicture,
    hallPictureUpdHallPicture:hallPictureUpdHallPicture,

    weddingMenuGetWeddingMenuList:weddingMenuGetWeddingMenuList,
    weddingMenuAddWeddingMenu:weddingMenuAddWeddingMenu,
    weddingMenuDelWeddingMenu:weddingMenuDelWeddingMenu,
    weddingMenuUpdWeddingMenu,weddingMenuUpdWeddingMenu,

    hotelIntroductionGetHotelIntroduction:hotelIntroductionGetHotelIntroduction,
    hotelIntroductionAddHotelIntroduction:hotelIntroductionAddHotelIntroduction,
    hotelIntroductionDelHotelIntroduction:hotelIntroductionDelHotelIntroduction,
    hotelIntroductionUpdHotelIntroduction:hotelIntroductionUpdHotelIntroduction,

    planCaseAddPlanCase:planCaseAddPlanCase,
    planCaseDelPlanCase:planCaseDelPlanCase,
    planCaseUpdPlanCase:planCaseUpdPlanCase,
    planCaseGetPlanCaseList:planCaseGetPlanCaseList,

    casePictureAddCasePicture:casePictureAddCasePicture,
    casePictureDelCasePicture:casePictureDelCasePicture,
    casePictureUpdCasePicture:casePictureUpdCasePicture,
    casePictureGetCasePictureList:casePictureGetCasePictureList,

    dictionaryGetAuditType:dictionaryGetAuditType,

    hotPlanCaseGetHotPlanCaseList:hotPlanCaseGetHotPlanCaseList,
    hotPlanCaseUpdHotPlanCase:hotPlanCaseUpdHotPlanCase,

    consultationDataGetConsultationDataList:consultationDataGetConsultationDataList,

    friendshipLinksAddFriendshipLinks:friendshipLinksAddFriendshipLinks,
    friendshipLinksDelFriendshipLinks:friendshipLinksDelFriendshipLinks,
    friendshipLinksSelFriendshipLinks:friendshipLinksSelFriendshipLinks,

    homepageAdsAddHomepageAds:homepageAdsAddHomepageAds,
    homepageAdsDelHomepageAds:homepageAdsDelHomepageAds,
    homepageAdsSelHomepageAds:homepageAdsSelHomepageAds,
    
}
