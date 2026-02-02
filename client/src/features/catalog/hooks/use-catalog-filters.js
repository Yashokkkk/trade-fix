import { useState, useEffect } from 'react'
import { api } from '../../../shared/api/instance'

function toPositive(value) {
  const num = parseFloat(value)
  if (isNaN(num) || num < 0) return ''
  return String(num)
}

export function useCatalogFilters() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({ categoryId: '', min: '', max: '' })

  useEffect(() => {
    api.get('/categories', { type: 'product' }).then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    const params = {}
    if (filters.categoryId) params.categoryId = filters.categoryId
    if (filters.min) params.minPrice = filters.min
    if (filters.max) params.maxPrice = filters.max
    api.get('/products', Object.keys(params).length ? params : undefined)
      .then(setProducts)
      .catch(() => {})
  }, [filters])

  const updateFilters = (patch) => {
    const next = { ...filters, ...patch }
    if ('min' in patch) next.min = toPositive(patch.min)
    if ('max' in patch) next.max = toPositive(patch.max)
    setFilters(next)
  }

  return { filters, setFilters: updateFilters, products, categories }
}
