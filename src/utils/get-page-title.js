import defaultSettings from '@/settings'

const title = defaultSettings.title || '联卓信息科技有限公司'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
