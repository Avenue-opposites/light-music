// 二维码状态
export const enum QR_CODE_STATE {
  // 过期
  OVERDUE = 800,
  //等待中
  WAITING = 801,
  //未确认
  UNCONFIRMED = 802,
  //登录成功
  LOGIN_SUCCEED = 803,
}
//登录状态
export const enum LOGIN_STATE {
  ONLINE = 0,
  OFFLINE = -10,
}
//性别
export const enum Gender {
  FEMALE,
  MALE,
}
//横幅目标类型
export const enum BANNER_TARGET_TYPE {
  NEW_SONG_DEBUT = 1,
  NEW_ALBUM_FIRST = 10,
  EXCLUSIVE_PLANNING = 1000,
  NON_PLAY = 3000,
}
export const enum ORIGIN_COVER_TYPE {
  /**
   * @description 未知
   */
  UNKNOWN,
  /**
   * @description 原曲
   */
  ORIGINAL,
  /**
   * @description 翻唱
   */
  COVER,
}
export enum FEE_TYPE {
  /**
   * @description 免费歌曲
   */
  FREE,
  /**
   * @description vip歌曲
   */
  VIP,
  /**
   * @description 付费专辑
   */
  CHARGE_ALBUM = 4,
  /**
   * @description 非会员可免费播放低音质，会员可播放高音质及下载
   */
  LIMITED = 8,
}
export enum PALY_MODE_TYPE {
  /**
   * @description 顺序播放模式
   */
  ORDER_PALY_MODE,
  /**
   * @description 心动播放模式
   */
  HEARTBEAT_PALY_MODE,
  /**
   * @description 列表循环播放模式
   */
  LIST_CYCLE_PLAY_MODE,
  /**
   * @description 单曲循环播放模式
   */
  SINGLE_CYCLE_PLAY_MODE,
  /**
   * @description 随机播放模式
   */
  SHUFFLE_PALY_MODE,
}
export enum CLASSIFICATION_PODCAST_TYPE {
  /**
   * @description 音乐播客类型
   */
  MUSIC_PODCAST = 2,
  /**
   * @description 情感类型
   */
  EMOTIONAL = 3,
  /**
   * @description 生活类型
   */
  LIFE = 6,
  /**
   * @description 脱口秀类型
   */
  TALK_SHOW = 8,
  /**
   * @description 知识类型
   */
  KNOWLEDGE = 11,
  /**
   * @description 亲子类型
   */
  BABY = 13,
  /**
   * @description 明星类型
   */
  STAR = 14,
  /**
   * @description 创作翻唱类型
   */
  CREATIVE_COVER = 2001,
  /**
   * @description 二次元类型
   */
  TWO_DIMENSIONAL_SPACE = 3001,
  /**
   * @description 有声书类型
   */
  AUDIO_BOOK = 10001,
  /**
   * @description 电音类型
   */
  ELECTRONIC_MUSIC = 10002,
  /**
   * @description 故事类型
   */
  STORE = 3080097,
  /**
   * @description 人文历史类型
   */
  HUMAN_HISTORY = 3080098,
  /**
   * @description 其他类型
   */
  OTHER = 3081098,
  /**
   * @description 娱乐类型
   */
  AMUSEMENT = 3083097,
  /**
   * @description 新闻资讯类型
   */
  NEWS_INFORMATION = 3087096,
  /**
   * @description 广播剧类型
   */
  RADIO_DRAMA = 3088097,
  /**
   * @description 相声曲艺类型
   */
  FOLK_ARTS = 3088098,
  /**
   * @description 文学出版类型
   */
  PUBLISHED_LITERATURE = 3148096,
}
//音质
export const enum SOUND_QUALITY {
  //"标准"
  STANDARD = "standard",
  //较高
  HIGHER = "higher",
  //极高
  EXTREME_HIGH = "exhigh",
  //无损
  LOSSLESS = "lossless",
  HIRES = "Hi-Res",
  //鲸云臻音
  JY_EFFECT = "jyeffect",
  //鲸云母带
  JY_MASTER = "jymaster",
}
type Sound_Quality =
  | "standard"
  | "higher"
  | "exhigh"
  | "lossless"
  | "Hi-Res"
  | "jyeffect"
  | "jymaster";
export type SongEncode = "mp3" | "wma" | "wav" | "ape" | "flac" | "ogg" | "aac";
//横幅类型
export type Banner = {
  adDispatchJson: null;
  adLocation: null;
  adSource: null;
  adid: null;
  bannerBizType: string;
  encodeId: string;
  event: null;
  exclusive: boolean;
  extMonitor: null;
  extMonitorInfo: null;
  imageUrl: string;
  monitorBlackList: null;
  monitorClick: null;
  monitorClickList: null;
  monitorImpress: null;
  monitorImpressList: null;
  monitorType: null;
  program: null;
  scm: string;
  song: null;
  targetId: number;
  targetType: BANNER_TARGET_TYPE;
  titleColor: string;
  typeTitle: string;
  url: string;
  video: Object;
};

export type BannersData = {
  banners: Array<Banner>;
};

//响应类型
export type Response<T> = {
  data: T;
  code: number;
  message: string;
};

//用户隐私限制
export type UserPrivacyLimit = {
  area: boolean;
  college: boolean;
  gender: boolean;
  age: boolean;
  villageAge: boolean;
};

//用户绑定账号
export type UserBinding = {
  bindingTime: number;
  expired: boolean;
  expiredIn: number;
  id: number;
  refreshTime: number;
  tokenJsonStr: string;
  type: number;
  url: string;
  userId: number;
};
//基本简介
export type BaseProfile = {
  accountStatus: number;
  authStatus: number;
  authority: number;
  avatarDetail: object;
  avatarImgId: number;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundUrl: string;
  birthday: number;
  city: number;
  createTime: number;
  defaultAvatar: boolean;
  description: string;
  detailDescription: object;
  djStatus: number;
  expertTags: object;
  experts: object;
  followed: boolean;
  gender: Gender;
  mutual: boolean;
  nickname: string;
  province: number;
  remarkName: string;
  userId: number;
  userType: number;
  signature: string;
  vipType: number;
};
//简介
export type Profile = {
  accountType: number;
  anchor: boolean;
  authenticated: boolean;
  authenticationTypes: number;
  lastLoginIP: string;
  lastLoginTime: number;
  locationStatus: number;
  userName: string;
  shortUserName: string;
  viptypeVersion: number;
} & BaseProfile;
//用户细节简介
export type UserDetailProfile = {
  allSubscribedCount: number;
  artistIdentity: any[];
  avatarImgIdStr: string;
  avatarImgId_str: string;
  backgroundImgIdStr: string;
  blacklist: boolean;
  cCount: number;
  eventCount: number;
  followMe: boolean;
  followTime: number;
  followeds: number;
  follows: number;
  inBlacklist: boolean;
  newFollows: number;
  playlistBeSubscribedCount: number;
  playlistCount: number;
  privacyItemUnlimit: UserPrivacyLimit;
  sCount: number;
  sDJPCount: number;
} & BaseProfile;
//账号
export type Account = {
  anonimousUser: boolean;
  ban: number;
  baoyueVersion: number;
  createTime: number;
  donateVersion: number;
  id: number;
  paidFee: boolean;
  status: LOGIN_STATE;
  tokenVersion: number;
  type: number;
  userName: string;
  vipType: number;
  whitelistAuthority: number;
};
//简介村庄信息
export type ProfileVillageInfo = {
  imageUrl: string;
  targetUrl: string;
  title: string;
};
//用户点
export type UserPoint = {
  balance: number;
  blockBalance: number;
  status: LOGIN_STATE;
  updateTime: number;
  userId: number;
  version: number;
};
//用户细节
export type UserDetail = {
  adValid: boolean;
  bindings: Array<UserBinding>;
  createDays: number;
  createTime: number;
  level: number;
  listenSongs: number;
  mobileSign: boolean;
  newUser: boolean;
  pcSign: boolean;
  peopleCanSeeMyPlayRecord: boolean;
  profile: UserDetailProfile;
  profileVillageInfo: ProfileVillageInfo;
  recallUser: boolean;
  userPoint: UserPoint;
};

//用户账号信息
export type UserAccount = {
  account: Account;
  profile: Profile;
};

export type BasePlaylist = {
  alg: string;
  copywriter: string;
  id: number;
  name: string;
  picUrl: string;
  // playCount: number;
  trackCount: number;
  type: number;
};

export type PersonalizedPlaylist = {
  canDislike: boolean;
  highQuality: boolean;
  trackNumberUpdateTime: number;
  playCount: number; //注意
} & BasePlaylist;

export type PersonalizedPlaylistData = {
  category: number;
  hasTaste: boolean;
  result: PersonalizedPlaylist[];
};
export type RecommendPlaylist = {
  createTime: number;
  creator: BaseProfile;
  userId: number;
  playcount: number; //注意
} & BasePlaylist;

export type RecommendPlaylistData = {
  featureFirst: boolean;
  haveRcmdSongs: boolean;
  recommend: Array<RecommendPlaylist>;
};

//检查音乐可用
export type CheckMusicData = {
  success: boolean;
  message: "ok" | "亲爱的,暂无版权";
};

export type FreeTimeTrialPrivilege = {
  resConsumable: boolean;
  userConsumable: boolean;
  type: number;
  remainTime: number;
};
export type FreeTrialPrivilege = {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: null;
  cannotListenReason: null;
};
//歌曲
export type Song = {
  br: number;
  canExtend: boolean;
  code: number;
  effectTypes: null;
  encodeType: SongEncode;
  expi: number;
  fee: number;
  flag: number;
  //免费试用特权
  freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
  freeTrialInfo: null;
  freeTrialPrivilege: FreeTrialPrivilege;
  gain: number;
  id: number;
  level: SOUND_QUALITY;
  md5: string;
  payed: number;
  peak: number;
  podcastCtrp: null;
  rightSource: number;
  size: number;
  time: number;
  type: SongEncode;
  uf: null;
  url: string;
  urlSource: number;
};

export type SongURLData = Song[];

//收费信息列表
export type ChargeInformation = {
  chargeMessage: string;
  chargeType: number;
  chargeUrl: string;
  rate: number;
};

//特权
export type Privilege = {
  //收费信息列表
  chargeInfoList: Array<ChargeInformation>;
  cp: number;
  cs: boolean;
  dl: number;
  dlLevel: string;
  downloadMaxBrLevel: string;
  downloadMaxbr: number;
  fee: number;
  fl: number;
  flLevel: SOUND_QUALITY;
  flag: number;
  freeTrialPrivilege: FreeTrialPrivilege;
  id: number;
  maxBrLevel: string;
  maxbr: number;
  payed: number;
  pl: number;
  plLevel: string;
  playMaxBrLevel: string;
  playMaxbr: number;
  preSell: boolean;
  rscl: null;
  sp: number;
  st: number;
  subp: number;
  toast: boolean;
};

export type SongFileInformation = {
  /**
   * @description 码率
   */
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
};

//歌曲专辑
export type SongAlbum = {
  id: number;
  name: string;
  pic: number;
  picUrl: string;
  pic_str: string;
  tns: unknown[];
};

export type Singer = {
  alias: unknown[];
  id: number;
  name: string;
  tns: unknown[];
};

export type SingerList = Singer[];
/**
 * @description 歌曲细节
 */
export type SongDetail = {
  a: null;
  /**
   * @description 专辑信息
   */
  al: SongAlbum;
  alia: unknown[];
  ar: SingerList;
  awardTags: null;
  /**
   * @description 表示歌曲属于专辑中第几张CD，对应音频文件的Tag
   */
  cd: string;
  cf: string;
  copyright: number;
  cp: number;
  crbt: null;
  /**
   * @description 0: 不是DJ节目,其他：是DJ节目，表示DJ ID
   */
  djId: number;
  /**
   * @description 歌曲时长
   */
  dt: number;
  entertainmentTags: null;
  /**
   * @description 歌曲费用类型
   */
  fee: FEE_TYPE;
  ftype: number;
  /**
   * @description 高质量文件信息
   */
  h: SongFileInformation;
  hr: SongFileInformation;
  id: number;
  /**
   * @description 低质量文件信息
   */
  l: SongFileInformation;
  /**
   * @description 中质量文件信息
   */
  m: SongFileInformation;
  mark: number;
  mst: number;
  /**
   * @description 非零表示有MV ID
   */
  mv: number;
  name: string;
  /**
   * @description 表示歌曲属于CD中第几曲，0表示没有这个字段，对应音频文件的Tag
   */
  no: number;
  /**
   * @description None表示可以播，非空表示无版权
   */
  noCopyrightRcmd: null;
  originCoverType: ORIGIN_COVER_TYPE;
  /**
   * @description 对于翻唱曲，可选提供原曲简单格式的信息
   */
  originSongSimpleData: object;
  pop: number;
  pst: number;
  /**
   * @description 毫秒为单位的Unix时间戳
   */
  publishTime: number;
  resourceState: boolean;
  rt: string;
  rtUrl: string;
  rtUrls: unknown[];
  rtype: number;
  rurl: string;
  s_id: number;
  /**
   * @description
   *  0: 有专辑信息或者是DJ节目
   *  1: 未知专辑
   */
  single: 0 | 1;
  songJumpInfo: null;
  /**
   * @description 无损质量文件信息
   */
  sq: SongFileInformation;
  st: number;
  t: 0 | 1 | 2;
  tagPicList: [];
  v: number;
  version: number;
};

//歌曲细节数据
export type SongDetailData = {
  privileges: Privilege[];
  songs: SongDetail[];
};
/**
 * @description 个性化推荐
 */
export type PersonalizeRecommend = {
  alg: string;
  buyed: false;
  category: string;
  categoryId: number;
  composeVideo: boolean;
  createTime: number;
  desc: string;
  descPicList: null;
  discountPrice: null;
  dj: BaseProfile;
  dynamic: boolean;
  feeScope: FEE_TYPE;
  finished: boolean;
  hightQuality: boolean;
  icon: null;
  id: number;
  intervenePicId: number;
  intervenePicUrl: string;
  lastProgramCreateTime: number;
  lastProgramId: number;
  lastProgramName: string;
  lastUpdateProgramName: string;
  liveInfo: null;
  manualTagsDTO: null;
  name: string;
  originalPrice: number;
  picId: number;
  picUrl: string;
  playCount: number;
  price: number;
  privacy: boolean;
  programCount: number;
  purchaseCount: number;
  radioFeeType: number;
  rcmdText: string;
  rcmdtext: string;
  scoreInfoDTO: null;
  secondCategory: string;
  secondCategoryId: number;
  shortName: null;
  subCount: number;
  subed: boolean;
  taskId: 0;
  underShelf: boolean;
  videos: null;
  whiteList: boolean;
};
/**
 * @description 个性化推荐数据
 */
export type PersonalizeRecommendData = PersonalizeRecommend[];
/**
 * @description 电台分类信息
 */
export type ClassificationRadioInformation = {
  id: CLASSIFICATION_PODCAST_TYPE;
  name: string;
  pic56x56Id: number;
  pic56x56IdStr: string;
  pic56x56Url: string;
  pic84x84Id: number;
  pic84x84IdUrl: string;
  pic96x96Id: number;
  pic96x96IdStr: string;
  pic96x96Url: string;
  picIPad: number;
  picIPadStr: string;
  picIPadUrl: string;
  picMacId: string;
  picMacUrl: string;
  picPCBlack: number;
  picPCBlackStr: string;
  picPCBlackUrl: string;
  picPCWhite: number;
  picPCWhiteStr: string;
  picPCWhiteUrl: string;
  picUWPId: string;
  picUWPUrl: string;
  picWeb: number;
  picWebStr: string;
  picWebUrl: string;
};

/**
 * @description 电台分类数据
 */
export type ClassificationRadioData = {
  categories: ClassificationRadioInformation[];
};
export type ExclusiveEntranceEntire = {
  alg: string;
  copywriter: string;
  id: number;
  name: string;
  picUrl: string;
  sPicUrl: string;
  type: number;
  url: string;
};
/**
 * @description 独家放送(入口)数据
 */
export type ExclusiveEntranceData = {
  name: string;
  result: ExclusiveEntranceEntire[];
};
/**
 * @description 新歌专辑艺术家
 */
export type NewSongAlbumArtist = {
  albumSize: number;
  alias: string[];
  briefDesc: string;
  id: number;
  img1v1Id: number;
  img1v1Url: string;
  musicSize: number;
  name: string;
  picId: number;
  picUrl: string;
  topicPerson: number;
  trans: string;
};
/**
 * @description 新歌专辑
 */
export type NewSongAlbum = {
  alias: string[];
  artist: NewSongAlbumArtist;
  artists: NewSongAlbumArtist[];
  blurPicUrl: string;
  briefDesc: string;
  commentThreadId: string;
  company: string;
  companyId: number;
  copyrightId: number;
  description: string;
  gapless: number;
  id: number;
  mark: number;
  name: string;
  onSale: boolean;
  pic: bigint;
  picId: bigint;
  picId_str: string;
  picUrl: string;
  publishTime: number;
  size: number;
  songs: SongDetail[];
  status: number;
  subType: string;
  tags: string;
  transName: string;
  transNames: string[];
  type: string;
};
export type NewSongMusic = {
  bitrate: number;
  dfsId: number;
  extension: SongEncode;
  id: number;
  name: null;
  playTime: number;
  size: number;
  sr: number;
  volumeDelta: number;
};
/**
 * @description 新歌
 */
export type NewSong = {
  album: NewSongAlbum;
  alias: string[];
  artists: NewSongAlbumArtist[];
  audition: Object;
  bMusic: NewSongMusic;
  commentThreadId: string;
  copyFrom: string;
  copyright: number;
  copyrightId: number;
  crbt: null;
  dayPlays: number;
  disc: string;
  duration: number;
  exclusive: boolean;
  fee: FEE_TYPE;
  ftype: number;
  hMusic: NewSongMusic;
  hearTime: number;
  hrMusic: NewSongMusic;
  id: number;
  lMusic: NewSongMusic;
  mMusic: NewSongMusic;
  mark: number;
  mp3Url: null;
  mvid: number;
  name: string;
  no: number;
  noCopyrightRcmd: null;
  originCoverType: number;
  originSongSimpleData: null;
  playedNum: number;
  popularity: number;
  position: number;
  privilege: Privilege;
  ringtone: string;
  rtUrl: null;
  rtUrls: string[];
  rtype: number;
  rurl: null;
  score: number;
  sign: null;
  single: number;
  sqMusic: NewSongMusic;
  starred: boolean;
  starredNum: number;
  status: number;
  transName: string;
  transNames: string[];
};
/**
 * @description 推荐新音乐
 */
export type RecommendNewSong = {
  alg: string;
  canDislike: boolean;
  copywriter: string;
  id: number;
  name: string;
  picUrl: string;
  song: NewSong;
  trackNumberUpdateTime: number;
  type: number;
};
/**
 * @description 推荐新音乐数据
 */
export type RecommendNewSongData = {
  category: number;
  result: RecommendNewSong[];
};
/**
 * @description 电台
 */
export type Radio = {
  alg: string;
  discountPrice: number;
  feeScope: number;
  icon: null;
  id: number;
  lastProgramName: string;
  name: string;
  originalPrice: number;
  picUrl: string;
  playCount: number;
  programCount: number;
  radioFeeType: number;
  rcmdText: string;
  subCount: number;
  subed: boolean;
  traceId: number;
};
/**
 * @description 播客推荐类型
 */
export type PodcastRecommendType = {
  categoryId: CLASSIFICATION_PODCAST_TYPE;
  categoryName: string;
  radios: Radio[];
};
/**
 * @description 播客推荐类型数据
 */
export type PodcastRecommendTypeData = PodcastRecommendType[];
/**
 * @description 推荐MV
 */
export type RecommendMV = {
  alg: string;
  artistId: number;
  artistName: string;
  artists: Array<{ id: number; name: string }>;
  canDislike: boolean;
  copywriter: string;
  duration: number;
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  subed: boolean;
  trackNumberUpdateTime: number;
  type: number;
};
/**
 * @description 推荐MV数据
 */
export type RecommendMVData = {
  category: number;
  result: RecommendMV[];
};
/**
 * @description 订阅者
 */
export type Subscriber = BaseProfile;
/**
 * @description 基本创建者
 */
export type BaseCreator = {
  defaultAvatar: boolean;
  province: number;
  authStatus: number;
  followed: boolean;
  avatarUrl: string;
};
/**
 * @description 精选碟歌单
 */
export type SelectedDiscPlaylist = {
  adType: number;
  alg: string;
  anonimous: boolean;
  cloudTrackCount: number;
  commentCount: number;
  commentThreadId: string;
  copywriter: string;
  coverImgId: number;
  coverImgUrl: string;
  coverStatus: number;
  createTime: number;
  creator: BaseProfile;
  description: string;
  highQuality: boolean;
  id: number;
  name: string;
  newImported: boolean;
  ordered: boolean;
  playCount: number;
  privacy: number;
  recommendInfo: null;
  recommendText: null;
  shareCount: number;
  socialPlaylistCover: null;
  specialType: number;
  status: number;
  subscribed: boolean;
  subscribedCount: number;
  subscribers: Subscriber[];
  tags: string[];
  totalDuration: number;
  trackCount: number;
  trackNumberUpdateTime: number;
  trackUpdateTime: number;
  tracks: null;
  updateTime: number;
  userId: number;
};
/**
 * @description 精选碟歌单数据
 */
export type SelectedDiscPlaylistData = {
  cat: string;
  more: boolean;
  playlists: SelectedDiscPlaylist[];
  total: number;
};
/**
 * @description 精品歌单数据
 */
export type BoutiquePlaylistData = {
  lasttime: number;
} & SelectedDiscPlaylistData;
/**
 * @description 精品歌单标签
 */
export type BoutiquePlaylistTag = {
  category: number;
  hot: boolean;
  id: number;
  name: string;
  type: number;
};
/**
 * @description 精品歌单分类数据
 */
export type BoutiquePlaylistCategoryData = {
  tags: BoutiquePlaylistTag[];
};
