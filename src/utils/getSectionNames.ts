export const getTranslatedSectionName = (
  sidebarfallback: any, //eslint-disable-line
  documentationField: string,
  locale: 'en' | 'pt' | 'es'
): string => {
  const navbarArray = Array.isArray(sidebarfallback)
    ? sidebarfallback
    : sidebarfallback?.navbar

  if (!navbarArray) {
    return documentationField
  }

  const section = navbarArray.find(
    (item: any) => item.documentation === documentationField //eslint-disable-line
  )

  if (!section?.name) {
    return documentationField
  }

  const translatedName =
    section.name[locale] || section.name.en || documentationField
  return translatedName
}

export const localizeNavigationDocumentation = (
  navigation: any, //eslint-disable-line
  locale: 'en' | 'pt' | 'es'
): any => { //eslint-disable-line
  const navbarArray = Array.isArray(navigation)
    ? navigation
    : navigation?.navbar

  if (!navbarArray) {
    return navigation
  }

  const localizedArray = navbarArray.map((section: any) => { //eslint-disable-line
    const translatedName =
      section.name?.[locale] || section.name?.en || section.documentation
    return {
      ...section,
      documentation: translatedName,
    }
  })

  if (Array.isArray(navigation)) {
    return localizedArray
  }

  return {
    ...navigation,
    navbar: localizedArray,
  }
}

export const getDocumentationField = (
  sidebarfallback: any, //eslint-disable-line
  sectionName: string
): string => {
  if (!sidebarfallback?.navbar) return sectionName

  const section = sidebarfallback.navbar.find(
    (item: any) => //eslint-disable-line
      item.documentation === sectionName ||
      item.name?.en === sectionName ||
      item.name?.es === sectionName ||
      item.name?.pt === sectionName
  )

  return section?.documentation || sectionName
}
