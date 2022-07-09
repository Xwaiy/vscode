// 自动轮播定时器，翻页动画定时器，轮播图容器，banner图片，当前播放的banner图片索引，banner图片列表
var tpTimer, ptaTimer, banner, carousel, cIndex = 0, banners = [
  'https://p1.music.126.net/eXd9PZoPA9TJBFCS0Ik-0Q==/109951166623907535.jpg?imageView&quality=89',
  'https://p1.music.126.net/KMHVq3d12XW1dv8G8gtbqw==/109951166622022404.jpg?imageView&quality=89',
  'https://p1.music.126.net/rPtsfxxq7pEWQDR9FHY3rA==/109951166624381384.jpg?imageView&quality=89',
  'https://p1.music.126.net/n_xO_hhMgkB2ScFyDZJ5cg==/109951166624725600.jpg?imageView&quality=89',
  'https://p1.music.126.net/AEsyW_bYYJ4_8wwiBcMGsQ==/109951166624348074.jpg?imageView&quality=89',
  'https://p1.music.126.net/bs1oPww1n-vGHqxgI3eXJA==/109951166624398230.jpg?imageView&quality=89',
  'https://p1.music.126.net/miylvQ5RY0fZCEusOUGbvQ==/109951166624416201.jpg?imageView&quality=89',
  'https://p1.music.126.net/ESRdstEsH6DMo0zsKDb7Og==/109951166624743217.jpg?imageView&quality=89'
]
// 新碟上架 动画的定时器 当前item项 ul项
var listTimer = null, lists, nowIndex = 0

window.onload = function () {
  // 设置背景
  banner = document.getElementsByClassName('banner')[0]
  banner.style.backgroundImage = 'url(' + banners[cIndex] + ')'
  // 获取banner容器
  carousel = document.getElementById('carousel')
  // 注入内容
  carousel.src = banners[cIndex]
  // 索引小圆点
  for (let i = 0; i < banners.length; i++) {
    document.getElementById('index').innerHTML += '<span class="index-item" onclick="updateBanner(false, ' + i + ')"></span>'
  }
  // 当前播放第一张banner,设置第一个小圆点为当前项,并为其绑定事件
  document.getElementsByClassName('index-item')[cIndex].classList.add('now-item')
  // 设置每5秒播放下一页
  tpTimer = setInterval(() => { updateBanner(true, cIndex + 1) }, 5000);
  // 为翻页按钮绑定动作
  document.getElementById('last').onclick = () => { updateBanner(false, cIndex - 1) }
  document.getElementById('next').onclick = () => { updateBanner(false, cIndex + 1) }
  // 鼠标在banner上时不自动翻页
  document.getElementsByClassName('banner')[0].onmouseover = () => { clearInterval(tpTimer) }
  // 移开banner时启用自动翻页
  document.getElementsByClassName('banner')[0].onmouseout = () => { tpTimer = setInterval(() => { updateBanner(true, cIndex + 1) }, 5000); }
  // 获取新碟上架list容器
  lists = document.getElementsByClassName('list-item')
  lists[nowIndex].style.display = 'grid'
  // 获取音乐面板
  this.$musicPanelDom = document.getElementsByClassName('music-panel')[0]
  // 监听鼠标移动事件 动态展示音乐播放面板
  window.onmousemove = function (event) {
    if (this.$switch) return
    if (event.y > document.documentElement.clientHeight - 67 && !this.$musicPanelIsShow) {
      this.$musicPanelDom.style.marginBottom = '0'
    }
  }
  this.$musicPanelDom.onmouseleave = function () {
    document.onmouseleave()
  }
  document.onmouseleave = function () {
    if (window.$switch == true) return
    if (window.$switchTimer != undefined) {
      clearTimeout(window.$switchTimer)
      window.$switchTimer = undefined
    }
    window.$switchTimer = setTimeout(() => {
      window.$musicPanelIsShow = false
      window.$musicPanelDom.style.marginBottom = '-45px'
      window.$switchTimer = undefined
    }, 1000)
  }
}
// 更换背景 playAnimation表示是否使用过渡动画,index为要更换到的图片索引
function updateBanner (playAnimation, index) {
  // 检查传入的索引值是否合法
  if (index < 0) {
    index = banners.length - 1
  } else if (index == banners.length) {
    index = 0
  }
  clearTimeout(ptaTimer)
  if (playAnimation) {
    carousel.style.transition = 'opacity 1s ease-in 0s'
    carousel.style.opacity = '0'
  }
  // 更新小圆点索引
  document.getElementsByClassName('index-item')[cIndex].classList.remove('now-item')
  // 更新图片
  ptaTimer = setTimeout(() => {
    banner.style.backgroundImage = 'url(' + banners[index] + ')'
    carousel.src = banners[index]
    carousel.style.transition = 'opacity .2s ease-out 0s'
    carousel.style.opacity = '1'
    document.getElementsByClassName('index-item')[index].classList.add('now-item')
    cIndex = index
  }, playAnimation ? 600 : 0)
}
// direction为last/next
function setListItemLocation (direction) {
  // 上一段动画没有播放完毕拒绝执行
  if (listTimer != null) return
  // 获取上下页索引
  let getIndex = (offset) => {
    let index = offset + nowIndex
    if (index == lists.length) {
      return 0
    }
    if (index == -1) {
      return lists.length - 1
    }
    return index
  }
  let i = getIndex(direction == 'last' ? -1 : 1)
  // 把将要出现的元素放置到左边
  lists[i].style.marginLeft = (direction == 'last') ? '-635px' : '635px'
  // 显示将要移动的元素
  lists[i].style.display = 'grid'
  // 添加过渡效果
  lists[i].style.transition = 'margin .7s'
  lists[nowIndex].style.transition = 'margin .7s'
  // 将当前元素放置到右侧 上一个元素移动到当前位置
  lists[i].style.marginLeft = '0px'
  lists[nowIndex].style.marginLeft = (direction == 'last') ? '-635px' : '635px'
  listTimer = setTimeout(() => {
    lists[i].style.transition = 'none'
    lists[nowIndex].style.transition = 'none'
    listTimer = null
    nowIndex = i
  }, 700)
}
// 音乐播放面板 自动隐藏(false)/常驻(true) 的开关
function switchMusicPanel () {
  if (this.$switch === undefined) {
    this.$switch = true
    this.$switchDom = document.getElementById('switch')
    this.$musicPanelIsShow = true
  } else {
    this.$switch = !this.$switch
  }
  this.$switchDom.style.backgroundPositionX = this.$switch ? '-100px' : '-80px'
}