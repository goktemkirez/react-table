import React, { createContext, useContext } from 'react'

const TranslationContext = createContext()

const translations = {
  excelExport: {
    tr: "Excel'e Aktar",
    en: 'Excel Export',
    es: 'Exportación de Excel',
    pl: 'eksport do programu Excel'
  },
  searchInTable: {
    tr: 'Tabloda Ara...',
    en: 'Search in Table...',
    es: 'Buscar en la tabla',
    pl: 'Szukaj w tabeli'
  },
  new: {
    tr: 'Yeni',
    en: 'New',
    es: 'Nuevo',
    pl: 'Nowy'
  },
  sort: {
    tr: 'Sırala',
    en: 'Sort',
    es: 'Ordenar',
    pl: 'Sortować'
  },
  clearFilters: {
    tr: 'Filtreleri Temizle',
    en: 'Clear Filters',
    es: 'Limpiar filtros',
    pl: 'Wyczyść filtry'
  },
  detail: {
    tr: 'Detay',
    en: 'Detail',
    es: 'Detalle',
    pl: 'Szczegół'
  },
  all: {
    tr: 'Tümü',
    en: 'All',
    es: 'Todo',
    pl: 'Wszystko'
  },
  records: {
    tr: 'kayıtta',
    en: 'records',
    es: 'registros',
    pl: 'zapisach'
  },
  showingBetween: {
    tr: 'arası gösteriliyor',
    en: 'showing',
    es: 'mostrando',
    pl: 'pokazuje'
  }
}

export const TranslationProvider = ({ children, lang }) => {
  const translation = {
    excelExport: translations.excelExport[lang],
    searchInTable: translations.searchInTable[lang],
    new: translations.new[lang],
    sort: translations.sort[lang],
    clearFilters: translations.clearFilters[lang],
    detail: translations.detail[lang],
    all: translations.all[lang],
    records: translations.records[lang],
    showingBetween: translations.showingBetween[lang]
  }

  return (
    <TranslationContext.Provider value={{ translation }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => {
  return useContext(TranslationContext)
}
