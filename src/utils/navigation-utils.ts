export const flattenJSON = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: any = {},
  extraKey = ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  for (const key in obj) {
    if (typeof obj[key] !== 'object') {
      res[extraKey + key] = obj[key]
    } else {
      flattenJSON(obj[key], res, `${extraKey}${key}.`)
    }
  }
  return res
}
export const getKeyByValue = (
  object: { [x: string]: string },
  value: string
) => {
  return Object.keys(object).find((key) => object[key] === value)
}

export const getKeysByValue = (
  object: { [x: string]: string },
  value: string
) => {
  return Object.keys(object).filter((key) => object[key] === value)
}

export type localeType = 'en' | 'pt' | 'es'

export const getParents = (
  path: string,
  data: string,
  flattenedSidebar: { [x: string]: string },
  locale: localeType = 'en',
  parentsArray: string[],
  parent?: string
) => {
  console.log(path)
  const pathParts = path?.split('children')
  const desiredData = data === 'name' ? `${data}.${locale}` : data
  pathParts?.splice(-1)
  let prev = ''
  pathParts?.map((el) => {
    el = prev + el
    prev = el + 'children'

    if (!parent || flattenedSidebar[`${el}${desiredData}`].includes(parent)) {
      parentsArray.push(flattenedSidebar[`${el}${desiredData}`])
    }
  })

  return parentsArray
}

interface childrenDataI {
  slug: string
  name: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getChildren = (category: any, currentLocale: string) => {
  const children: childrenDataI[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category.children.forEach((el: { slug: any; name: { [x: string]: any } }) => {
    const child: childrenDataI = { slug: el.slug, name: el.name[currentLocale] }

    children.push(child)
  })

  return children
}
